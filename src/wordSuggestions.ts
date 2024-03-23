import dictionary from './assets/dictionary.json';

type Dictionary = {
    words: string[];
}

export type Words = {
    pangrams: string[];
    otherWords: string[];
};

const dictionaryData = dictionary as Dictionary;

export function getWords(requiredLetter: string, letterList: string[]): Words {
    const words: Words = { pangrams: [], otherWords: [] };
    dictionaryData.words.forEach(word => {
        const uniqueWordLetters = new Set(word.split(''));
        const matchingLetters = letterList.filter(letter => uniqueWordLetters.has(letter));
        if (uniqueWordLetters.has(requiredLetter) && matchingLetters.length === uniqueWordLetters.size) {
            words.otherWords.push(word)
            if (letterList.length === uniqueWordLetters.size) {
                words.pangrams.push(word)
            };
        };

    });
    return words;
}

