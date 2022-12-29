import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React, { useContext } from 'react'
import { Context, Laakeannos } from '../context/context'

export const Yhteensa : React.FC = () : React.ReactElement => {

    const { ohje, mlVrkSumma, summaTaulukko, getIndex, bolusSumma, laakeTaulukko } = useContext(Context)

  return (
    <TableContainer sx={{width:"29.5%", marginLeft:"0.5%"}}>
    <Table sx={{ borderRadius:"10px", backgroundColor:"lightgray", boxShadow: 5}} aria-label="simple table">
      <TableHead>
        <TableRow sx={{backgroundColor:"lightgreen"}}>
        <TableCell>Yhteensä</TableCell>
          <TableCell align="center">
            {
              Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
              ? (bolusSumma.reduce((prev : number, next : number) => {return prev + next}, 0)
                + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma * 50)).toFixed(2)
              : (bolusSumma.reduce((prev : number, next : number) => {return prev + next}, 0)).toFixed(2)
            }
          </TableCell>
          <TableCell align="center">
          {
              Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
              ? ((bolusSumma.reduce((prev : number, next : number) => {return prev + next}, 0)
                + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma * 50)) * 2).toFixed(2)
              : (bolusSumma.reduce((prev : number, next : number) => {return prev + next}, 0) * 2).toFixed(2)
            }
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell>ml/h huomioiden oletettu käyttöaika</TableCell>
          <TableCell align="center">riittävyys (50ml)</TableCell>
          <TableCell align="center">riittävyys (100ml)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
                <TableCell align="left" sx={
            (ohje.sivu === 3)
            ?{border:"5px solid blue"}
            :{}
            }>vrk</TableCell>
                <TableCell align="center">{
          
            Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
            ? ((summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0)
              + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma 
              / laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk!
              * 50)) / (getIndex() + 1)).toFixed(2)
            : (summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0) / getIndex()).toFixed(2)
          

                }</TableCell>
                <TableCell align="center">{
                  Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi").length > 0)
                  ? ((summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0)
                    + Number(laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk! / mlVrkSumma 
                    / laakeTaulukko!.filter((elem : Laakeannos) => elem.valmiste === "Natriumkloridi")[0]!.mgVrk!
                    * 50)) / (getIndex() + 1) * 2).toFixed(2)
                  : (summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0) / getIndex() * 2).toFixed(2)
                }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  align="left" sx={
            (ohje.sivu === 3)
            ?{border:"5px solid blue"}
            :{}
            }>
                    h
                  </TableCell>
                  <TableCell align="center">
                  {
                (
                          (
                            summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0) 
                          )
                          
                          / getIndex()
                          * 24
                ).toFixed(2)
                }
                  </TableCell>
                  <TableCell align="center">
                  {
                (
                          (
                            summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0)
                          )
                          
                          / getIndex()
                          * 24 * 2
                ).toFixed(2)
                }
                  </TableCell>
                </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )
}
