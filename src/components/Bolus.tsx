import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context, Laakeannos } from '../context/context'

export const Bolus : React.FC = () : React.ReactElement => {

    const { ohje, setOhje, laakeTaulukko, mlVrkSumma, bolus, setBolus } = useContext(Context)

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
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell
          sx={
            (ohje.sivu === 4)
            ?{border:"5px solid blue"}
            :{}
            }
          align="center"><TextField defaultValue={bolus.ml} onChange={(e) => setBolus({...bolus, ml : Number(e.target.value)})}/></TableCell>
          <TableCell 
          sx={
            (ohje.sivu === 4)
            ?{border:"5px solid blue"}
            :{}
            }
          align="center"><TextField defaultValue={bolus.maxH} onChange={(e) => setBolus({...bolus, maxH : Number(e.target.value)})}/></TableCell>
          <TableCell align="center">{(60 / bolus.maxH).toFixed(2)}</TableCell>
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
        { laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste !== "Natriumkloridi").map((laake : Laakeannos, idx : number) => {

          let mlVrk = laake.mgVrk / laake.laVahvuus;
          let mgH = mlVrk / 24 * laake.laVahvuus;
          let pitMgMl = Number(mlVrk / mlVrkSumma * laake.laVahvuus)
          let kasetti50 = mlVrk / mlVrkSumma * 50;
          let pitoisuus = pitMgMl * (mlVrkSumma / 24)
          let bolusMg = pitMgMl * bolus.ml
          let maxBolMgH = Number(bolusMg) * Number(bolus.maxH)
          let maxLisa = maxBolMgH * 24

            return (
              <>
              <TableRow key={idx}>

                <TableCell>
                  {
                    (laake.valmiste === "Natriumkloridi (9 mg/ml)")
                    ? <Typography>{laake.valmiste}</Typography>
                    : <TextField defaultValue={laake.valmiste} sx={{width:"100%"}}/>
                  }
                  </TableCell>

                  <TableCell align="center">{(pitMgMl) === 0 ?<></> :(pitMgMl).toFixed(2)}</TableCell>

                  <TableCell align="center">{(pitMgMl) === 0 ?<></> :(pitoisuus).toFixed(2)}</TableCell>

                <TableCell align="center"><b>{(bolusMg) === 0 ?<></> :(bolusMg).toFixed(2)}</b></TableCell>
                <TableCell align="center">{(maxBolMgH) === 0 ?<></> :(maxBolMgH).toFixed(2)}</TableCell>
                <TableCell align="center">{(maxLisa) === 0 ?<></> :(maxLisa).toFixed(2)}</TableCell>
                </TableRow>
              </>
            )
        })
        }
      </TableBody>
    </Table>
  </TableContainer>
  )
}
