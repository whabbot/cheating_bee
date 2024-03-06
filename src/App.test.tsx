
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders form fields', () => {
  render(<App />);
  const requiredLetterInput = screen.getByLabelText(/required letter/i);
  const allLettersInput = screen.getByLabelText(/all letters/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });
  const resetButton = screen.getByRole('button', { name: /reset/i });

  expect(requiredLetterInput).toBeInTheDocument();
  expect(allLettersInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

test('submits form and displays words', () => {
  render(<App />);
  const requiredLetterInput = screen.getByLabelText(/required letter/i);
  const allLettersInput = screen.getByLabelText(/all letters/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(requiredLetterInput, { target: { value: 'a' } });
  fireEvent.change(allLettersInput, { target: { value: 'abcde' } });
  fireEvent.click(submitButton);

  const pangrams = screen.getByText(/pangrams/i);
  const otherWords = screen.getByText(/other words/i);

  expect(pangrams).toBeInTheDocument();
  expect(otherWords).toBeInTheDocument();
});