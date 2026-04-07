// src/components/ToggleButton.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {

  it('starts with "Turn On" label', () => {
    render(<ToggleButton />);

    expect(screen.getByRole('button', { name: /turn on/i }))
      .toBeInTheDocument();
  });

  it('switches to "Turn Off" after one click', async () => {
    const user = userEvent.setup();
    render(<ToggleButton />);

    await user.click(screen.getByRole('button', { name: /turn on/i }));

    expect(screen.getByRole('button', { name: /turn off/i }))
      .toBeInTheDocument();
  });

  it('switches back to "Turn On" after two clicks', async () => {
    const user = userEvent.setup();
    render(<ToggleButton />);

    await user.click(screen.getByRole('button', { name: /turn on/i }));
    await user.click(screen.getByRole('button', { name: /turn off/i }));

    expect(screen.getByRole('button', { name: /turn on/i }))
      .toBeInTheDocument();
  });

});