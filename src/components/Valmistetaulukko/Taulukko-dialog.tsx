import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Context } from "../../context/context";

interface Props {
  vahvuusMuok: any;
  setVahvuusMuok: Dispatch<SetStateAction<any>>;
}

const TaulukkoDialog = (props: Props) => {
  const { vahvuusMuok, setVahvuusMuok } = props;
  const { laakeTaulukko, setLaakeTaulukko } = useContext(Context);
  return (
    <Dialog open={vahvuusMuok.dialog}>
      <DialogContent>
        <DialogContentText>
          Haluatko varmasti muuttaa lääkeaineen ({vahvuusMuok.nimi}) vahvuutta?
        </DialogContentText>

        <DialogActions>
          <Button
            onClick={() => {
              laakeTaulukko[vahvuusMuok.arvo].laVahvuus = vahvuusMuok.muutos;
              setVahvuusMuok({ ...vahvuusMuok, paalla: false, arvo: 0, dialog: false });
              setLaakeTaulukko([...laakeTaulukko]);
            }}
          >
            Vahvista muokkaus
          </Button>
          <Button
            onClick={() =>
              setVahvuusMuok({ ...vahvuusMuok, paalla: false, arvo: 0, dialog: false })
            }
          >
            Peruuta
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default TaulukkoDialog;
