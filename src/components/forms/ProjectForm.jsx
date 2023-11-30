import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Switch, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import cancelIcon from "../../assets/icons/iconCancel.svg"
import { LoadingButton } from "@mui/lab";
import { deleteProject, postProject } from "../../utils/ProjectStore";
import { getAllPartners } from "../../utils/PartnerStore";

const ProjectForm = ({project, open, close}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [readOnly, setReadOnly] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jsonProject, setJsonProject] = useState({status: true, partners: []});
  const [isAllDataCorrect, setIsAllDataCorrect] = useState(false);
  const [listPartners, setListPartners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let partners = await getAllPartners();
        if (partners) {
          setListPartners(partners);
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchData();
  },[])

  useEffect(() => {
    if(project){
      setJsonProject(project);
      setEditMode(true);
      setReadOnly(true)
    }else{
      setJsonProject({status: true, partners: []});
      setEditMode(false);
      setReadOnly(false)
    }
  },[project, open])

  useEffect(() => {
    if(
      !jsonProject?.title
      // || !jsonProject?.partners
      || !jsonProject?.environment
      || !jsonProject?.details
    ){
      setIsAllDataCorrect(false)
    }else{
      setIsAllDataCorrect(true)
    }
  },[jsonProject])

  const handleClose = () => {
    setJsonProject({status: true, partners: []});
    setLoading(false)
    close();
  }

  const handleChange = (event, newValue) => {
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await postProject(jsonProject);
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
      const res = await deleteProject(project.id);
      if(res === ""){
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
      },
    },
  };

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
      <DialogContent className="flex flex-col gap-4 w-full min-[600px]:w-[512px]">
        <form className="flex flex-col">
          <label>Title *</label>
          <input
            className="w-full border border-gray-300 rounded-[4px] p-2"
            disabled={readOnly}
            name={"title"}
            placeholder="Project M"
            onChange={handleChange}
            type="text"
            value={jsonProject?.title}
          />
        </form>
        <FormControlLabel 
          disabled={readOnly}
          checked={jsonProject?.status} 
          control={<Switch color="success"  />} 
          label="Status"  
          name="status" 
          onChange={handleChange} 
          required 
        />
        <form className="flex flex-col">
          <label>Environment *</label>
          <select
            className="border border-gray-300 rounded-[4px] py-2"
            value={jsonProject?.environment}
            name="environment"
            defaultValue={''}
            onChange={handleChange}
            size="small"
            disabled={readOnly}
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
          <textarea 
            placeholder="Some details . . ."
            rows={5} 
            name="details" 
            onChange={handleChange} 
            className="border border-gray-300 rounded-[4px]  p-2" 
            value={jsonProject?.details}
            disabled={readOnly}
          />
        </form>
        <Autocomplete
          className={project && "hidden"}
          multiple
          limitTags={2}
          options={listPartners}
          getOptionLabel={(partner) => partner.name}
          defaultValue={jsonProject?.partners}
          value={jsonProject?.partners}
          onChange={(e, value) => {
            setJsonProject({ ...jsonProject, partners: value })
          }}
          name="partners"
          renderInput={(params) => (
            <TextField {...params} label="Partners" placeholder="Search" />
          )}
        />
        <ul className={!project && "hidden"}>
          <h2 className="border-b py-1 text-xl">Partners:</h2>
          {jsonProject?.partners?.map((partner) => (
            <li>• {partner.name}</li>
          ))}
        </ul>
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
    </Dialog>
  );
}

export default ProjectForm;