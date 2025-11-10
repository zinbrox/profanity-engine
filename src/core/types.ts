export interface Match {
    /** The matched word */
    word: string;
    /** The start index of the original text */
    start: number;
    /** The end index of the original text */
    end: number;
}

export interface ProfanityOptions {
    wordBoundary?: boolean;
    logProfanity?: boolean;
    allowCompound?: boolean;
}