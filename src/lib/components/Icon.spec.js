import Icon from './Icon.svelte';

import { render, screen } from '@testing-library/svelte';

describe('<Icon />', () => {
  it('renders an icon with a title', () => {
    render(Icon, { path: '', title: 'foo' });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTitle('foo')).toBeInTheDocument();
  });
});
