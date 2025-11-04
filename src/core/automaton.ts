import { Node } from "./node";
import { normalizeChar } from "./normalize";
import type { Match } from "./types";

export class ProfanityFilter {
    private readonly root: Node = new Node();

    constructor(words: string[]) {
        this.buildTrie(words);
        this.buildFailureLinks();
    }

    /**
     * Build the trie from the list of words
     * @param words Array of words to build the trie from
     */
    private buildTrie(words: string[]): void {
        for (const word of words) {
            let node = this.root;
            const w = word.toLowerCase();

            for (const ch of w) {
                node = node.children[ch] ??= new Node();
            }

            node.output.push(w);
        }
    }

    /**
     * Build failure links for the Aho-Corasick automaton
     */
    private buildFailureLinks(): void {
        const queue: Node[] = [];

        for (const child of Object.values(this.root.children)) {
            child.fail = this.root;
            queue.push(child);
        }

        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            for (const [char, childNode] of Object.entries(currentNode.children)) {
                let failNode = currentNode.fail;
                while (failNode && !failNode.children[char]) {
                    failNode = failNode.fail;
                }

                childNode.fail = failNode ? (failNode.children[char] ?? null) : this.root;
                childNode.output.push(...(childNode.fail?.output ?? []));
                queue.push(childNode);
            }
        }
    }

    /**
     * Searches for matches of patterns within the given text using the automaton.
     *
     * @param text - The input string.
     * @returns An array of `Match` objects, each representing a found pattern and its position in the text.
     */
    find(text: string): Match[] {
        const matches: Match[] = [];
        const normalizedChars: string[] = [];
        const positions: number[] = [];

        // Normalize the input text and keep track of original positions
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (typeof ch === "string") {
                const n = normalizeChar(ch);
                if (n) {
                    normalizedChars.push(n);
                    positions.push(i);
                }
            }
        }

        let node: Node = this.root;

        for (let i = 0; i < normalizedChars.length; i++) {
            const ch = normalizedChars[i]!;

            // Walk failure links using a nullable cursor to satisfy strict types.
            let cursor: Node | null = node;
            while (cursor && !cursor.children[ch]) {
                cursor = cursor.fail;
            }

            // If we found a cursor with a transition, follow it; otherwise go to root.
            node = (cursor && cursor.children[ch]) ? cursor.children[ch]! : this.root;

            if (node.output.length > 0) {
                for (const word of node.output) {
                    const startIndex = i - word.length + 1;
                    if (startIndex < 0) continue;

                    const start = positions[startIndex];
                    const end = positions[i];

                    if (start === undefined || end === undefined) continue;

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

    contains(text: string): boolean {
        return this.find(text).length > 0;
    }

    censor(text: string, maskChar = "*"): string {
        const matches = this.find(text);
        if (matches.length === 0) return text;

        const arr = text.split("");

        for (const { start, end } of matches) {
            for (let i = start; i <= end; i++) {
                const ch = arr[i];
                if (typeof ch === "string" && /\w/.test(ch)) {
                    arr[i] = maskChar;
                }
            }
        }

        return arr.join("");
    }
}