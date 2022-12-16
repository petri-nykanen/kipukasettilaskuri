import React, { createContext, useEffect, useState } from 'react'

export const Context : React.Context<any> = createContext(undefined);

interface Props {
    children : React.ReactNode
}

export interface Laakeannos {
  valmiste: string
  laVahvuus: number
  mgVrk: number
}

interface Bolus {
  ml : number
  maxH : number
}


export const ContextProvider : React.FC<Props> = (props : Props) : React.ReactElement<Props> => {

  const [ohje, setOhje] = useState<any>({
    auki : false,
    sivu : 0
  })

  const [bolus, setBolus] = useState<Bolus>({
    ml : 1,
    maxH : 3
  });

  
    const [laakeTaulukko, setLaakeTaulukko] = useState<Laakeannos[]>([
    ])

    const [vaihtoehdot, setVaihtoehdot] = useState<Laakeannos[]>([
      {
        valmiste: "Morfiini",
        laVahvuus: 20,
        mgVrk: 30
      },
      {
        valmiste: "Oksikodoni",
        laVahvuus: 10,
        mgVrk: 0
      },
      {
        valmiste: "Hydromorfiini",
        laVahvuus: 50,
        mgVrk: 0
      },
      {
        valmiste: "Haloperidoli",
        laVahvuus: 5,
        mgVrk: 5
      },
      {
        valmiste: "Midatsolaami",
        laVahvuus: 5,
        mgVrk: 0
      },
      {
        valmiste: "Glykopyrroni",
        laVahvuus: 0.2,
        mgVrk: 1.2
      },
      {
        valmiste: "Muu (kirjaa mikä)",
        laVahvuus: 0,
        mgVrk: 0
      },
      {
        valmiste: "Natriumkloridi",
        laVahvuus: 9,
        mgVrk: 10
      },
      
    ])

    const [muu, setMuu] = useState<Laakeannos>(

    );

    const [mlVrkSumma, setMlVrkSumma] = useState<number>(
      laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste !== "Natriumkloridi").reduce((edellinen : number, seuraava : Laakeannos) => {return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus)}, 0)
      )

    const [riittavyys50ml, setRiittavyys50ml] = useState<number>(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste !== "Natriumkloridi").reduce((edellinen : number, seuraava : Laakeannos) => {
      return (edellinen + Number(
        (
          (
            ((seuraava.mgVrk / seuraava.laVahvuus) / mlVrkSumma * 50)
            /
            ((seuraava.mgVrk) / seuraava.laVahvuus)
          )
        )))}, 0))

    const summaTaulukko : any[] = Array.from(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste !== "Natriumkloridi"), (laake : Laakeannos) => {

      let mlVrk = laake.mgVrk / laake.laVahvuus;
      let mgH = mlVrk / 24 * laake.laVahvuus;
      let pitMgMl = mlVrk / mlVrkSumma * laake.laVahvuus
      let kasetti50 = mlVrk / mlVrkSumma * 50;
      let kasetti100 = mlVrk / mlVrkSumma * 100;
      let riittavyys50kaVrk = kasetti50 / mlVrk;

      if (isNaN(kasetti50 / mlVrk))
      return 0;
    else if (laakeTaulukko.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
    return kasetti50 / mlVrk + (Number(laakeTaulukko.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0].mgVrk / mlVrkSumma * 50));
    else
    return kasetti50 / mlVrk;
  })

  const bolusSumma : any[] = Array.from(laakeTaulukko.filter((elem : Laakeannos) => elem.valmiste !== "Natriumkloridi"), (laake : Laakeannos) => {

    let mlVrk = laake.mgVrk / laake.laVahvuus;
    let kasetti50 = mlVrk / mlVrkSumma * 50;

    if (isNaN(kasetti50))
      return 0;
    else
    return kasetti50;
})

  const getIndex = () : number => {

    let idx : number = 0;

    for(let i = 0; i < summaTaulukko.length; i++)
    {
      if (summaTaulukko[i] !== 0)
      idx++;
    }
    console.log(idx)
    return idx;
  }

    useEffect(() => {
      if (laakeTaulukko === laakeTaulukko)
      setLaakeTaulukko([...laakeTaulukko])
      if (laakeTaulukko.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
      {
      setMlVrkSumma(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste !== "Natriumkloridi").reduce((edellinen : number, seuraava : Laakeannos) => {return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus)}, 0) + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0].mgVrk)
      )
      }
      else setMlVrkSumma(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste !== "Natriumkloridi").reduce((edellinen : number, seuraava : Laakeannos) => {return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus)}, 0))


    }, [laakeTaulukko])
    

  return (
    <Context.Provider value={{
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
      muu,
      setMuu,
      vaihtoehdot,
      setVaihtoehdot
    }}>
        {props.children}
    </Context.Provider>
  )
}
