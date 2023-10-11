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

  const [vaihtoehdot, setVaihtoehdot] = useState<Laakeannos[]>(
    !localStorage.getItem("valinta")
      ? laakeaineet.sort((a: Laakeannos, b: Laakeannos) => {
          if (a.valmiste > b.valmiste) return 1;
          else return -1;
        })
      : JSON.parse(String(localStorage.getItem("valinta"))).sort((a: Laakeannos, b: Laakeannos) => {
          if (a.valmiste > b.valmiste) return 1;
          else return -1;
        })
  );

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
  };

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
      // let mgH = mlVrk / 24 * laake.laVahvuus;
      // let pitMgMl = mlVrk / mlVrkSumma * laake.laVahvuus
      const kasetti50 = (mlVrk / mlVrkSumma) * 50;
      // let kasetti100 = mlVrk / mlVrkSumma * 100;
      // let riittavyys50kaVrk = kasetti50 / mlVrk;

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
    localStorage.setItem(
      "valinta",
      JSON.stringify(vaihtoehdot.filter((el: any) => !laakeTaulukko?.includes(el)))
    );
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
        setMuokkaustila
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
