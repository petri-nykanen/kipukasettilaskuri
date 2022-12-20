import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useContext } from 'react'
import { Context, Laakeannos } from '../context/context'

export const Valinta : React.FC = () : React.ReactElement => {

    const { ohje, setOhje, vaihtoehdot, laakeTaulukko, setLaakeTaulukko, muokkausTila, setMuokkaustila } = useContext(Context)

    const handleChange = (event: SelectChangeEvent) => {
        if (!new Set(laakeTaulukko).has(event.target.value))
        {
          if (event.target.value === "Muu"){
            setMuokkaustila({...muokkausTila, paalla : true})
          }
          else setLaakeTaulukko([...laakeTaulukko, event.target.value]);
        }
      };
    
  return (
<FormControl sx={{width:"100%", margin:"10px"}}>
  <InputLabel id="demo-simple-select-label">Valitse lääkeaine</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={handleChange}
  >
    {
        vaihtoehdot.map((laake : any, idx : number ) => {
            return (<MenuItem key={idx} value={laake}>{laake.valmiste}</MenuItem>)
        })
    }
    <MenuItem value={"Muu"}>Muu (kirjaa mikä)</MenuItem>
  </Select>
</FormControl>
  )
}
