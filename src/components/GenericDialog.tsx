import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
  dialogOpen: boolean
  dialogTitle: string;
  children: ReactNode;
  dialogOptions: Dispatch<SetStateAction<{ open: boolean; }>>
}

const GenericDialog = (props: Props) => {
  const { dialogOpen, dialogTitle, dialogOptions, children } = props;
  return (
    <Dialog
      open={dialogOpen}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}

export default GenericDialog