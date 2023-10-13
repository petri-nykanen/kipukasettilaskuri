import { Grid, Button, Typography, Card, Box } from "@mui/material";
import React, { useContext } from "react";
import { Bolus } from "./components/Bolustaulukko.tsx/Bolus";
import { BolusYhteensa } from "./components/Bolustaulukko.tsx/BolusYhteensa";
import { Footer } from "./components/Footer";
import { Valinta } from "./components/Valinta";
import { Yhteensa } from "./components/Valmistetaulukko/Yhteensa";
import { Context } from "./context/context";
import Header from "./components/Header";
import TaulukkoContainer from "./components/Valmistetaulukko/Taulukko-container";
import TemplateSelect from "./components/Kasettipohja/Valitse-pohja";

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
    <Grid
      spacing={4}
      sx={{
        maxWidth: "1300px",
        margin: "auto",
        direction: "column"
      }}
    >
      <Header />
      <br />
      {laakeTaulukko.length ? <TemplateSelect /> : null}

      <Grid container direction={"row"}>
        {renderInstructions()}
      </Grid>

      <br />
      {ohje.auki === false && laakeTaulukko.length > 0 ? (
        <Button
          variant="outlined"
          sx={{ margin: "10px", display: "block" }}
          onClick={() => setOhje({ ...ohje, auki: true, sivu: 1 })}
        >
          Ohje
        </Button>
      ) : null}

      {laakeTaulukko.length > 0 ? (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid container spacing={2} columns={{ sm: 6, lg: 12 }}>
            <TaulukkoContainer />
            <Yhteensa />
          </Grid>

          <Grid container spacing={2} columns={{ sm: 6, lg: 12 }} sx={{ mt: "1%" }}>
            <Bolus />
            <BolusYhteensa />
          </Grid>
        </Grid>
      ) : (
        <Card sx={{ width: "50%", borderRadius: "20px", border: "5px solid #3dd966", m: "auto" }}>
          <Typography align="center" sx={{ padding: "20px", backgroundColor: "#3dd966" }}>
            Aloita lisäämällä taulukkoon lääkeaine tai valitsemalla tallennettu kipukasettipohja
          </Typography>
          <Box sx={{ p: 3, backgroundColor: "#cfffdd", display: "flex", flexDirection: "column" }}>
            <Valinta />
            <TemplateSelect />
          </Box>
        </Card>
      )}
      <Footer />
    </Grid>
  );
}

export default App;
