/// <reference types="jest" />
import { ProfanityFilter } from "../src/index";

describe("Edge cases - empty and trivial", () => {
    test("empty blacklist yields no matches", () => {
        const f = new ProfanityFilter([]);
        expect(f.find("anything")).toHaveLength(0);
        expect(f.isProfane("anything")).toBe(false);
    });

    test("empty text yields no matches", () => {
        const f = new ProfanityFilter(["bad"]);
        expect(f.find("")).toHaveLength(0);
    });
});

describe("Case-insensitivity & positions", () => {
    test("finds regardless of case and yields a slice whose normalized form contains the word", () => {
        const f = new ProfanityFilter(["bAd"]);
        const text = "AAA bad BBB BaD ccc";
        const m = f.find(text);
        expect(m.length).toBeGreaterThanOrEqual(2);
        for (const match of m) {
            const slice = text.slice(match.start, match.end);
            // Remove non-alphanumerics and compress 3+ repeats to 2 (as the engine does)
            const lettersOnly = slice.toLowerCase().replace(/[^a-z0-9]/g, "");
            const compressed = lettersOnly.replace(/(.)\1{2,}/g, "$1$1");
            expect(compressed).toContain("bad");
        }
    });
});

describe("Ignored chars & unicode/leet mixing", () => {
    test("ignores separators while still detecting", () => {
        const f = new ProfanityFilter(["stupid"]);
        const text = "s t u p i d"; // spaces should be ignored entirely
        expect(f.isProfane(text)).toBe(true);
    });

    test("unicode homoglyphs and leet combinations are normalized", () => {
        const f = new ProfanityFilter(["stupid"]);
        const text = "$tup!d s7up1d stup1d"; // $, !, 7, 1 all normalize
        const m = f.find(text);
        expect(m.length).toBeGreaterThanOrEqual(1);
    });
});

describe("Whitelist edge overlaps", () => {
    test("blacklist within a larger whitelisted span is filtered", () => {
        const f = new ProfanityFilter(["bad"], ["verybadindeed"/* normalized, no spaces */]);
        const text = "This is very bad indeed.";
        // normalized: thisisverybadindeed -> contains "bad" but inside whitelist span
        expect(f.find(text)).toHaveLength(0);
    });

    test("blacklist partially outside whitelist still matches outside part", () => {
        const f = new ProfanityFilter(["ugly"], ["prettyug" /* only covers prefix when normalized */]);
        const text = "This is pretty ugly actually";
        const m = f.find(text);
        // the trailing "ly" is outside whitelisted span so full word should still be found
        expect(m.some(x => x.word === "ugly")).toBe(true);
    });
});

describe("Censoring with multiple overlaps", () => {
    test("censors overlapping matches without double-masking non-word chars", () => {
        const f = new ProfanityFilter(["bad", "adw", "dwo", "word"]);
        const text = "badword";
        const censored = f.censor(text, "#");
        // All letters should be masked since there are overlapping matches spanning the word
        expect(censored).toBe("#######");
    });
});

describe("Performance sanity on long input", () => {
    test("runs reasonably on repeated long text", () => {
        const words = ["bad", "evil", "stupid", "ugly", "nasty", "gross"];
        const f = new ProfanityFilter(words);
        const paragraph = "This is a neutral paragraph without issues. ";
        const longText = (paragraph.repeat(200)) + "But here is a bad one at the end.";
        const m = f.find(longText);
        expect(m.some(x => x.word === "bad")).toBe(true);
    });
});
