import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import cancelIcon from "../../assets/icons/iconCancel.svg"
import { LoadingButton } from "@mui/lab";

const ProjectForm = ({project, open, close}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [readOnly, setReadOnly] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jsonProject, setJsonProject] = useState({status: true});
  const [isAllDataCorrect, setIsAllDataCorrect] = useState(false);

  useEffect(() => {
    if(project){
      setJsonProject(project);
      setEditMode(true);
      setReadOnly(true)
    }else{
      setJsonProject({status: true});
      setEditMode(false);
      setReadOnly(false)
    }
  },[project, open])

  useEffect(() => {
    if(
      !jsonProject?.title
      // || !jsonProject?.partners
      || !jsonProject?.environment
      // || !jsonProject?.details
    ){
      setIsAllDataCorrect(false)
    }else{
      setIsAllDataCorrect(true)
    }
  },[jsonProject])

  const handleClose = () => {
    setJsonProject({status: true});
    setLoading(false)
    close();
  }

  const handleChange = (event) => {
    if (event.target.type === "checkbox") {
      setJsonProject({
        ...jsonProject,
        [event.target.name]: event.target.checked,
      });
    } else {
      setJsonProject({
        ...jsonProject,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleSubmit = () => {
    // setLoading(true);
    console.log(jsonProject);

  }

  return(
    <Dialog
      fullScreen={fullScreen}
      maxWidth="xl"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle className="flex justify-between items-center">
        {editMode && !readOnly && "Edit Project"}
        {editMode && readOnly && "View Project"}
        {!editMode && !readOnly && "Create Project"}
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
      <DialogContent className="flex flex-col gap-4 w-full md:w-[512px]">
        <TextField
          className="w-full mt-2"
          disabled={readOnly}
          label={"Title"}
          name={"title"}
          onChange={handleChange}
          required
          size="small"
          value={jsonProject?.title}
        />
        <FormControlLabel 
          checked={jsonProject?.status} 
          control={<Switch color="success"  />} 
          label="Status"  
          name="status" 
          onChange={handleChange} 
          required 
        />
        <form className="flex flex-col">
          <label>Environment</label>
          <select
            className="border border-gray-300 rounded-[4px] py-2"
            value={jsonProject?.environment}
            name="environment"
            defaultValue={''}
            onChange={handleChange}
            size="small"
          >
            <option value={''}></option>
            <option value={'High humidity'}>High humidity</option>
            <option value={'Desert'}>Desert</option>
            <option value={'Flooded'}>Flooded</option>
            <option value={'Hilly'}>Hilly</option>
            <option value={'Highland'}>Highland</option>
            <option value={'Lowland'}>Lowland</option>
          </select>
        </form>
        <form className="flex flex-col">
          <label>Additional details</label>
          <textarea rows={5} name="details" onChange={handleChange} className="border border-gray-300 rounded-[4px]" />
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
          <>
            <Button 
              className="bg-orange-300 text-orange-700 font-bold hover:bg-orange-400" 
              onClick={() => setReadOnly(true)} 
              type="button" 
              variant="contained" 
            >
              Discard changes
            </Button>
            <LoadingButton 
              className="bg-green-300 text-green-700 font-bold hover:bg-green-400" 
              loading={loading} 
              onClick={() => setLoading(true)}
              variant="contained" 
              disabled={!isAllDataCorrect}
            >
              Save changes
            </LoadingButton>
          </>
        }
        
      </DialogActions>
    </Dialog>
  );
}

export default ProjectForm;