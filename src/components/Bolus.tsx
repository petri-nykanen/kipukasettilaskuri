import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context, Laakeannos } from '../context/context'

export const Bolus : React.FC = () : React.ReactElement => {

    const { laakeTaulukko, mlVrkSumma, nacl } = useContext(Context)

  return (
    <TableContainer sx={{width:"70%"}}>
    <Table sx={{ borderRadius:"10px", backgroundColor:"lightgray", boxShadow: 5}} aria-label="simple table">
      <TableHead>
      <TableRow>
        <TableCell>Boluksien määritys</TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center">bolus ml</TableCell>
          <TableCell align="center">max bol/h</TableCell>
          <TableCell align="center">lukko (min)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center">pitoisuus</TableCell>
          <TableCell align="center">mg/h</TableCell>
          <TableCell align="center">bolus mg</TableCell>
          <TableCell align="center">maxbol mg/h</TableCell>
          <TableCell align="center">max lisä mg/24h</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { laakeTaulukko!.map((laake : Laakeannos, idx : number) => {

          let mlVrk = laake.mgVrk / laake.laVahvuus;
          let mgH = mlVrk / 24 * laake.laVahvuus;
          let pitMgMl = mlVrk / mlVrkSumma * laake.laVahvuus
          let kasetti50 = mlVrk / mlVrkSumma * 50;
          let kasetti100 = mlVrk / mlVrkSumma * 100;
          let riittavyys50kaVrk = kasetti50 / mlVrk;

            return (
              <>
              <TableRow>

                <TableCell>
                  {
                    (laake.valmiste === "Natriumkloridi (9 mg/ml)")
                    ? <Typography>{laake.valmiste}</Typography>
                    : <TextField defaultValue={laake.valmiste} sx={{width:"100%"}}/>
                  }
                  </TableCell>

                <TableCell align="center">
                  {
                    (laake.valmiste === "Natriumkloridi (9 mg/ml)")
                    ? <Typography>{laake.laVahvuus}</Typography>
                    : <TextField defaultValue={laake.laVahvuus} sx={{width:"100%"}}/>
                  }
                  </TableCell>

                <TableCell align="center">
                  {
                    (laake.valmiste === "Natriumkloridi (9 mg/ml)")
                    ? <></>
                    : <TextField sx={{backgroundColor:"orange"}} defaultValue={laake.mgVrk} onChange={(e) => laakeTaulukko[idx].mgVrk = e.target.value}/>
                  }
                  </TableCell>

                <TableCell align="center"><b>{(mlVrk) === 0 ?<></> :(mlVrk).toFixed(2)}</b></TableCell>
                <TableCell align="center">{(mgH) === 0 ?<></> :(mgH).toFixed(2)}</TableCell>
                <TableCell align="center">{(pitMgMl) === 0 ?<></> :(pitMgMl).toFixed(2)}</TableCell>
                <TableCell align="center">{(kasetti50) === 0 ?<></> :(kasetti50).toFixed(2)}</TableCell>
                <TableCell align="center">{(kasetti100) === 0 ?<></> :(kasetti100).toFixed(2)}</TableCell>
                </TableRow>
              </>
            )
        })
        }
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell sx={{backgroundColor:"yellow"}} align="center">{mlVrkSumma} ml/vrk</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell sx={{backgroundColor:"yellow"}} align="center">{(mlVrkSumma / 24).toFixed(2)} ml/h</TableCell>
                    </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )
}
