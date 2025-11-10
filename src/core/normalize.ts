/**
 * Maps Unicode homoglyphs and lookalike characters to their ASCII equivalents.
 * Used to normalize text and prevent profanity filter evasion through character substitution.
 */
export const unicodeMap: Record<string, string> = {
    // A
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'ā': 'a', 'ă': 'a', 'ą': 'a',
    'α': 'a', 'а': 'a', 'ᴀ': 'a', 'Ⓐ': 'a', 'Ａ': 'a',
    // B
    'ß': 'b', 'β': 'b', 'в': 'b', 'ʙ': 'b', 'Ⓑ': 'b', 'Ｂ': 'b',
    // C
    'ç': 'c', 'ć': 'c', 'ĉ': 'c', 'ċ': 'c', 'č': 'c', 'с': 'c', 'ⅽ': 'c', 'ⓒ': 'c', 'Ⓒ': 'c', 'Ｃ': 'c',
    // D
    'ď': 'd', 'đ': 'd', 'ɗ': 'd', 'ᶁ': 'd', 'Ⓓ': 'd', 'Ｄ': 'd',
    // E
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ē': 'e', 'ĕ': 'e', 'ė': 'e', 'ę': 'e', 'ě': 'e',
    'ε': 'e', 'е': 'e', '℮': 'e', 'Ⓔ': 'e', 'Ｅ': 'e',
    // F
    'ƒ': 'f', 'ғ': 'f', 'Ⓕ': 'f', 'Ｆ': 'f',
    // G
    'ğ': 'g', 'ĝ': 'g', 'ġ': 'g', 'ģ': 'g', 'ɡ': 'g', 'Ⓖ': 'g', 'Ｇ': 'g',
    // H
    'ĥ': 'h', 'ħ': 'h', 'н': 'h', 'ʜ': 'h', 'Ⓗ': 'h', 'Ｈ': 'h',
    // I
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ī': 'i', 'ĭ': 'i', 'į': 'i', 'ı': 'i',
    'ι': 'i', 'і': 'i', 'ⅰ': 'i', 'Ⓘ': 'i', 'Ｉ': 'i', '|': 'i', '!': 'i',
    // J
    'ĵ': 'j', 'ј': 'j', 'Ⓙ': 'j', 'Ｊ': 'j',
    // K
    'ķ': 'k', 'ĸ': 'k', 'κ': 'k', 'к': 'k', 'ᴋ': 'k', 'Ⓚ': 'k', 'Ｋ': 'k',
    // L
    'ĺ': 'l', 'ļ': 'l', 'ľ': 'l', 'ŀ': 'l', 'ł': 'l', 'ⅼ': 'l', 'Ⓛ': 'l', 'Ｌ': 'l',
    // M
    'м': 'm', 'ᴍ': 'm', 'Ⓜ': 'm', 'Ｍ': 'm',
    // N
    'ñ': 'n', 'ń': 'n', 'ņ': 'n', 'ň': 'n', 'ŉ': 'n', 'ŋ': 'n', 'η': 'n', 'п': 'n',
    'Ⓝ': 'n', 'Ｎ': 'n',
    // O
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ō': 'o', 'ŏ': 'o', 'ő': 'o', 'ơ': 'o', 'ø': 'o',
    'ο': 'o', 'о': 'o', 'Ⓞ': 'o', 'Ｏ': 'o', '0': 'o', '°': 'o', '○': 'o', '◯': 'o',
    // P
    'ρ': 'p', 'р': 'p', 'ᴘ': 'p', 'Ⓟ': 'p', 'Ｐ': 'p',
    // Q
    'Ⓠ': 'q', 'Ｑ': 'q',
    // R
    'ŕ': 'r', 'ŗ': 'r', 'ř': 'r', 'ʀ': 'r', 'Ⓡ': 'r', 'Ｒ': 'r',
    // S
    'ś': 's', 'ŝ': 's', 'ş': 's', 'š': 's', 'ѕ': 's', '$': 's', 'Ⓢ': 's', 'Ｓ': 's',
    // T
    'ţ': 't', 'ť': 't', 'ŧ': 't', 'т': 't', 'Ⓣ': 't', 'Ｔ': 't', '7': 't',
    // U
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ū': 'u', 'ŭ': 'u', 'ů': 'u', 'ű': 'u', 'ų': 'u',
    'υ': 'u', 'ꞟ': 'u', 'Ⓤ': 'u', 'Ｕ': 'u',
    // V
    'ѵ': 'v', 'Ⓥ': 'v', 'Ｖ': 'v',
    // W
    'ŵ': 'w', 'ω': 'w', 'ш': 'w', 'Ⓦ': 'w', 'Ｗ': 'w',
    // X
    'χ': 'x', 'х': 'x', 'ⅹ': 'x', 'Ⓧ': 'x', 'Ｘ': 'x',
    // Y
    'ý': 'y', 'ÿ': 'y', 'ŷ': 'y', 'γ': 'y', 'у': 'y', 'Ү': 'y', '¥': 'y', 'ⓨ': 'y', 'Ｙ': 'y',
    // Z
    'ź': 'z', 'ż': 'z', 'ž': 'z', 'ᴢ': 'z', 'Ⓩ': 'z', 'Ｚ': 'z'
};

