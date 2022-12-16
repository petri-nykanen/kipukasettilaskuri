import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useContext } from 'react'
import { Context, Laakeannos } from '../context/context'

export const Valinta : React.FC = () : React.ReactElement => {

    const { ohje, setOhje, vaihtoehdot, laakeTaulukko, setLaakeTaulukko } = useContext(Context)

    const handleChange = (event: SelectChangeEvent) => {
        if (!new Set(laakeTaulukko).has(event.target.value))
        setLaakeTaulukko([...laakeTaulukko, event.target.value]);
      };
    
  return (
<FormControl sx={{width:"50%", margin:"10px"}}>
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
  </Select>
</FormControl>
  )
}
