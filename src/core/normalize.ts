const LEET_TABLE: Readonly<Record<string, string>> = {
    "0": "o", "1": "i", "2": "z", "3": "e", "4": "a", "5": "s",
    "6": "g", "7": "t", "8": "b", "9": "g",
    "@": "a", "$": "s", "!": "i", "+": "t",
    "(": "c", ")": "o", "{": "c", "}": "o",
    "[": "c", "]": "o"
};

export function normalizeChar(char: string): string | "" {
    const charLower = char.toLowerCase();
    return LEET_TABLE[charLower] ?? (/[a-z]/.test(charLower) ? charLower : "");
};