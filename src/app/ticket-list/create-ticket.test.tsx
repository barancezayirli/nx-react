import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CreateTicket from './create-ticket.component';

describe('Create Ticket', () => {
  test('renders add new button disabled', () => {
    const saveTicket = async (description: string) => {};
    const { getByRole } = render(<CreateTicket saveTicket={saveTicket} />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });

  test('button should enable if input is not free', () => {
    const saveTicket = async (description: string) => {};
    const { getByPlaceholderText, getByRole } = render(
      <CreateTicket saveTicket={saveTicket} />
    );
    const input = getByPlaceholderText('New Ticket');
    const button = getByRole('button');
    expect(input).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(button).not.toHaveAttribute('disabled');
  });
});
