import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context, Laakeannos } from '../context/context'

export const Taulukko : React.FC = () : React.ReactElement => {

    const { laakeTaulukko, mlVrkSumma, nacl } = useContext(Context)

  return (
    <TableContainer sx={{width:"70%"}}>
    <Table sx={{ borderRadius:"10px", backgroundColor:"lightgray", boxShadow: 5}} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>Valmiste</TableCell>
          <TableCell align="center">LA-Vahvuus (mg/ml)</TableCell>
          <TableCell align="center">mg/vrk</TableCell>
          <TableCell align="center">ml/vrk</TableCell>
          <TableCell align="center">mg/h</TableCell>
          <TableCell align="center">pit mg/ml</TableCell>
          <TableCell sx={{backgroundColor:"lightgreen"}} align="center">kasetissa ml 50</TableCell>
          <TableCell sx={{backgroundColor:"lightgreen"}} align="center">kasetissa ml 100</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{nacl.valmiste}</TableCell>
          <TableCell align="center">{nacl.laVahvuus}</TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"><TextField sx={{backgroundColor:"orange"}} defaultValue={nacl.mgVrk} onChange={(e) => nacl.mgVrk = e.target.value}/></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center">{(nacl.mgVrk / mlVrkSumma * 50).toFixed(2)}</TableCell>
          <TableCell align="center">{(nacl.mgVrk / mlVrkSumma * 100).toFixed(2)}</TableCell>
        </TableRow>
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
