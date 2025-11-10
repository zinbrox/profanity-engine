import { Node } from "./node";
import { normalizeChar, squashRepeats, isWordBoundary } from "./normalize";
import type { Match, ProfanityOptions } from "./types";

export class ProfanityFilter {
    /** The root node of the trie for profane words */
    private readonly root: Node = new Node();
    /** The root node of the trie for whitelisted words. Only used if whitelist is provided */
    private readonly whiteRoot: Node = new Node();
    /** Indicates if a whitelist is active */
    private readonly hasWhitelist: boolean;
    /** Configuration options for the filter */
    private options: ProfanityOptions;

    /**
     * Create a new ProfanityFilter instance.
     * @param words - List of blacklist words to detect.
     * @param whitelist - List of words that should override blacklist matches.
     * @param options - Configuration options for the filter
     */
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

    /**
     * Builds a trie data structure from the given words.
     * Each word is inserted character by character, creating nodes as needed.
     * @param root - The root node of the trie
     * @param words - Array of words to insert into the trie
     * @private
     */
    private buildTrie(root: Node, words: string[]) {
        for (const raw of words) {
            const normalized = Array.from(raw)
                .map(ch => normalizeChar(ch))
                .filter(Boolean)
                .join('');

            // remove spaces & apply repeat-squash (same as input)
            const word = squashRepeats(normalized.replace(/\s+/g, ''));

            let node = root;
            for (let ch of word) {
                node = node.children[ch] ??= new Node();
            }

            if (!node.output.includes(word)) {
                node.output.push(word);
            }
        }
    }

    /**
     * Builds failure links for the Aho-Corasick automaton using BFS.
     * Failure links allow efficient backtracking when no matching character is found.
     * @param root - Trie root to process.
     */
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

    /**
     * Runs the Aho-Corasick automaton on normalized text to find pattern matches.
     * @param root - The root node of the trie (blacklist or whitelist)
     * @param normalizedChars - Array of normalized characters
     * @param positions - Array mapping normalized character indices to original text positions
     * @returns Array of matches found in the text
     * @private
     */
    private runAutomaton(root: Node, normalizedChars: string[], positions: number[]): Match[] {
        const matches: Match[] = [];
        let node: Node = root;

        for (let i = 0; i < normalizedChars.length; i++) {
            const ch = normalizedChars[i]!;
            let cursor: Node | null = node;

            // logic: go back to the longest suffix that is still a prefix in the trie if no edge
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

    /**
     * Finds all profane word matches in the given text.
     * Normalizes characters, removes excessive repetitions, and filters based on whitelist and word boundaries.
     * @param text - The text to scan for profanity
     * @returns Array of Match objects containing detected profane words and their positions
     */
    find(text: string): Match[] {
        text = squashRepeats(text);

        const normalizedChars: string[] = [];
        const positions: number[] = [];

        let prevNorm: string | null = null;
        let runLen = 0;

        // Remove duplicates, normalize individual chars & track positions
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (typeof ch !== "string") continue;
            const n = normalizeChar(ch);
            if (!n) continue;

            if (n === prevNorm) {
                runLen++;
                if (runLen > 2) continue; // only allow up to 2 repeats
            } else {
                prevNorm = n;
                runLen = 1;
            }

            normalizedChars.push(n);
            positions.push(i);
        }

        let blacklistMatches = this.runAutomaton(this.root, normalizedChars, positions);
        if (this.options.logProfanity) {
            console.log("[ProfanityFilter] Blacklist matches:", blacklistMatches);
        }
        if (this.options.wordBoundary) {
            blacklistMatches = blacklistMatches.filter(m => {
                // Boundary check. If not at a boundary and allowCompound is false, drop it.
                if (!isWordBoundary(text, m.start - 1) || !isWordBoundary(text, m.end)) {
                    if (!this.options.allowCompound) return false;
                }

                // Verify the slice == trie word after identical normalization
                const extracted = text.slice(m.start, m.end).toLowerCase();

                const normalizedExtracted = squashRepeats(
                    Array.from(extracted)
                        .map(ch => normalizeChar(ch))
                        .filter(Boolean)
                        .join('')
                );

                const targetWord = squashRepeats(m.word.replace(/\s+/g, ''));

                return normalizedExtracted === targetWord;
            });
        }

        if (!this.hasWhitelist || blacklistMatches.length === 0) {
            return blacklistMatches;
        }

        const whitelistMatches = this.runAutomaton(this.whiteRoot, normalizedChars, positions);
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

    /**
     * Checks if the given text contains any profane words.
     * @param text - The text to check
     * @returns True if profanity is detected, false otherwise
     */
    isProfane(text: string): boolean {
        return this.find(text).length > 0;
    }

    /**
     * Censors profane words in the text by replacing alphabetic characters with a mask character.
     * @param text - The text to censor
     * @param maskChar - The character to use for censoring (default: "*")
     * @returns The censored text with profane words masked
     */
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