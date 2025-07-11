import Icon from './Icon.svelte';

import { render, screen } from '@testing-library/svelte';

describe('<Icon />', () => {
  it('renders an icon with a title', () => {
    render(Icon, { path: 'test', title: 'foo' });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTitle('foo')).toBeInTheDocument();
  });

  it('renders an img', () => {
    render(Icon, { src: 'test', title: 'foo' });

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
