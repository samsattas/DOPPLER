import { Table, TableCell, TableHead, TableRow } from "@mui/material";

const Projects = () => {
  return(
    <div className="px-4 w-full rounded-2xl border border-zinc-700">
      <Table stickyHeader className="w-full">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Partners</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  )
}

export default Projects;