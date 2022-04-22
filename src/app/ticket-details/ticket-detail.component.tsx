import { FC, useState, useEffect } from 'react';
import {
  Divider,
  Heading,
  Box,
  Stack,
  Text,
  CircularProgress,
  Select,
} from '@chakra-ui/react';
import { BackendService, Ticket, User } from '../../backend';

interface TicketDetailProps {
  ticket: Ticket;
  backend: BackendService;
  handleAssign: (userId: string) => Promise<void>;
}

const TicketDetail: FC<TicketDetailProps> = ({
  ticket,
  backend,
  handleAssign,
}) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const sub = backend.users().subscribe((result) => {
      setLoading(false);
      setUsers(result);
    });
    return () => sub.unsubscribe(); // clean up subscription
  }, []);
  return (
    <Box>
      <Heading>{ticket.description}</Heading>
      <Divider my={4} />
      <Stack direction="row" justify="space-between" align="center">
        <Text>Assignee:</Text>
        {loading ? (
          <CircularProgress isIndeterminate size="12px" />
        ) : (
          <Select
            size="sm"
            value={ticket.assigneeId || ''}
            maxW="150px"
            onChange={async (e) => {
              setLoading(true);
              await handleAssign(e.target.value);
              setLoading(false);
            }}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        )}
      </Stack>
    </Box>
  );
};

export default TicketDetail;
