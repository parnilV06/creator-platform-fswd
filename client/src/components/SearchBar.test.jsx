// src/components/SearchBar.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {

  it('updates the displayed query as the user types', async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    await user.type(screen.getByLabelText(/search/i), 'react testing');

    // The input itself should have the typed value
    expect(screen.getByLabelText(/search/i)).toHaveValue('react testing');

    // The conditional paragraph should now be visible
    expect(screen.getByText(/you searched for: react testing/i))
      .toBeInTheDocument();
  });

  it('shows nothing when the search field is empty', () => {
    render(<SearchBar />);

    expect(screen.queryByText(/you searched for/i))
      .not.toBeInTheDocument();
  });

});