/**
 * Maps Unicode digit lookalikes to their ASCII equivalents.
 * Used to normalize numeric characters that might be used to evade filtering.
 */
export const unicodeDigits: Record<string, string> = {
    '⓪': '0', '０': '0',
    '①': '1', '１': '1', '¹': '1', '₁': '1',
    '②': '2', '２': '2', '²': '2',
    '③': '3', '３': '3', '³': '3',
    '④': '4', '４': '4',
    '⑤': '5', '５': '5',
    '⑥': '6', '６': '6',
    '⑦': '7', '７': '7',
    '⑧': '8', '８': '8',
    '⑨': '9', '９': '9'
};

/**
 * Set of characters to ignore during normalization (spaces, punctuation, separators).
 * These characters are removed from text during processing to handle obfuscation attempts.
 */
export const ignoreChars = new Set([
    ' ', '\t', '\n',
    '.', ',', '-', '_', '~', '`',
    '/', '\\', '|', '*', '+', '=',
    '(', ')', '[', ']', '{', '}',
    '\'', '"', ':', ';', '!', '?',

    // Common Unicode spaces/separators
    '\u00A0', // NO-BREAK SPACE
    '\u1680', // OGHAM SPACE MARK
    '\u180E', // MONGOLIAN VOWEL SEPARATOR
    '\u2000', '\u2001', '\u2002', '\u2003', '\u2004',
    '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A', // EN/EM/etc spaces
    '\u200B', // ZERO WIDTH SPACE
    '\u200C', // ZERO WIDTH NON-JOINER
    '\u200D', // ZERO WIDTH JOINER
    '\u202F', // NARROW NO-BREAK SPACE
    '\u205F', // MEDIUM MATHEMATICAL SPACE
    '\u2060', // WORD JOINER
    '\u3000', // IDEOGRAPHIC SPACE
    '\uFEFF', // ZERO WIDTH NO-BREAK SPACE

    // Dashes/points often used as obfuscation
    '–', '—', '·', '•', '‧', '∙'
]);


/**
 * Checks if a character is an alphanumeric ASCII character (0-9, a-z).
 * @param c - The character to check
 * @returns True if the character is alphanumeric, false otherwise
 */
const isAlphaNum = (c: string): boolean => {
    const code = c.charCodeAt(0);
    // 0–9
    if (code >= 48 && code <= 57) return true;
    // a–z
    if (code >= 97 && code <= 122) return true;
    return false;
};

/**
 * Normalizes a single character by converting Unicode lookalikes to ASCII equivalents.
 * Removes noise characters and filters out emoji and other non-alphanumeric content.
 * @param ch - The character to normalize
 * @returns The normalized ASCII character, or null if the character should be ignored
 */
export function normalizeChar(ch: string): string | null {
    let lower = ch.toLowerCase();

    // Homoglyph letter map
    if (unicodeMap[lower]) return unicodeMap[lower];
    // Homoglyph digits map
    if (unicodeDigits[lower]) return unicodeDigits[lower];

    if (lower.length === 1 && isAlphaNum(lower)) return lower;

    // ignore noise characters entirely
    if (ignoreChars.has(ch)) return null;

    // drop everything else (emoji etc)
    return null;
}

/**
 * Reduces consecutive repeated characters to a maximum of two repetitions.
 * Example: "heeeeello" becomes "heello"
 * @param text - The text to process
 * @returns The text with excessive character repetitions removed
 */
export function squashRepeats(text: string): string {
    return text.replace(/(.)\1{2,}/gi, "$1$1");
}

export function isWordBoundary(text: string, index: number): boolean {
    if (index < 0 || index >= text.length) return true;

    const char = text[index];
    if (!char) return true;

    const n = normalizeChar(char);

    // If the original character was dropped (emoji, punctuation, space, symbol)
    // treat it as a word boundary
    if (!n) return true;

    return !/[a-z0-9]/i.test(n);
}