import { Pagination, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectForm from "../forms/ProjectForm";

const Projects = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [projectsBase, setProjectsBase] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const listProjects = [
    {
      "id": "1",
      "title": "Investigation Project A",
      "status": true,
      "partners": "Partner A",
      "environment": "Highland",
      "details": "Details about crops"
    },
    {
      "id": "2",
      "title": "Investigation Advance B",
      "status": false,
      "partners": "Partner B",
      "environment": "Highland",
      "details": "Details about crops"
    },
    {
      "id": "3",
      "title": "Investigation Advance C",
      "status": true,
      "partners": "Partner C",
      "environment": "Highland",
      "details": "Details about crops"
    },
    {
      "id": "4",
      "title": "Investigation Advance D",
      "status": true,
      "partners": "Partner D",
      "environment": "Highland",
      "details": "Details about crops"
    },
    {
      "id": "5",
      "title": "Investigation Advance E",
      "status": false,
      "partners": "Partner E",
      "environment": "Highland",
      "details": "Details about crops"
    },
    {
      "id": "6",
      "title": "Investigation Advance F",
      "status": true,
      "partners": "Partner F",
      "environment": "Desert",
      "details": "Details about crops"
    },
    {
      "id": "7",
      "title": "Investigation Advance G",
      "status": true,
      "partners": "Partner G",
      "environment": "Desert",
      "details": "Details about crops"
    },
    {
      "id": "8",
      "title": "Investigation Advance H",
      "status": false,
      "partners": "Partner H",
      "environment": "Desert",
      "details": "Details about crops"
    },
    {
      "id": "9",
      "title": "Investigation Advance I",
      "status": true,
      "partners": "Partner I",
      "environment": "Desert",
      "details": "Details about crops"
    },
    {
      "id": "10",
      "title": "Investigation Advance J",
      "status": true,
      "partners": "Partner J",
      "environment": "Desert",
      "details": "Details about crops"
    },
    {
      "id": "11",
      "title": "Investigation Project K",
      "status": false,
      "partners": "Partner K",
      "environment": "Desert",
      "details": "Details about crops"
    },
    {
      "id": "12",
      "title": "Investigation Project L",
      "status": true,
      "partners": "Partner L",
      "environment": "Desert",
      "details": "Details about crops"
    },
    {
      "id": "13",
      "title": "Investigation Project M",
      "status": true,
      "partners": "Partner M",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "14",
      "title": "Investigation Project N",
      "status": false,
      "partners": "Partner N",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "15",
      "title": "Investigation Project O",
      "status": true,
      "partners": "Partner O",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "16",
      "title": "Investigation Project P",
      "status": true,
      "partners": "Partner P",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "17",
      "title": "Investigation Project Q",
      "status": false,
      "partners": "Partner Q",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "18",
      "title": "Investigation Project R",
      "status": true,
      "partners": "Partner R",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "19",
      "title": "Investigation Project S",
      "status": true,
      "partners": "Partner S",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "20",
      "title": "Investigation Project T",
      "status": false,
      "partners": "Partner T",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "21",
      "title": "Investigation Project U",
      "status": true,
      "partners": "Partner U",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "22",
      "title": "Investigation Project V",
      "status": true,
      "partners": "Partner V",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "23",
      "title": "Investigation Project W",
      "status": false,
      "partners": "Partner W",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "24",
      "title": "Investigation Project X",
      "status": true,
      "partners": "Partner X",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "25",
      "title": "Investigation Project Y",
      "status": true,
      "partners": "Partner Y",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "26",
      "title": "Investigation Project Z",
      "status": false,
      "partners": "Partner Z",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "27",
      "title": "Investigation Project AA",
      "status": true,
      "partners": "Partner AA",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "28",
      "title": "Investigation Project BB",
      "status": true,
      "partners": "Partner BB",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "29",
      "title": "Investigation Project CC",
      "status": false,
      "partners": "Partner CC",
      "environment": "Hilly",
      "details": "Details about crops"
    },
    {
      "id": "30",
      "title": "Investigation Project DD",
      "status": true,
      "partners": "Partner DD",
      "environment": "Hilly",
      "details": "Details about crops"
    }
  ]

  useEffect(() => {
    setProjectsBase(listProjects);
  },[])

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