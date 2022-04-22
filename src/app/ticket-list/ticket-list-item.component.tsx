import { FC, useState } from 'react';
import { Box, Checkbox, CircularProgress, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Ticket } from '../../backend';

interface TicketListItemProps {
  ticket: Ticket;
  toggleStatus: (id: number, completed: boolean) => Promise<void>;
}

const TicketListItem: FC<TicketListItemProps> = ({ ticket, toggleStatus }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Stack
      direction="row"
      spacing="4"
      py={2}
      px={4}
      backgroundColor="gray.50"
      borderColor="gray.200"
      borderWidth="1px"
      mb={1}
    >
      <Box flex={1}>
        <Link to={`/${ticket.id}`}>
          <Text>{ticket.description}</Text>
        </Link>
      </Box>
      {loading ? (
        <CircularProgress isIndeterminate size="18px" />
      ) : (
        <Checkbox
          isChecked={ticket.completed}
          onChange={async () => {
            setLoading(true);
            await toggleStatus(ticket.id, !ticket.completed);
            setLoading(false);
          }}
        />
      )}
    </Stack>
  );
};

export default TicketListItem;
