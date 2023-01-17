import { Button, Container, Typography } from '@mui/material';
import React, { useContext, useRef, } from 'react';
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
          <Typography sx={{padding:"20px"}}>
          Määrää lääkkeen vrk-annos mg (oranssi kenttä), saat vastaavan määrä ml:ssa viereiseen sarakkeeseen

          </Typography>
          <Button variant="outlined" onClick={() => {setOhje({...ohje, sivu : 2}); scroll()}}>Seuraava</Button>
          </>
          : (ohje.sivu === 3)
          ? 
          <>
          <Typography sx={{padding:"20px"}}>
          Määrää tarvittaessa NaCl tilavuus (oranssi kenttä) pyrkien pieneen infuusionopeuteen (0,1-2,0 ml/h), tarkista samalla lääkeannostelijan riittävyys vuorokausissa (vrk) ja tuntia (h)


          </Typography>
          <Button sx={{display:"block"}} variant="outlined" onClick={() => {setOhje({...ohje, sivu : 4}); scroll()}}>Seuraava</Button>
          </>
          : (ohje.sivu === 5)
          ?<><Typography sx={{padding:"20px"}}>
          Voit muuttaa lääkeaineen vahvuutta tuplaklikkaamalla kenttää, jolloin avautuu tekstikenttä muokkaamista varten.
          </Typography>
          <Button sx={{display:"block"}} variant="outlined" onClick={() => {setOhje({...ohje, auki : false, sivu : 0}); scrollHead()}}>Seuraava</Button>
          </>
          :<></>
        }
      </Container>
      : <></>
    }
    <br/>
    { (ohje.auki === false && laakeTaulukko.length > 0)
      ?<Button variant="outlined" sx={{margin:"10px", display:"block"}} onClick={() => setOhje({...ohje, auki : true, sivu : 1})}>OHJE</Button>
      :<></>
    }

    { (laakeTaulukko.length > 0)
      ?<Container sx={{display:"flex", flexWrap:"nowrap"}}>
          <Taulukko/>
          <Yhteensa/>
      </Container>
      :<><Typography sx={{padding:"20px"}}>Aloita lisäämällä taulukkoon lääkeaine</Typography><Valinta/></>
    }
      {
        (ohje.sivu === 2)
        ? 
        <>
        <Typography sx={{padding:"20px"}}>
        Katso liuoksen minimimäärä vuorokaudessa ja tunnissa.

        </Typography>
        <Button variant="outlined" onClick={() => {setOhje({...ohje, sivu : 3}); scrollHead()}}>Seuraava</Button>
        </>
        :(ohje.sivu === 4)
        ?
        <>
        <Typography sx={{padding:"20px"}}>Tarvittaessa, määritä bolukset alas taulukkoon ml ja max bol/h</Typography>
        <Button sx={{marginLeft:"10px"}} variant="outlined" onClick={() => {setOhje({...ohje, sivu : 5}); scrollHead()}}>Seuraava</Button>
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
