import React, { createContext, useEffect, useState } from "react";
import laakeaineet from "../laakeaineet.json";

export const Context: React.Context<any> = createContext(undefined);

interface Props {
  children: React.ReactNode;
}

export interface Laakeannos {
  valmiste: string;
  laVahvuus: number;
  mgVrk: number;
}

export interface Muokkaus {
  paalla: boolean;
  tiedot: Laakeannos;
}

export interface Bolus {
  ml: number;
  maxH: number;
}

export const ContextProvider: React.FC<Props> = (props: Props): React.ReactElement<Props> => {
  const [ohje, setOhje] = useState<any>({
    auki: false,
    sivu: 0
  });

  const [bolus, setBolus] = useState<Bolus>({
    ml: 1,
    maxH: 3
  });

  const [muokkausTila, setMuokkaustila] = useState<Muokkaus>({
    paalla: false,
    tiedot: { valmiste: "", laVahvuus: 0, mgVrk: 0 }
  });

  const [laakeTaulukko, setLaakeTaulukko] = useState<Laakeannos[]>(
    !localStorage.getItem("laakeaineet")
      ? []
      : JSON.parse(String(localStorage.getItem("laakeaineet")))
  );

  const [mlVrkSumma, setMlVrkSumma] = useState<number>(
    laakeTaulukko
      ?.filter((elem: Laakeannos) => elem.valmiste !== "Natriumkloridi")
      .reduce((edellinen: number, seuraava: Laakeannos) => {
        return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus);
      }, 0)
  );

  const [riittavyys50ml, setRiittavyys50ml] = useState<number>(
    laakeTaulukko
      ?.filter((elem: Laakeannos) => elem.valmiste !== "Natriumkloridi")
      .reduce((edellinen: number, seuraava: Laakeannos) => {
        return (
          edellinen +
          Number(
            ((seuraava.mgVrk / seuraava.laVahvuus / mlVrkSumma) * 50) /
              (seuraava.mgVrk / seuraava.laVahvuus)
          )
        );
      }, 0)
  );

  const summaTaulukko: any[] = Array.from(
    laakeTaulukko?.filter((elem: Laakeannos) => elem.valmiste !== "Natriumkloridi"),
    (laake: Laakeannos) => {
      const mlVrk = laake.mgVrk / laake.laVahvuus;
      const kasetti50 = (mlVrk / mlVrkSumma) * 50;

      if (isNaN(kasetti50 / mlVrk)) return 0;
      else return kasetti50 / mlVrk;
    }
  );

  const bolusSumma: any[] = Array.from(
    laakeTaulukko.filter((elem: Laakeannos) => elem.valmiste !== "Natriumkloridi"),
    (laake: Laakeannos) => {
      const mlVrk = laake.mgVrk / laake.laVahvuus;
      const kasetti50 = (mlVrk / mlVrkSumma) * 50;

      if (isNaN(kasetti50)) return 0;
      else return kasetti50;
    }
  );

  const [vaihtoehdot, setVaihtoehdot] = useState<Laakeannos[]>(laakeaineet);

  const paivitaTaulukko = () => {
    if (laakeTaulukko.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0) {
      setMlVrkSumma(
        laakeTaulukko
          ?.filter((elem: Laakeannos) => elem.valmiste !== "Natriumkloridi")
          .reduce((edellinen: number, seuraava: Laakeannos) => {
            return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus);
          }, 0) +
          Number(
            laakeTaulukko?.filter((elem: Laakeannos) => elem.valmiste === "Natriumkloridi")[0].mgVrk
          )
      );
    } else {
      setMlVrkSumma(
        laakeTaulukko
          ?.filter((elem: Laakeannos) => elem.valmiste !== "Natriumkloridi")
          .reduce((edellinen: number, seuraava: Laakeannos) => {
            return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus);
          }, 0)
      );
    }
    setVaihtoehdot(laakeaineet.filter((item: Laakeannos) => !laakeTaulukko.includes(item)));
  };

  const getIndex = (): number => {
    let idx = 0;

    for (let i = 0; i < summaTaulukko.length; i++) {
      if (summaTaulukko[i] !== 0) idx++;
    }
    return idx;
  };

  useEffect(() => {
    paivitaTaulukko();
    localStorage.setItem("laakeaineet", JSON.stringify(laakeTaulukko));
  }, [laakeTaulukko]);

  return (
    <Context.Provider
      value={{
        laakeTaulukko,
        setLaakeTaulukko,
        mlVrkSumma,
        setMlVrkSumma,
        riittavyys50ml,
        setRiittavyys50ml,
        bolus,
        setBolus,
        summaTaulukko,
        getIndex,
        bolusSumma,
        ohje,
        setOhje,
        vaihtoehdot,
        setVaihtoehdot,
        muokkausTila,
        setMuokkaustila,
        paivitaTaulukko
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
