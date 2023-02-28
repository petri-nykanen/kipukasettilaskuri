import { Typography } from '@mui/material'
import React from 'react'

export const Footer : React.FC = () : React.ReactElement => {
  return (
    <Typography
    paddingTop={10}
    paddingBottom={1}
    textAlign={"center"} 
    fontSize={10}
    margin={"auto"}
    >Petri Nykänen {new Date().getFullYear()}{<br></br>}
    petri.nykaenen@gmail.com
    </Typography>
  )
}
