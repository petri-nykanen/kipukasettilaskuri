import { TableContainer } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Context, Laakeannos } from "../../context/context";
import TaulukkoNakyma from "./Taulukko-nakyma";

const TaulukkoBox = () => {
  const {
    laakeTaulukko,
    setLaakeTaulukko,
    muokkausTila,
    setMuokkaustila,
    setVaihtoehdot,
    vaihtoehdot
  } = useContext(Context);

  const [vahvuusMuok, setVahvuusMuok] = useState<any>({
    paalla: false,
    arvo: 0,
    dialog: false,
    nimi: "",
    muutos: 0
  });

  const poisto = (indeksi: number) => {
    setLaakeTaulukko(
      laakeTaulukko.filter((elementti: any) => {
        return elementti !== laakeTaulukko[indeksi];
      })
    );
    if (
      laakeTaulukko[indeksi].valmiste === "Morfiini" ||
      laakeTaulukko[indeksi].valmiste === "Oksikodoni" ||
      laakeTaulukko[indeksi].valmiste === "Hydromorfiini" ||
      laakeTaulukko[indeksi].valmiste === "Haloperidoli" ||
      laakeTaulukko[indeksi].valmiste === "Midatsolaami" ||
      laakeTaulukko[indeksi].valmiste === "Glykopyrroni" ||
      laakeTaulukko[indeksi].valmiste === "Natriumkloridi"
    )
      setVaihtoehdot(
        [...vaihtoehdot, laakeTaulukko[indeksi]].sort((a: Laakeannos, b: Laakeannos) => {
          if (a.valmiste > b.valmiste) return 1;
          else return -1;
        })
      );
  };

  useEffect(() => {
    if (
      muokkausTila.tiedot.valmiste !== "" &&
      muokkausTila.tiedot.laVahvuus !== 0 &&
      muokkausTila.tiedot.mgVrk !== 0
    ) {
      setLaakeTaulukko([...laakeTaulukko, muokkausTila.tiedot]);
      setMuokkaustila({
        ...muokkausTila,
        paalla: false,
        tiedot: { valmiste: "", laVahvuus: 0, mgVrk: 0 }
      });
      localStorage.setItem("laakeaineet", JSON.stringify(laakeTaulukko));
    }
  }, [muokkausTila]);

  return (
    <TableContainer sx={{ width: "70%", border: "3px solid #259443", boxShadow: 3 }}>
      <TaulukkoNakyma vahvuusMuok={vahvuusMuok} setVahvuusMuok={setVahvuusMuok} poisto={poisto} />
    </TableContainer>
  );
};

export default TaulukkoBox;
