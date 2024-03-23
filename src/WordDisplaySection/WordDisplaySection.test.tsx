import { render, screen, fireEvent } from '@testing-library/react';
import { WordDisplaySection } from './WordDisplaySection';
import { GroupingMethod } from './wordGrouping';

describe('WordDisplaySection', () => {
    const words = {
        pangrams: ['pangram1', 'pangram2'],
        otherWords: ['word1', 'word2'],
    };

    it('renders pangrams section if pangrams exist', () => {
        render(<WordDisplaySection words={words} />);
        const pangramsSection = screen.getByText('Pangrams:');
        expect(pangramsSection).toBeInTheDocument();
    });

    it('renders words section if otherWords exist', () => {
        render(<WordDisplaySection words={words} />);
        const wordsSection = screen.getByText('Words containing these letters:');
        expect(wordsSection).toBeInTheDocument();
    });

    it('renders select element with correct options', () => {
        render(<WordDisplaySection words={words} />);
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(Object.values(GroupingMethod).length);
    });

    it('updates select when different options selected', () => {
        render(<WordDisplaySection words={words} />);
        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, { target: { value: GroupingMethod.WORD_LENGTH } });

        const options = screen.getAllByRole('option') as HTMLOptionElement[];
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    });
});