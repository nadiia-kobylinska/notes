import React, {ReactNode} from 'react';
import { Container } from '@mui/material';
import { FloatingActionBar } from './FloatingActionBar/FloatingActionBar';

interface PageWrapperProps {
  children?: ReactNode;
}
function Lobby({ children }: PageWrapperProps): JSX.Element {
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
