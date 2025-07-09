import IconButton from './IconButton.svelte';

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

describe('<IconButton />', () => {
  it('renders a button with an icon', () => {
    render(IconButton, { label: 'foo', path: '', onclick: () => {} });

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByLabelText('foo')).toBeInTheDocument();
  });

  it('calls the onclick callback', async () => {
    const callback = vi.fn();

    render(IconButton, { label: 'foo', path: '', onclick: callback });
    expect(screen.getByRole('button')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));
    expect(callback).toHaveBeenCalled();
  });
});
