import DarkMode from './DarkMode.svelte';

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

describe('<DarkMode />', () => {
  it('renders a toggle button', () => {
    render(DarkMode);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('sets localStorage when clicked', async () => {
    const user = userEvent.setup();
    render(DarkMode);

    const button = screen.getByRole('button');

    // Toggle dark mode on
    await user.click(button);

    expect(JSON.parse(localStorage.getItem('preference/darkmode') || '""')).toBeTruthy();
    expect(screen.getByTitle('Toggle dark mode off')).toBeInTheDocument();

    // Toggle dark mode off
    await user.click(button);

    expect(JSON.parse(localStorage.getItem('preference/darkmode') || '""')).toBeFalsy();
    expect(screen.getByTitle('Toggle dark mode on')).toBeInTheDocument();
  });
});
