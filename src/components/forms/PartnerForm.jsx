import { LoadingButton } from "@mui/lab";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import cancelIcon from "../../assets/icons/iconCancel.svg";
import { deletePartner, postPartner } from "../../utils/PartnerStore";

const PartnerForm = ({partner, open, close}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [readOnly, setReadOnly] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [jsonPartner, setJsonPartner] = useState({});
  const [isAllDataCorrect, setIsAllDataCorrect] = useState(false);

  useEffect(() => {
    if(partner){
      setJsonPartner(partner);
      setEditMode(true);
      setReadOnly(true)
    }else{
      setJsonPartner({});
      setEditMode(false);
      setReadOnly(false)
    }
  },[partner, open])

  useEffect(() => {
    if(
      !jsonPartner?.name
      || !jsonPartner?.type
      || !jsonPartner?.description
      || !jsonPartner?.phone
    ){
      setIsAllDataCorrect(false)
    }else{
      setIsAllDataCorrect(true)
    }
  },[jsonPartner])

  const handleClose = () => {
    setJsonPartner({});
    setLoading(false)
    close();
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  }

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      setJsonPartner({
        ...jsonPartner,
        [event.target.name]: event.target.checked,
      });
    } else {
      setJsonPartner({
        ...jsonPartner,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await postPartner(jsonPartner);
      if(res === ""){
        handleClose();
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deletePartner(partner.id);
      if(res === ""){
        handleClose();
      }
    } catch (error) {
      setOpenAlert(true)
      console.log(error);
    }
  }

  return(
    <Dialog
      fullScreen={fullScreen}
      maxWidth="xl"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle className="flex justify-between items-center">
        {editMode && !readOnly && "Edit Partner"}
        {editMode && readOnly && "View Partner"}
        {!editMode && !readOnly && "Create Partner"}
        <button 
          onClick={handleClose} 
          type="button"
        >
          <img 
            style={
              {
                filter: "brightness(0) saturate(100%) invert(0%) sepia(6%) saturate(7475%) hue-rotate(285deg) brightness(103%) contrast(106%)"
              }
            } 
            src={cancelIcon} 
          />
        </button>
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 w-full min-[600px]:w-[512px]">
        <form className="flex flex-col">
          <label>Name *</label>
          <input
            className="w-full border border-gray-300 rounded-[4px] p-2"
            disabled={readOnly}
            name={"name"}
            onChange={handleChange}
            type="text"
            value={jsonPartner?.name}
          />
        </form>
        <form className="flex flex-col">
          <label>Phone number *</label>
          <input
            className="w-full border border-gray-300 rounded-[4px] p-2"
            disabled={readOnly}
            name={"phone"}
            onChange={handleChange}
            onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
            type="number"
            value={jsonPartner?.phone}
          />
        </form>
        <form className="flex flex-col">
          <label>Type *</label>
          <select
            className="border border-gray-300 rounded-[4px] p-2"
            value={jsonPartner?.type}
            name="type"
            defaultValue={''}
            onChange={handleChange}
            size="small"
            disabled={readOnly}
          >
            <option value={''}></option>
            <option value={'person'}>Person</option>
            <option value={'company'}>Company</option>
          </select>
        </form>
        <form className="flex flex-col">
          <label>Description *</label>
          <textarea
            value={jsonPartner?.description}
            rows={5} 
            name="description" 
            onChange={handleChange} 
            className="border border-gray-300 rounded-[4px] p-2"
            disabled={readOnly}
          />
        </form>
      </DialogContent>
      <DialogActions className="p-6">
        {!editMode && !readOnly && 
          <LoadingButton
            className="bg-green-300 text-green-700 font-bold hover:bg-green-400" 
            loading={loading} 
            onClick={handleSubmit}
            variant="contained" 
            disabled={!isAllDataCorrect}
          >
            Submit
          </LoadingButton>
        }
        {editMode && readOnly &&
          <Button
            className="bg-green-300 text-green-700 font-bold hover:bg-green-400"  
            onClick={() => setReadOnly(false)} 
            type="button" 
            variant="contained" 
          >
            Edit
          </Button>
        }
        {editMode && !readOnly &&
          <div className="flex justify-between w-full">
            <Button 
              className="bg-red-300 text-red-700 font-bold hover:bg-red-400" 
              onClick={handleDelete} 
              type="button" 
              variant="contained" 
            >
              Delete
            </Button>
            <div className="flex gap-2">
              <Button 
                className="bg-orange-300 text-orange-700 font-bold hover:bg-orange-400" 
                onClick={() => setReadOnly(true)} 
                type="button" 
                variant="contained" 
              >
                Discard
              </Button>
              <LoadingButton 
                className="bg-green-300 text-green-700 font-bold hover:bg-green-400" 
                loading={loading} 
                onClick={handleSubmit}
                variant="contained" 
                disabled={!isAllDataCorrect}
              >
                Save
              </LoadingButton>
            </div>
          </div>
        }
      </DialogActions>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Can't be deleted, the partner is currently associated to a project.
        </Alert>
      </Snackbar>
    </Dialog>
  )
}

export default PartnerForm;