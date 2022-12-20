import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React, { useContext } from 'react'
import { Context, Laakeannos } from '../context/context'

export const BolusYhteensa : React.FC = () : React.ReactElement => {

    const { bolus, bolusSumma, mlVrkSumma, laakeTaulukko } = useContext(Context)
    const kasetti50 = (bolusSumma.reduce((prev : number, next : number) => {return prev + next}, 0));

  return (
    <TableContainer sx={{width:"29.5%", marginLeft:"0.5%"}}>
    <Table sx={{ borderRadius:"10px", backgroundColor:"lightgray", boxShadow: 5}} aria-label="simple table">
      <TableHead>
        <TableRow sx={{backgroundColor:"lightgreen"}}>
        <TableCell>Max bol/h huomioiden oletettu käyttöaika</TableCell>
        <TableCell align="center">riittävyys (50ml)</TableCell>
          <TableCell align="center">riittävyys (100ml)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>h</TableCell>
          <TableCell align="center">
            {
            (laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
            ? ((kasetti50 + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma * 50)) / (mlVrkSumma + bolus.ml * bolus.maxH * 24)).toFixed(2)
            : (kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24)).toFixed(2)
            }
            </TableCell>
          <TableCell align="center">
            {
            (laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
            ? ((kasetti50 + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma * 50)) / (mlVrkSumma + bolus.ml * bolus.maxH * 24) * 2).toFixed(2)
            : (kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24) * 2).toFixed(2)
            }
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
          <TableCell align="left">vrk</TableCell>
          <TableCell align="center">
          {
            (laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
            ? ((kasetti50 + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma * 50)) / (mlVrkSumma + bolus.ml * bolus.maxH * 24) * 24).toFixed(2)
            : (kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24) * 24).toFixed(2)
            }
          </TableCell>
          <TableCell align="center">
          {
            (laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
            ? ((kasetti50 + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma * 50)) / (mlVrkSumma + bolus.ml * bolus.maxH * 24) * 24 * 2).toFixed(2)
            : (kasetti50 / (mlVrkSumma + bolus.ml * bolus.maxH * 24) * 24 * 2).toFixed(2)
            }
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )
}
