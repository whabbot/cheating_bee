export enum GroupingMethod {
    FIRST_LETTER = "First Letter",
    WORD_LENGTH = "Word Length",
    FIRST_TWO_LETTERS = "First Two Letters",
}
export type WordGroup = { [category: string]: string[] }

export const groupWordsByCategory = (words: string[], getCategory: (word: string) => string): WordGroup => {
    const groupedWords: WordGroup = {};

    words.forEach((word) => {
        const category = getCategory(word);
        if (groupedWords[category]) {
            groupedWords[category].push(word);
        } else {
            groupedWords[category] = [word];
        }
    });

    return groupedWords;

}

export const groupWordsByFirstLetter = (words: string[]): WordGroup => groupWordsByCategory(words, (word) => word[0].toUpperCase());
export const groupWordsByLength = (words: string[]): WordGroup => groupWordsByCategory(words, (word) => word.length.toString());
export const groupWordsByFirstTwoLetters = (words: string[]): WordGroup => groupWordsByCategory(words, (word) => word.slice(0, 2).toUpperCase());

export const groupMethods = {
    [GroupingMethod.FIRST_LETTER]: groupWordsByFirstLetter,
    [GroupingMethod.WORD_LENGTH]: groupWordsByLength,
    [GroupingMethod.FIRST_TWO_LETTERS]: groupWordsByFirstTwoLetters,
}
