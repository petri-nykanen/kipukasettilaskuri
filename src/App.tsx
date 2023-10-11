import { Button, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Bolus } from "./components/Bolustaulukko.tsx/Bolus";
import { BolusYhteensa } from "./components/Bolustaulukko.tsx/BolusYhteensa";
import { Footer } from "./components/Footer";
import { Valinta } from "./components/Valinta";
import { Yhteensa } from "./components/Valmistetaulukko/Yhteensa";
import { Context } from "./context/context";
import TaulukkoContainer from "./components/Valmistetaulukko/Taulukko-container";

function App() {
  const { ohje, setOhje, laakeTaulukko } = useContext(Context);
  const renderInstructions = () => {
    switch (ohje.sivu) {
      case 1:
        return (
          <>
            <Typography sx={{ padding: "20px" }}>
              Määrää lääkkeen vrk-annos mg (oranssi kenttä), saat vastaavan määrä ml:ssa viereiseen
              sarakkeeseen
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setOhje({ ...ohje, sivu: 2 });
              }}
            >
              Seuraava
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Typography sx={{ padding: "20px" }}>
              Katso liuoksen minimimäärä vuorokaudessa ja tunnissa.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setOhje({ ...ohje, sivu: 3 });
              }}
            >
              Seuraava
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Typography sx={{ padding: "20px" }}>
              Määrää tarvittaessa NaCl tilavuus (oranssi kenttä) pyrkien pieneen infuusionopeuteen
              (0,1-2,0 ml/h), tarkista samalla lääkeannostelijan riittävyys vuorokausissa (vrk) ja
              tuntia (h)
            </Typography>
            <Button
              sx={{ display: "block" }}
              variant="outlined"
              onClick={() => {
                setOhje({ ...ohje, sivu: 4 });
              }}
            >
              Seuraava
            </Button>
          </>
        );
      case 4:
        return (
          <>
            <Typography sx={{ padding: "20px" }}>
              Tarvittaessa, määritä bolukset alas taulukkoon ml ja max bol/h
            </Typography>
            <Button
              sx={{ marginLeft: "10px" }}
              variant="outlined"
              onClick={() => {
                setOhje({ ...ohje, sivu: 5 });
              }}
            >
              Seuraava
            </Button>
          </>
        );
      case 5:
        return (
          <>
            <Typography sx={{ padding: "20px" }}>
              Voit muuttaa lääkeaineen vahvuutta tuplaklikkaamalla kenttää, jolloin avautuu
              tekstikenttä muokkaamista varten.
            </Typography>
            <Button
              sx={{ display: "block" }}
              variant="outlined"
              onClick={() => {
                setOhje({ ...ohje, auki: false, sivu: 0 });
              }}
            >
              Seuraava
            </Button>
          </>
        );
    }
  };

  return (
    <Container sx={{ width: "1200px", display: "flex", flexWrap: "wrap" }}>
      {renderInstructions()}
      <br />
      {ohje.auki === false && laakeTaulukko.length > 0 ? (
        <Button
          variant="outlined"
          sx={{ margin: "10px", display: "block" }}
          onClick={() => setOhje({ ...ohje, auki: true, sivu: 1 })}
        >
          OHJE
        </Button>
      ) : null}

      {laakeTaulukko.length > 0 ? (
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Container sx={{ display: "flex", flexDirection: "row" }}>
            <TaulukkoContainer />
            <Yhteensa />
          </Container>

          <Container sx={{ display: "flex", flexDirection: "row", mt: "1%" }}>
            <Bolus />
            <BolusYhteensa />
          </Container>
        </Container>
      ) : (
        <>
          <Typography sx={{ padding: "20px" }}>Aloita lisäämällä taulukkoon lääkeaine</Typography>
          <Valinta />
        </>
      )}
      <Footer />
    </Container>
  );
}

export default App;
