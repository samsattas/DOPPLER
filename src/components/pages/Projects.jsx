import { Pagination, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectForm from "../forms/ProjectForm";
import { exportCSVFile, getAllProjects } from "../../utils/ProjectStore";
import iconExport from '../../assets/icons/iconExport.svg'

const Projects = () => {
  const [listProjects, setListProjects] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [page, setPage] = useState(0);
  const [projectsBase, setProjectsBase] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProject, setSelectedProject] = useState();

  // Fetch: list of all projects
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

  // Setting a modifiable list of projects for searching
  useEffect(() => {
    if(listProjects){
      setProjectsBase(listProjects);
    }
  },[listProjects, openForm])

  // Search the items with the correct value
  const handleSearch = (event) => {
    let auxArr = [];
    listProjects.forEach((item)=>{
      if(item.title.toLowerCase().includes(event.target.value.toLowerCase())){
        auxArr.push(item)
      }
    })
    setProjectsBase(auxArr);
  }

  // Handles the change of the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  };

  return(
    <article className="px-4 w-full h-full flex flex-col gap-4 rounded-2xl bg-white bg-opacity-90">
      <section className="flex flex-col-reverse gap-2 sm:flex-row justify-between">
        <TextField
          size="small"
          placeholder="Search by title"
          onChange={handleSearch}
          className="w-full sm:w-72"
        />
        <div className="flex gap-2">
          <button
            onClick={
              () => exportCSVFile(
                {
                  id: "ID",
                  title: "Title",
                  status: "Status",
                  environment: "Environment",
                  details: "Details",
                  partners: "Partners"
                },
                projectsBase.slice(),
                'Projects'
              )
            }
            className="bg-green-300 hover:bg-green-400 transition-all duration-300 p-2 rounded-md"
          >
            <img src={iconExport} alt="export" />
          </button>
          <button 
            className="bg-orange-300 text-orange-700 font-bold hover:bg-orange-400 transition-all duration-300 px-8 py-2 rounded-md"
            onClick={() => setOpenForm(true)}
          >
            Create Project
          </button>
        </div>
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
                <TableCell>{project.partners?.map((partner) => (
                  <p key={partner.id}>{`• ${partner.name}`}</p>
                ))}</TableCell>
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
        className={projectsBase.length > rowsPerPage ? "w-full flex justify-center pb-2" : "hidden"}
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