import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context, Laakeannos } from '../context/context'

export const Yhteensa : React.FC = () : React.ReactElement => {

    const { laakeTaulukko, mlVrkSumma, riittavyys50ml, nacl } = useContext(Context)
    const summaTaulukko : any[] = Array.from(laakeTaulukko, (laake : Laakeannos) => {

        let mlVrk = laake.mgVrk / laake.laVahvuus;
        let mgH = mlVrk / 24 * laake.laVahvuus;
        let pitMgMl = mlVrk / mlVrkSumma * laake.laVahvuus
        let kasetti50 = mlVrk / mlVrkSumma * 50;
        let kasetti100 = mlVrk / mlVrkSumma * 100;
        let riittavyys50kaVrk = kasetti50 / mlVrk;

        if (isNaN(kasetti50 / mlVrk))
        return 0;
        else return kasetti50 / mlVrk;
    })

    const getIndex = () : number => {

      let idx : number = 0;

      for(let i = 0; i < summaTaulukko.length; i++)
      {
        if (summaTaulukko[i] !== 0)
        idx++;
      }
      return idx + 1;
    }

  return (
    <TableContainer sx={{width:"29.5%", marginLeft:"0.5%"}}>

      <Button onClick={() => console.log(
        (
          summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0) 
          + (nacl.mgVrk / nacl.laVahvuus) / mlVrkSumma * 50 / (nacl.mgVrk / nacl.laVahvuus)
        )
        
        / getIndex())}>TEST</Button>


    <Table sx={{ borderRadius:"10px", backgroundColor:"lightgray", boxShadow: 5}} aria-label="simple table">
      <TableHead>
        <TableRow sx={{backgroundColor:"lightgreen"}}>
        <TableCell>Yhteensä</TableCell>
          <TableCell align="center">50</TableCell>
          <TableCell align="center">100</TableCell>
        </TableRow>
        <TableRow>
        <TableCell>ml/h huomioiden oletettu käyttöaika</TableCell>
          <TableCell align="center">riittävyys (50ml)</TableCell>
          <TableCell align="center">riittävyys (100ml)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
                <TableCell align="left">vrk</TableCell>
                <TableCell align="center">{
                (
                          (
                            summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0) 
                            + (nacl.mgVrk / nacl.laVahvuus) / mlVrkSumma * 50 / (nacl.mgVrk / nacl.laVahvuus)
                          )
                          
                          / getIndex()
                ).toFixed(2)

                }</TableCell>
                                <TableCell align="center">{
                (
                          (
                            summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0) 
                            + (nacl.mgVrk / nacl.laVahvuus) / mlVrkSumma * 50 / (nacl.mgVrk / nacl.laVahvuus)
                          )
                          
                          / getIndex()
                          * 2
                ).toFixed(2)
                }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    h
                  </TableCell>
                  <TableCell align="center">
                  {
                (
                          (
                            summaTaulukko.reduce((prev : number, next : number) => {return prev + next}, 0) 
                            + (nacl.mgVrk / nacl.laVahvuus) / mlVrkSumma * 50 / (nacl.mgVrk / nacl.laVahvuus)
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
                            + (nacl.mgVrk / nacl.laVahvuus) / mlVrkSumma * 50 / (nacl.mgVrk / nacl.laVahvuus)
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
