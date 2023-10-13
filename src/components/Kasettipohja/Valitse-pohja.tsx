import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useState } from "react";
import { Delete, Save } from "@mui/icons-material";
import { Context, Laakeannos } from "../../context/context";

interface Kasettipohja {
  nimi: string;
  sisalto: Laakeannos[];
}

const TemplateSelect = () => {
  const { laakeTaulukko, setLaakeTaulukko } = useContext(Context);

  const [tallennetutPohjat, setTallennetutPohjat] = useState<Kasettipohja[]>(
    !localStorage.getItem("kasettipohjat")
      ? []
      : JSON.parse(String(localStorage.getItem("kasettipohjat")))
  );

  const [pohja, setPohja] = useState<Kasettipohja>({
    nimi: "",
    sisalto: laakeTaulukko
  });

  const tallennaPohja = () => {
    setPohja({ ...pohja, nimi: String(laakeTaulukko.length), sisalto: laakeTaulukko });
    setTallennetutPohjat([...tallennetutPohjat, pohja]);
    localStorage.setItem("kasettipohjat", JSON.stringify(tallennetutPohjat));
  };

  const renderSelect = () => {
    if (tallennetutPohjat.length) {
      return (
        <FormControl sx={{ width: "80%" }}>
          <InputLabel id="valinta">Valitse tallennettu pohja</InputLabel>
          <Select
            onChange={(e) => setLaakeTaulukko(JSON.parse(String(e.target.value)))}
            labelId="valinta"
          >
            {tallennetutPohjat.map((item: Kasettipohja) => (
              <MenuItem value={JSON.stringify(item.sisalto)}>{item.nimi}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  const templateOptionsButtons = () => {
    if (laakeTaulukko.length)
      return (
        <Box sx={{ p: 1 }}>
          <IconButton onClick={tallennaPohja}>
            <Save />
          </IconButton>
          <IconButton>
            <Delete />
          </IconButton>
        </Box>
      );
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      {renderSelect()} {templateOptionsButtons()}
    </Box>
  );
};

export default TemplateSelect;
