import { Pagination, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectForm from "../forms/ProjectForm";
import { getAllProjects } from "../../utils/ProjectStore";

const Projects = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listProjects, setListProjects] = useState([]);
  const [projectsBase, setProjectsBase] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let projects = await getAllProjects();
        if (projects) {
          setListProjects(projects);
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchData();
  },[openForm])

  useEffect(() => {
    if(listProjects){
      setProjectsBase(listProjects);
    }
  },[listProjects, openForm])

  const handleSearch = (event) => {
    let auxArr = [];
    listProjects.forEach((item)=>{
      if(item.title.toLowerCase().includes(event.target.value.toLowerCase())){
        auxArr.push(item)
      }
    })
    setProjectsBase(auxArr);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  };

  return(
    <article className="px-4 w-full h-full flex flex-col gap-4 rounded-2xl bg-white bg-opacity-90">
      <section className="flex flex-col-reverse gap-2 sm:flex-row justify-between">
        <TextField
          size="small"
          placeholder="Search.."
          onChange={handleSearch}
          className="w-full sm:w-72"
        />
        <button 
          className="bg-orange-300 text-orange-700 font-bold hover:bg-orange-400 transition-all duration-300 px-8 py-2 rounded-md"
          onClick={() => setOpenForm(true)}
        >
          Create Project
        </button>
      </section>
      <section className="w-full max-h-[67vh] overflow-scroll md:overflow-auto">
        <Table className="w-full h-fit" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-xl w-12">ID</TableCell>
              <TableCell className="font-bold text-xl min-w-[250px]">Title</TableCell>
              <TableCell className="font-bold text-xl">Status</TableCell>
              <TableCell className="font-bold text-xl">Environment</TableCell>
              <TableCell className="font-bold text-xl">Partners</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
            ? projectsBase.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : projectsBase).map((project) => (
              <TableRow 
                key={project.id}
                className="hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setOpenForm(true);
                }} 
              >
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>{project.environment}</TableCell>
                <TableCell>{project.partners}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ProjectForm 
          open={openForm} 
          close={() => {
            setOpenForm(false);
            setSelectedProject();
          }} 
          project={selectedProject} 
        />
      </section>
      <Pagination 
        className="w-full flex justify-center pb-2"
        count={Math.ceil(projectsBase.length/10)} 
        page={page+1} 
        onChange={handleChangePage} 
        showFirstButton 
        showLastButton
      />
    </article>
  )
}

export default Projects;