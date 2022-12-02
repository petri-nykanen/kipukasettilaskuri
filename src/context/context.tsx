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


export const ContextProvider : React.FC<Props> = (props : Props) : React.ReactElement<Props> => {

  const [nacl, setNacl] = useState<Laakeannos>(
    {
      valmiste: "Natriumkloridi (9 mg/ml)",
      laVahvuus: 9,
      mgVrk: 10
    },
  );

  
    const [laakeTaulukko, setLaakeTaulukko] = useState<Laakeannos[]>([
      {
        valmiste: "Morfiini (20 mg/ml)",
        laVahvuus: 20,
        mgVrk: 30
      },
      {
        valmiste: "Oksikodoni (10 mg/ml)",
        laVahvuus: 10,
        mgVrk: 0
      },
      {
        valmiste: "Hydromorfiini (50 mg/ml)",
        laVahvuus: 50,
        mgVrk: 0
      },
      {
        valmiste: "Haloperidoli (5 mg/ml)",
        laVahvuus: 5,
        mgVrk: 5
      },
      {
        valmiste: "Midatsolaami (5 mg/ml)",
        laVahvuus: 5,
        mgVrk: 0
      },
      {
        valmiste: "Glykopyrroni (0.2 mg/ml)",
        laVahvuus: 0.2,
        mgVrk: 1.2
      },
    ])

    const [mlVrkSumma, setMlVrkSumma] = useState<number>(laakeTaulukko!.reduce((edellinen : number, seuraava : Laakeannos) => {return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus)}, 0))

    // const [riittavyys50ml, setRiittavyys50ml] = useState<number>(laakeTaulukko!.reduce((edellinen : number, seuraava : Laakeannos) => {return edellinen + Number((((
    //   seuraava.mgVrk / seuraava.laVahvuus / mlVrkSumma * 50) / 
    //   ((0.0000000001 + seuraava.mgVrk) / seuraava.laVahvuus)
    //   + (nacl.mgVrk / nacl.laVahvuus / mlVrkSumma * 50) / (nacl.mgVrk / nacl.laVahvuus))
    //   / 4
    //    ))}, 0))

    const [riittavyys50ml, setRiittavyys50ml] = useState<number>(laakeTaulukko!.reduce((edellinen : number, seuraava : Laakeannos) => {return edellinen + Number(
      (
        (
          ((seuraava.mgVrk / seuraava.laVahvuus) / mlVrkSumma * 50)
          /
          ((seuraava.mgVrk + 0.0000001) / seuraava.laVahvuus)
        )
        +
        (
          ((nacl.mgVrk / nacl.laVahvuus) / mlVrkSumma * 50)
          /
          (nacl.mgVrk / nacl.laVahvuus)
        )
      )
    )}, 0))

    useEffect(() => {
      setLaakeTaulukko([...laakeTaulukko])
      setMlVrkSumma(laakeTaulukko!.reduce((edellinen : number, seuraava : Laakeannos) => {return edellinen + Number(seuraava.mgVrk / seuraava.laVahvuus)}, 0) + Number(nacl.mgVrk))
    }, [laakeTaulukko])
    

  return (
    <Context.Provider value={{
      laakeTaulukko,
      setLaakeTaulukko,
      mlVrkSumma,
      setMlVrkSumma,
      nacl,
      setNacl,
      riittavyys50ml,
      setRiittavyys50ml
    }}>
        {props.children}
    </Context.Provider>
  )
}
