import React, { FC, useEffect, useState } from 'react';
import {
  Center,
  Container,
  Heading,
  Text,
  CircularProgress,
  Stack,
  Divider,
  Select,
  Box,
} from '@chakra-ui/react';
import { BackendService, Ticket } from '../../backend';
import TicketListItem from './ticket-list-item.component';
import CreateTicket from './create-ticket.component';
import { firstValueFrom } from 'rxjs';

interface TicketListProps {
  backend: BackendService;
}

enum FilterState {
  all = 'all',
  completed = 'completed',
  inProgress = 'inProgress',
}

const TicketList: FC<TicketListProps> = ({ backend }: TicketListProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<FilterState>(FilterState.all);

  // The backend returns observables, but you can convert to promises if
  // that is easier to work with. It's up to you.
  useEffect(() => {
    try {
      const sub = backend.tickets().subscribe((result) => {
        setLoading(false);
        setTickets(result);
      });
      return () => sub.unsubscribe(); // clean up subscription
    } catch (e: any) {
      setError(e.toString());
      setLoading(false);
    }
  }, [backend]);

  const getFilteredTickets = () => {
    switch (filter) {
      case FilterState.all:
        return tickets;
      case FilterState.completed:
        return tickets.filter((t) => t.completed);
      case FilterState.inProgress:
        return tickets.filter((t) => !t.completed);
    }
  };

  const handleSaveTicket = async (description: string) => {
    {
      try {
        await firstValueFrom(backend.newTicket({ description }));
        const result = await firstValueFrom(backend.tickets());
        setTickets([...result]);
      } catch (e) {
        console.log('Error saving ticket', e);
      }
    }
  };

  const handleStatusChange = async (id: number, completed: boolean) => {
    try {
      await firstValueFrom(backend.complete(id, completed));
    } catch (e) {
      console.error('Error toggling', e);
    }
  };

  return (
    <Container>
      <Heading my="6">Tickets</Heading>
      <Stack direction="row" spacing="4" justify="space-between" align="center">
        <Text>Filter</Text>
        <Select
          value={filter}
          onChange={(v) => {
            setFilter(v.currentTarget.value as FilterState);
          }}
        >
          <option value={FilterState.all}>All</option>
          <option value={FilterState.completed}>Completed</option>
          <option value={FilterState.inProgress}>In Progress</option>
        </Select>
      </Stack>
      <Divider mt="4" mb="8" />
      <Box mb="4">
        <CreateTicket saveTicket={handleSaveTicket} />
      </Box>
      {error && <Text>{error}</Text>}
      {!loading ? (
        getFilteredTickets().length > 0 ? (
          getFilteredTickets().map((t) => (
            <TicketListItem
              key={t.id}
              ticket={t}
              toggleStatus={handleStatusChange}
            />
          ))
        ) : !error ? (
          <Text>No tickets found!</Text>
        ) : null
      ) : (
        <Center>
          <CircularProgress isIndeterminate size="30px" />
        </Center>
      )}
    </Container>
  );
};

export default TicketList;
