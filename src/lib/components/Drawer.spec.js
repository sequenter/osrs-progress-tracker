import Drawer from './Drawer.svelte';

import { SKILLS } from '$lib/constants';

import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

const exampleSkill = 'Agility';

describe('<Drawer />', () => {
  beforeEach(() => {
    render(Drawer);
  });

  it('renders the drawer and a control button', () => {
    expect(screen.getByTestId('drawer:closed')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-button')).toBeInTheDocument();
  });

  it('can be open and closed by the control button', async () => {
    const control = screen.getByTestId('drawer-button');

    await userEvent.click(control);
    expect(screen.getByTestId('drawer:open')).toBeInTheDocument();

    await userEvent.click(control);
    expect(screen.getByTestId('drawer:closed')).toBeInTheDocument();
  });

  it('renders all skills within the drawer', () => {
    SKILLS.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('allows skills to be unlocked', async () => {
    const unlockButton = screen.getByLabelText(`Unlock ${exampleSkill}`);

    expect(unlockButton).toBeInTheDocument();
    expect(screen.queryByLabelText(`Decrement ${exampleSkill}`)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(`Increment ${exampleSkill}`)).not.toBeInTheDocument();

    await userEvent.click(unlockButton);
    expect(unlockButton).not.toBeInTheDocument();
    expect(screen.queryByLabelText(`Decrement ${exampleSkill}`)).toBeInTheDocument();
    expect(screen.queryByLabelText(`Increment ${exampleSkill}`)).toBeInTheDocument();
  });

  it('allows skill levels to be incremented and decremented', async () => {
    const decrementButton = screen.getByLabelText(`Decrement ${exampleSkill}`);
    const incrementButton = screen.getByLabelText(`Increment ${exampleSkill}`);
    const skillLevel = screen.getByLabelText(`${exampleSkill} level`);

    expect(skillLevel).toBeInTheDocument();
    expect(skillLevel).toHaveTextContent('1');

    await userEvent.click(incrementButton);
    expect(skillLevel).toHaveTextContent('2');

    await userEvent.click(decrementButton);
    expect(skillLevel).toHaveTextContent('1');
  });

  it('resets the skill to a locked state when going below the minimum', async () => {
    await userEvent.click(screen.getByLabelText(`Decrement ${exampleSkill}`));

    expect(screen.getByLabelText(`Unlock ${exampleSkill}`)).toBeInTheDocument();
  });
});
