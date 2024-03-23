import { render, screen } from '@testing-library/react';
import { WordGroups } from './WordGroups';

describe('WordGroups', () => {
    const title = 'Test Title';
    const categories = ['category1', 'category2'];
    const words = ['word1', 'word2', 'word3'];

    it('renders title', () => {
        render(<WordGroups title={title} words={words} />);
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeVisible();
    });

    it('renders words without grouping if groupWords is not provided', () => {
        render(<WordGroups title={title} words={words} />);
        words.forEach((word) => {
            expect(screen.getByText(word)).toBeVisible();
        });
    });

    it('renders grouped words if groupWords is provided', () => {
        const groupWords = (words: string[]) => {
            return {
                category1: ['word1', 'word2'],
                category2: ['word3'],
            };
        };

        render(<WordGroups title={title} words={words} groupWords={groupWords} />);

        categories.forEach((category) => {
            expect(screen.getByText(category)).toBeVisible();
        });
        words.forEach((word) => {
            expect(screen.getByText(word)).toBeVisible();
        });
    });
});