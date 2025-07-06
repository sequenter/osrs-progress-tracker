import Progress from './Progress.svelte';

import { render, screen } from '@testing-library/svelte';

describe('<Progress />', () => {
  it('renders a progress card with a title and progress values', () => {
    render(Progress, { complete: 5, title: 'foo', total: 15 });

    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('33.33%')).toBeInTheDocument();

    expect(screen.getByLabelText('complete')).toHaveTextContent('5');
    expect(screen.getByLabelText('incomplete')).toHaveTextContent('10');
    expect(screen.getByLabelText('total')).toHaveTextContent('15');
  });

  it('renders a progress bar with a correct progress value', () => {
    render(Progress, { complete: 5, title: '', total: 10 });

    expect(screen.getByRole('progressbar')).toHaveValue(50);
  });
});
