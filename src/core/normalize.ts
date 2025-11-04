// Unicode homoglyphs
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

// Characters to ignore (spaces, punctuation separators)
export const ignoreChars = new Set([
    ' ', '\t', '\n',
    '.', ',', '-', '_', '~', '`',
    '/', '\\', '|', '*', '+', '=',
    '(', ')', '[', ']', '{', '}',
    '\'', '"', ':', ';', '!', '?'
]);

const isAlphaNum = (c: string): boolean => {
    const code = c.charCodeAt(0);
    // 0–9
    if (code >= 48 && code <= 57) return true;
    // a–z
    if (code >= 97 && code <= 122) return true;
    return false;
};

export function normalizeChar(ch: string): string | null {
    const lower = ch.toLowerCase();

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

export function squashRepeats(text: string): string {
    return text.replace(/(.)\1{2,}/gi, "$1$1");
}