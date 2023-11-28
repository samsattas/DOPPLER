import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ConfirmationDialog = ({title, content, handleClose = () => {}, confirm = () => {}, open}) => {
  return(
    <Dialog
      open={open}
      maxWidth='xl'
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <div className="flex justify-evenly w-full">
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={confirm}>Confirmar</Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;