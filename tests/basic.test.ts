/// <reference types="jest" />

import { ProfanityFilter } from "../src/index";

test("Basic profanity detection", () => {
    const filter = new ProfanityFilter(["badword", "verybad"]);

    const text1 = "This is a badword in the text.";
    const matches1 = filter.find(text1);
    expect(matches1).toHaveLength(1);
    expect(filter.isProfane(text1)).toBe(true);
});