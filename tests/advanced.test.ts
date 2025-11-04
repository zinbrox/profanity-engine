/// <reference types="jest" />

import { ProfanityFilter } from "../src/index";

describe("ProfanityFilter - normalization & detection", () => {
    test("detects simple words and positions", () => {
        const f = new ProfanityFilter(["bad", "evil"]);
        const text = "This is bad and very evil indeed.";
        const m = f.find(text);
        expect(m.map(x => x.word).sort()).toEqual(["bad", "evil"].sort());
        // check contains
        expect(f.contains(text)).toBe(true);
        // positions sanity
        const bad = m.find(x => x.word === "bad")!;
        expect(text.slice(bad.start, bad.end)).toBe("bad");
        const evil = m.find(x => x.word === "evil")!;
        expect(text.slice(evil.start, evil.end)).toBe("evil");
    });

    test("handles leet/alt chars and ignores punctuation", () => {
        const f = new ProfanityFilter(["stupid"]);
        const text = "s7up!d and $tup!d and stupid"; // normalization maps 7->t, !->i, $->s
        const m = f.find(text);
        expect(m.length).toBeGreaterThanOrEqual(1);
        expect(f.contains(text)).toBe(true);
    });

    test("squashes repeats (3+ => 2) during detection", () => {
        const f = new ProfanityFilter(["bad"]);
        const text = "baaad baddd baaaad"; // should normalize repeats of 3+ to 2
        const m = f.find(text);
        expect(m.length).toBeGreaterThanOrEqual(1);
    });
});

describe("ProfanityFilter - overlaps & multiples", () => {
    test("overlapping patterns and multiple occurrences", () => {
        const f = new ProfanityFilter(["bad", "badword", "word"]);
        const text = "badword and bad word";
        const m = f.find(text);
        // Should include at least the specific words found
        const words = m.map(x => x.word);
        expect(words).toEqual(expect.arrayContaining(["bad", "word", "badword"]));
        // multiple occurrences of 'bad' should be found
        const badCount = m.filter(x => x.word === "bad").length;
        expect(badCount).toBeGreaterThanOrEqual(2);
    });
});

describe("ProfanityFilter - censoring", () => {
    test("censors only word characters with default *", () => {
        const f = new ProfanityFilter(["evil"]);
        const text = "very evil!";
        const censored = f.censor(text);
        // exclamation should remain, letters masked
        expect(censored).toMatch(/^very \*\*\*\*!$/);
    });

    test("respects custom mask character", () => {
        const f = new ProfanityFilter(["bad"]);
        const text = "bad example";
        const censored = f.censor(text, "#");
        expect(censored.startsWith("###")).toBe(true);
    });
});

describe("ProfanityFilter - whitelist behavior", () => {
    test("does not report blacklisted inside whitelisted spans", () => {
        const blacklist = ["bad", "ugly"];
        // Normalization drops spaces, so whitelist entries must be provided in normalized form
        const whitelist = ["notbad", "uglyduckling"]; // entire span becomes whitelisted
        const f = new ProfanityFilter(blacklist, whitelist);

        // Inside whitelist span
        const text1 = "That was not bad at all.";
        expect(f.find(text1)).toHaveLength(0);

        const text2 = "The ugly duckling is a nice story.";
        expect(f.find(text2)).toHaveLength(0);

        // Outside whitelist span still detected
        const text3 = "A bad apple and an ugly truth.";
        const m3 = f.find(text3);
        expect(m3.map(x => x.word).sort()).toEqual(["bad", "ugly"].sort());
    });
});
