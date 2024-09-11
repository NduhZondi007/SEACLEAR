import { render, screen } from '@testing-library/react';
import App from './App';

// Test to verify that the "learn react" link is rendered in the App component
test('renders learn react link', () => {
  // Render the App component into the virtual DOM
  render(<App />);
  
  // Query the DOM for an element with the text "learn react"
  const linkElement = screen.getByText(/learn react/i);
  
  // Assert that the element is present in the document
  expect(linkElement).toBeInTheDocument();
});
