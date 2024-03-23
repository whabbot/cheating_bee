import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
    xit('renders the form and submits data correctly', () => {
        render(<App />);

        // Fill in the form inputs
        const allLettersInput = screen.getByLabelText('7 Letters');
        fireEvent.change(allLettersInput, { target: { value: 'abcdefg' } });

        const requiredLetterInput = screen.getByLabelText('Required letter');
        fireEvent.change(requiredLetterInput, { target: { value: 'a' } });

        // Submit the form
        const submitButton = screen.getByText('Search');
        fireEvent.click(submitButton);

        // Verify that the words are displayed
        const wordElement1 = screen.getByText('word1');
        expect(wordElement1).toBeVisible();

        const wordElement2 = screen.getByText('word2');
        expect(wordElement2).toBeVisible();

        // Reset the form
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        // Verify that the words are cleared
        expect(wordElement1).not.toBeInTheDocument();
        expect(wordElement2).not.toBeInTheDocument();
    });

    xit('should display an error message if the required letter is not one of the seven letters', () => {
        render(<App />);

        // Fill in the form inputs
        const allLettersInput = screen.getByLabelText('7 Letters');
        fireEvent.change(allLettersInput, { target: { value: 'abcdefg' } });

        const requiredLetterInput = screen.getByLabelText('Required letter');
        fireEvent.change(requiredLetterInput, { target: { value: 'z' } });

        // Submit the form
        const submitButton = screen.getByText('Search');
        fireEvent.click(submitButton);

        // Verify that the error message is displayed
        const errorMessage = screen.getByText('The required letter must be one of the seven letters');
        expect(errorMessage).toBeVisible();
    });

    xit('should display an error message if all letters are not different', () => {
        render(<App />);

        // Fill in the form inputs
        const allLettersInput = screen.getByLabelText('7 Letters');
        fireEvent.change(allLettersInput, { target: { value: 'aabbccd' } });

        const requiredLetterInput = screen.getByLabelText('Required letter');
        fireEvent.change(requiredLetterInput, { target: { value: 'a' } });

        // Submit the form
        const submitButton = screen.getByText('Search');
        fireEvent.click(submitButton);

        // Verify that the error message is displayed
        const errorMessage = screen.getByText('All letters should be different');
        expect(errorMessage).toBeVisible();
    });
});