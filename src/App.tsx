import { Button, Container } from '@mui/material';
import React from 'react';
import { Bolus } from './components/Bolus';
import { Taulukko } from './components/Taulukko';
import { Yhteensa } from './components/Yhteensa';

function App() {
  return (
    <>
    <Button variant="outlined" sx={{marginTop:"1%", marginLeft:"5%"}}>OHJE</Button>
    <Container sx={{width:"1200px", display:"flex", flexWrap:"wrap"}}>

      <Container sx={{display:"flex", flexWrap:"nowrap"}}>
          <Taulukko/>
          <Yhteensa/>
      </Container>

      <Container sx={{display:"flex", flexWrap:"nowrap", marginTop:"1%"}}>
        <Bolus/>
        <Yhteensa/>
      </Container>
    </Container>
  </>
  );
}

export default App;
