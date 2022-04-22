import React, { FC, useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';

interface CreateTicketProps {
  saveTicket: (description: string) => Promise<void>;
}

const CreateTicket: FC<CreateTicketProps> = ({ saveTicket }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <Stack direction="row" spacing="4" align="center">
      <Input
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="New Ticket"
        size="sm"
        disabled={loading}
      />
      <Button
        size="sm"
        colorScheme="blue"
        disabled={!description || loading}
        isLoading={loading}
        onClick={async () => {
          setLoading(true);
          await saveTicket(description);
          setLoading(false);
          setDescription('');
        }}
      >
        Add New
      </Button>
    </Stack>
  );
};

export default CreateTicket;
