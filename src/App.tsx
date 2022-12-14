import { Button, Container } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { Bolus } from './components/Bolus';
import { BolusYhteensa } from './components/BolusYhteensa';
import { Taulukko } from './components/Taulukko';
import { Valinta } from './components/Valinta';
import { Yhteensa } from './components/Yhteensa';
import { Context } from './context/context';

function App() {

  const { ohje, setOhje, laakeTaulukko } = useContext(Context)

  const titleRef = useRef<any>();
  const headerRef = useRef<any>();
  const totalRef = useRef<any>();

  const scroll = () => {
    titleRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollHead = () => {
    headerRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
    <Container ref={headerRef} sx={{width:"1200px", display:"flex", flexWrap:"wrap"}}>
    {
      (ohje.auki)
      ? <Container sx={{}}>
        {
          (ohje.sivu === 1)
          ? 
          <>
          <p>
          Määrää lääkkeen vrk-annos mg (oranssi kenttä), saat vastaavan määrä ml:ssa viereiseen sarakkeeseen

          </p>
          <Button variant="outlined" onClick={() => {setOhje({...ohje, sivu : 2}); scroll()}}>Seuraava</Button>
          </>
          : (ohje.sivu === 3)
          ? 
          <>
          <p>
          Määrää tarvittaessa NaCl tilavuus (oranssi kenttä) pyrkien pieneen infuusionopeuteen (0,1-2,0 ml/h), tarkista samalla kasetin riittävyys vuorokausissa (vrk) ja tuntia (h)


          </p>
          <Button sx={{display:"block"}} variant="outlined" onClick={() => {setOhje({...ohje, sivu : 4}); scroll()}}>Seuraava</Button>
          </>
          : <></>
        }
      </Container>
      : <></>
    }
    <br/>
    { (ohje.auki === false)
      ?<Button variant="outlined" sx={{margin:"10px", display:"block"}} onClick={() => setOhje({...ohje, auki : true, sivu : 1})}>OHJE</Button>
      :<></>
    }
    <Valinta/>
    { (laakeTaulukko.length > 0)
      ?<Container sx={{display:"flex", flexWrap:"nowrap"}}>
          <Taulukko/>
          <Yhteensa/>
      </Container>
      :<></>
    }
      {
        (ohje.sivu === 2)
        ? 
        <>
        <p>
        Katso liuoksen minimimäärä vuorokaudessa ja tunnissa.

        </p>
        <Button variant="outlined" onClick={() => {setOhje({...ohje, sivu : 3}); scrollHead()}}>Seuraava</Button>
        </>
        :(ohje.sivu === 4)
        ?
        <>
        <p>Tarvittaessa, määritä bolukset alas taulukkoon ml ja max bol/h</p>
        <Button sx={{marginLeft:"10px"}} variant="outlined" onClick={() => {setOhje({...ohje, auki : false, sivu : 0}); scrollHead()}}>Seuraava</Button>
        </>
        : <></>
      }
      {
        (laakeTaulukko.length > 0)
      ?<Container sx={{display:"flex", flexWrap:"nowrap", marginTop:"1%"}} ref={titleRef}>
        <Bolus/>
        <BolusYhteensa/>
      </Container>
      :<></>
      }
    </Container>
    
  </>
  );
}

export default App;
