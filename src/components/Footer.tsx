import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import GenericDialog from './GenericDialog'

export const Footer : React.FC = () : React.ReactElement => {
  
  const [dialogProps, setDialogProps] = useState({
    open : false
  });

  const reset = () => {
    setDialogProps({...dialogProps, open : true})
  }

  return (
    <div style={{display:"flex-col", margin:"auto"}}>
      <Button onClick={() => reset()}>RESETOI SOVELLUS</Button>
      <Typography
        paddingBottom={1}
        textAlign={"center"} 
        fontSize={10}
        margin={"auto"}
        >Petri Nykänen {new Date().getFullYear()}{<br></br>}
        petri.nykaenen@gmail.com
      </Typography>
      <GenericDialog dialogOpen={dialogProps.open} dialogTitle={"Testi"} dialogOptions={setDialogProps}>
         <Typography></Typography>
      </GenericDialog>
    </div>
  )
}
