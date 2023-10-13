import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../context/context";

export const Valinta: React.FC = (): React.ReactElement => {
  const {
    vaihtoehdot,
    setVaihtoehdot,
    laakeTaulukko,
    setLaakeTaulukko,
    setMuokkaustila,
    muokkausTila
  } = useContext(Context);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "Muu") {
      setMuokkaustila({ ...muokkausTila, paalla: true });
    } else {
      setVaihtoehdot(vaihtoehdot.filter((el: any) => el !== event.target.value));
      setLaakeTaulukko([...laakeTaulukko, event.target.value]);
    }
  };

  return (
    <FormControl sx={{ width: "150%", margin: "auto" }}>
      <InputLabel shrink={false} id="demo-simple-select-label">
        Lisää lääkeaine
      </InputLabel>
      <Select
        displayEmpty
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={""}
        onChange={(e: SelectChangeEvent) => handleChange(e)}
      >
        {vaihtoehdot.map((laake: any) => {
          return <MenuItem value={laake}>{laake.valmiste}</MenuItem>;
        })}
        <MenuItem value={"Muu"}>Muu (kirjaa mikä)</MenuItem>
      </Select>
    </FormControl>
  );
};
