import { groupWordsByCategory, groupWordsByFirstLetter, groupWordsByFirstTwoLetters } from './wordGrouping';

describe('groupWordsByCategory', () => {
    it('should group words by category correctly', () => {
        const words = ['apple', 'banana', 'cat', 'dog', 'elephant'];
        const getCategory = (word: string) => word.charAt(0);

        const result = groupWordsByCategory(words, getCategory);

        expect(result).toEqual({
            a: ['apple'],
            b: ['banana'],
            c: ['cat'],
            d: ['dog'],
            e: ['elephant'],
        });
    });

    it('should handle empty words array', () => {
        const words: string[] = [];
        const getCategory = (word: string) => word.charAt(0);

        const result = groupWordsByCategory(words, getCategory);

        expect(result).toEqual({});
    });

    it('should handle words with the same category', () => {
        const words = ['apple', 'avocado', 'apricot'];
        const getCategory = (word: string) => 'fruit';

        const result = groupWordsByCategory(words, getCategory);

        expect(result).toEqual({
            fruit: ['apple', 'avocado', 'apricot'],
        });
    });
});

describe('groupWordsByFirstLetter', () => {
    it('should group words by first letter correctly', () => {
        const words = ['apple', 'banana', 'cat', 'dog', 'elephant'];

        const result = groupWordsByFirstLetter(words);

        expect(result).toEqual({
            A: ['apple'],
            B: ['banana'],
            C: ['cat'],
            D: ['dog'],
            E: ['elephant'],
        });
    });

    it('should handle empty words array', () => {
        const words: string[] = [];

        const result = groupWordsByFirstLetter(words);

        expect(result).toEqual({});
    });

    it('should handle words with the same first letter', () => {
        const words = ['apple', 'avocado', 'apricot'];

        const result = groupWordsByFirstLetter(words);

        expect(result).toEqual({
            A: ['apple', 'avocado', 'apricot'],
        });
    });
});

describe('groupWordsByFirstTwoLetters', () => {
    it('should group words by first two letters correctly', () => {
        const words = ['apple', 'banana', 'cat', 'dog', 'elephant'];
        const result = groupWordsByFirstTwoLetters(words);

        expect(result).toEqual({
            AP: ['apple'],
            BA: ['banana'],
            CA: ['cat'],
            DO: ['dog'],
            EL: ['elephant'],
        });
    });

    it('should handle empty words array', () => {
        const words: string[] = [];
        const result = groupWordsByFirstTwoLetters(words);

        expect(result).toEqual({});
    });

    it('should handle words with the same first two letters', () => {
        const words = ['apple', 'apt', 'apricot'];
        const result = groupWordsByFirstTwoLetters(words);

        expect(result).toEqual({
            AP: ['apple', 'apt', 'apricot'],
        });
    });
});