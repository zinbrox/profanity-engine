# Profanity Filter

A powerful, efficient profanity detection and filtering library using the Aho-Corasick algorithm with Unicode normalization support.

## Features

- **Fast Pattern Matching**: Uses Aho-Corasick algorithm for efficient multi-pattern searching
- **Unicode Normalization**: Detects profanity even when obfuscated with lookalike characters (e.g., `h3ll0`, `ħëļļő`)
- **Character Repetition Handling**: Catches variations like `heeeello` or `heeeeellllllo`
- **Whitelist Support**: Override blacklist matches with approved words
- **Word Boundary Detection**: Optional strict matching at word boundaries only
- **Flexible Censoring**: Replace detected profanity with custom mask characters

## Installation

```bash
npm install profanity-engine
```

## Quick Start

```typescript
import { ProfanityFilter } from 'profanity-engine';

// Create a filter with blacklisted words
const filter = new ProfanityFilter(['badword', 'offensive']);

// Check if text contains profanity
filter.isProfane('This contains a badword'); // true

// Find all matches
const matches = filter.find('This has badword and offensive text');
// Returns: [
//   { word: 'badword', start: 9, end: 16 },
//   { word: 'offensive', start: 21, end: 30 }
// ]

// Censor profanity
filter.censor('This is a badword'); // "This is a *******"
```

## Advanced Usage

### With Whitelist

```typescript
const filter = new ProfanityFilter(
  ['ass', 'hell'],
  ['lass', 'hello'] // Whitelist overrides
);

filter.isProfane('lass'); // false (whitelisted)
filter.isProfane('ass');  // true
```

### With Options

```typescript
const filter = new ProfanityFilter(
  ['bad'],
  [],
  {
    wordBoundary: true,    // Only match whole words
    logProfanity: true     // Log matches to console for debugging
  }
);

filter.isProfane('bad');      // true
filter.isProfane('badminton'); // false (wordBoundary: true)
```

### Custom Censoring

```typescript
const filter = new ProfanityFilter(['secret']);

filter.censor('This is secret', '#'); // "This is ######"
filter.censor('This is secret', '█'); // "This is ██████"
```

## API Reference

### Constructor

```typescript
new ProfanityFilter(
  words: string[],
  whitelist?: string[],
  options?: ProfanityOptions
)
```

**Parameters:**
- `words`: Array of blacklisted words to detect
- `whitelist`: Optional array of words that override blacklist matches
- `options`: Optional configuration object
  - `wordBoundary`: Only match words at word boundaries (default: false)
  - `logProfanity`: Enable console logging for debugging (default: false)

### Methods

#### `isProfane(text: string): boolean`

Checks if the text contains any profane words.

```typescript
filter.isProfane('clean text'); // false
filter.isProfane('bad text');   // true
```

#### `find(text: string): Match[]`

Returns all profanity matches found in the text.

```typescript
const matches = filter.find('text with profanity');
// Returns: Array<{ word: string, start: number, end: number }>
```

#### `censor(text: string, maskChar?: string): string`

Censors profane words by replacing alphabetic characters with a mask character.

```typescript
filter.censor('profane text');       // "******* text"
filter.censor('profane text', '#');  // "####### text"
```

## How It Works

### 1. Unicode Normalization

The filter normalizes characters to prevent evasion through lookalike characters:

- **Homoglyphs**: `ħ → h`, `3 → e`, `@ → a`, `$ → s`
- **Accented letters**: `é → e`, `ñ → n`, `ü → u`
- **Cyrillic/Greek**: `α → a`, `о → o`, `с → c`
- **Fullwidth characters**: `Ａ → a`, `０ → 0`

### 2. Repetition Squashing

Excessive character repetition is reduced to maximum 2 consecutive characters:
- `heeeeello` → `heello`
- `baaaaaad` → `baad`

### 3. Noise Character Removal

Punctuation and separators are ignored during matching:
- `b.a.d` → `bad`
- `h-e-l-l` → `hell`

### 4. Aho-Corasick Algorithm

Uses an efficient trie-based automaton for simultaneous multi-pattern matching in O(n + m) time, where n is text length and m is total matches.

## Performance

- **Time Complexity**: O(n + m) where n is text length, m is number of matches
- **Space Complexity**: O(k) where k is total characters in all patterns
- Efficiently handles thousands of blacklisted words
- Single-pass text scanning

## Limitations

- Only supports text-based profanity detection
- May have false positives with word boundary mode disabled
- Requires comprehensive blacklist for effective filtering
- Does not understand context or semantic meaning

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues, questions, or feature requests, please open an issue on GitHub.