import React, { useContext, useEffect, useState } from "react";
import { Context, Laakeannos } from "../../context/context";
import TaulukkoNakyma from "./Taulukko-nakyma";
import laakeaineet from "../../laakeaineet.json";

const TaulukkoContainer = () => {
  const { laakeTaulukko, setLaakeTaulukko, muokkausTila, setMuokkaustila, setVaihtoehdot } =
    useContext(Context);

  const [vahvuusMuok, setVahvuusMuok] = useState<any>({
    paalla: false,
    arvo: 0,
    dialog: false,
    nimi: "",
    muutos: 0
  });

  const poisto = (laake: Laakeannos) => {
    setLaakeTaulukko(laakeTaulukko.filter((item: any) => item !== laake));
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
    <TaulukkoNakyma vahvuusMuok={vahvuusMuok} setVahvuusMuok={setVahvuusMuok} poisto={poisto} />
  );
};

export default TaulukkoContainer;
