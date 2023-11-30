import { Pagination, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PartnerForm from "../forms/PartnerForm";
import { getAllPartners } from "../../utils/PartnerStore";

const Partners = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listPartners, setListPartners] = useState([]);
  const [partnersBase, setPartnersBase] = useState([]);

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
  },[openForm])

  useEffect(() => {
    if(listPartners){
      setPartnersBase(listPartners);
    }
  },[listPartners,openForm])

  const handleSearch = (event) => {
    let auxArr = [];
    listPartners.forEach((item)=>{
      if(item.name.toLowerCase().includes(event.target.value.toLowerCase())){
        auxArr.push(item)
      }
    })
    setPartnersBase(auxArr);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  };

  return(
    <article className="px-4 w-full h-full flex flex-col gap-4 rounded-2xl bg-white bg-opacity-90">
      <section className="flex flex-col-reverse gap-2 sm:flex-row justify-between">
        <TextField
          size="small"
          placeholder="Search..."
          onChange={handleSearch}
          className="w-full sm:w-72"
        />
        <button 
          className="bg-orange-300 text-orange-700 font-bold hover:bg-orange-400 transition-all duration-300 px-8 py-2 rounded-md"
          onClick={() => setOpenForm(true)}
        >
          Add Partner
        </button>
      </section>
      <section className="w-full max-h-[67vh] overflow-scroll md:overflow-auto">
        <Table className="w-full" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-xl w-12">Name</TableCell>
              <TableCell className="font-bold text-xl w-12">Phone</TableCell>
              <TableCell className="font-bold text-xl w-12">Type</TableCell>
              <TableCell className="font-bold text-xl w-12">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 
            ? partnersBase.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : partnersBase).map((partner) => (
              <TableRow 
                key={partner.id}
                className="hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedPartner(partner);
                  setOpenForm(true);
                }} 
              >
                <TableCell>{partner.name}</TableCell>
                <TableCell>{partner.phone}</TableCell>
                <TableCell>{partner.type}</TableCell>
                <TableCell>{partner.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PartnerForm 
          open={openForm} 
          close={() => {
            setOpenForm(false);
            setSelectedPartner();
          }} 
          partner={selectedPartner} 
        />
      </section>
      <Pagination
        className={partnersBase.length > rowsPerPage ? "w-full flex justify-center pb-2" : "hidden"}
        count={Math.ceil(partnersBase.length/10)} 
        page={page+1} 
        onChange={handleChangePage} 
        showFirstButton 
        showLastButton
      />
    </article>
  )
}

export default Partners;