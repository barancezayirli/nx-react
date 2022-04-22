import React, { FC, useEffect, useState } from 'react';
import { Center, CircularProgress, Container, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { BackendService, Ticket } from '../../backend';
import TicketDetail from './ticket-detail.component';
import { firstValueFrom } from 'rxjs';

interface TicketDetailsProps {
  backend: BackendService;
}

const TicketDetails: FC<TicketDetailsProps> = ({ backend }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (id) {
      try {
        const sub = backend.ticket(+id).subscribe((result) => {
          setLoading(false);
          setTicket(result);
        });
        return () => sub.unsubscribe(); // clean up subscription
      } catch (e: any) {
        setLoading(false);
      }
    }
  }, [backend]);

  return (
    <Container py={12}>
      {loading ? (
        <Center>
          <CircularProgress isIndeterminate size="30px" />
        </Center>
      ) : !ticket ? (
        <Text>Ticket not found!</Text>
      ) : (
        <TicketDetail
          ticket={ticket}
          backend={backend}
          handleAssign={async (id) => {
            try {
              await firstValueFrom(backend.assign(ticket.id, +id));
              ticket.id = +id;
              setTicket(ticket);
            } catch (e) {
              console.error('Error assigning user');
            }
          }}
        />
      )}
    </Container>
  );
};

export default TicketDetails;
