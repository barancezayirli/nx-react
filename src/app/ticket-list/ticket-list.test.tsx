import React from 'react';
import { render } from '@testing-library/react';
import { BackendService } from '../../backend';
import TicketList from './index';

describe('Ticket List', () => {
  test('renders the ticket list with header', () => {
    const backend = new BackendService();
    const { getByText } = render(<TicketList backend={backend} />);
    const header = getByText('Tickets');
    expect(header).toBeInTheDocument();
  });
});
