import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FC } from 'react';
import TicketList from './ticket-list';
import { BackendService } from '../backend';
import TicketDetails from './ticket-details';

interface AppProps {
  backend: BackendService;
}

const App: FC<AppProps> = ({ backend }) => (
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TicketList backend={backend} />} />
        <Route path="/:id" element={<TicketDetails backend={backend} />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
