import React, {ReactNode} from 'react';
import { Container } from '@mui/material';
import { FloatingActionBar } from './FloatingActionBar/FloatingActionBar';

const Lobby: React.FC = ({ children }) =>{
  return (
    <>
      <Container maxWidth="lg">
        {children}
      </Container>
      <FloatingActionBar />
    </>
  );
}
export default Lobby;
