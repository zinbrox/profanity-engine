import { Node } from "./node";
import { normalizeChar, squashRepeats } from "./normalize";
import type { Match, ProfanityOptions } from "./types";

export class ProfanityFilter {
    private readonly root: Node = new Node();
    private readonly whiteRoot: Node = new Node();
    private readonly hasWhitelist: boolean;
    private options: ProfanityOptions;

    constructor(words: string[], whitelist: string[] = [], options: ProfanityOptions = {}) {
        this.options = {
            ...options,
        }
        this.hasWhitelist = whitelist.length > 0;

        this.buildTrie(this.root, words.map(w => w.toLowerCase()));
        if (this.hasWhitelist) {
            this.buildTrie(this.whiteRoot, whitelist.map(w => w.toLowerCase()));
        }

        this.buildFailureLinks(this.root);
        if (this.hasWhitelist) {
            this.buildFailureLinks(this.whiteRoot);
        }
    }

    private buildTrie(root: Node, words: string[]) {
        for (const word of words) {
            let node = root;
            const w = word.toLowerCase();

            for (const ch of w) {
                node = node.children[ch] ??= new Node();
            }
            if (!node.output.includes(w)) {
                node.output.push(w);
            }
        }
    }

    private buildFailureLinks(root: Node) {
        const queue: Node[] = [];

        for (const child of Object.values(root.children)) {
            child.fail = root;
            queue.push(child);
        }

        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            for (const [char, childNode] of Object.entries(currentNode.children)) {
                let failNode = currentNode.fail;
                while (failNode && !failNode.children[char]) {
                    failNode = failNode.fail;
                }

                childNode.fail = failNode ? (failNode.children[char] ?? null) : root;

                if (childNode.fail && childNode.fail.output.length) {
                    childNode.output = [...childNode.output, ...childNode.fail.output];
                }

                queue.push(childNode);
            }
        }
    }

    private runAutomaton(root: Node, text: string, normalizedChars: string[], positions: number[]): Match[] {
        const matches: Match[] = [];
        let node: Node = root;

        for (let i = 0; i < normalizedChars.length; i++) {
            const ch = normalizedChars[i]!;
            let cursor: Node | null = node;

            while (cursor && !cursor.children[ch]) {
                cursor = cursor.fail;
            }

            node = (cursor && cursor.children[ch]) ? cursor.children[ch]! : root;

            if (node.output.length > 0) {
                for (const word of node.output) {
                    const startIndex = i - word.length + 1;
                    if (startIndex < 0) continue;

                    const start = positions[startIndex];
                    const end = positions[i];

                    if (start == null || end == null) continue;

                    matches.push({
                        word,
                        start,
                        end: end + 1
                    });
                }
            }
        }
        return matches;
    }

    find(text: string): Match[] {
        const normalizedChars: string[] = [];
        const positions: number[] = [];

        let prevNorm: string | null = null;
        let runLen = 0;

        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (typeof ch !== "string") continue;
            const n = normalizeChar(ch);
            if (!n) continue;

            if (n === prevNorm) {
                runLen += 1;
                // Skip if more than 2 repeats
                if (runLen > 2) continue;
            } else {
                prevNorm = n;
                runLen = 1;
            }

            normalizedChars.push(n);
            positions.push(i);
        }

        let blacklistMatches = this.runAutomaton(this.root, text, normalizedChars, positions);
        if (this.options.logProfanity) {
            console.log("[ProfanityFilter] Blacklist matches:", blacklistMatches);
        }
        if (this.options.wordBoundary) {
            blacklistMatches = blacklistMatches.filter(m => {
                const before = text[m.start - 1];
                const after = text[m.end];
                const isBoundary = (c: string | undefined) => !c || /\W/.test(c);
                return isBoundary(before) && isBoundary(after);
            });
        }
        if (!this.hasWhitelist || blacklistMatches.length === 0) {
            return blacklistMatches;
        }

        const whitelistMatches = this.runAutomaton(this.whiteRoot, text, normalizedChars, positions);
        if (whitelistMatches.length === 0) {
            return blacklistMatches;
        }

        if (this.options.logProfanity) {
            console.log("[ProfanityFilter] Whitelist matches:", whitelistMatches);
        }

        return blacklistMatches.filter(b => {
            return !whitelistMatches.some(w => b.start >= w.start && b.end <= w.end);
        });
    }

    isProfane(text: string): boolean {
        return this.find(text).length > 0;
    }

    censor(text: string, maskChar = "*"): string {
        const matches = this.find(text);
        if (matches.length === 0) return text;

        const arr = text.split("");
        const maskSet = new Set<number>();

        for (const { start, end } of matches) {
            for (let i = start; i < end; i++) {
                if (!maskSet.has(i) && /\w/.test(arr[i]!)) {
                    arr[i] = maskChar;
                    maskSet.add(i);
                }
            }
        }

        return arr.join("");
    }
}