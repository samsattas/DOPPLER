import { Pagination, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PartnerForm from "../forms/PartnerForm";

const Partners = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState();
  const [partnersBase, setPartnersBase] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const listPartners = [
    {
      "name": "John Doe",
      "phone": 1234567890,
      "type": "person",
      "description": "A trusted partner for many years."
    },
    {
      "name": "ABC Company",
      "phone": 9876543210,
      "type": "company",
      "description": "Specializing in software development."
    },
    {
      "name": "Jane Smith",
      "phone": 5555555555,
      "type": "person",
      "description": "An experienced consultant."
    },
    {
      "name": "XYZ Corporation",
      "phone": 1112223333,
      "type": "company",
      "description": "Providing top-notch IT services."
    },
    {
      "name": "Samuel Johnson",
      "phone": 4444444444,
      "type": "person",
      "description": "A reliable supplier."
    },
    {
      "name": "DEF Enterprises",
      "phone": 9998887777,
      "type": "company",
      "description": "Offering comprehensive solutions."
    },
    {
      "name": "Sara Thompson",
      "phone": 7777777777,
      "type": "person",
      "description": "A skilled project manager."
    },
    {
      "name": "GHI Systems",
      "phone": 6666666666,
      "type": "company",
      "description": "Delivering cutting-edge technology."
    },
    {
      "name": "Michael Davis",
      "phone": 2223334444,
      "type": "person",
      "description": "An expert in financial services."
    },
    {
      "name": "JKL Solutions",
      "phone": 5554443333,
      "type": "company",
      "description": "Providing efficient business solutions."
    },
    {
      "name": "Emily Wilson",
      "phone": 1112223333,
      "type": "person",
      "description": "A talented graphic designer."
    },
    {
      "name": "MNO Enterprises",
      "phone": 8889990000,
      "type": "company",
      "description": "Offering innovative marketing strategies."
    },
    {
      "name": "Robert Taylor",
      "phone": 4445556666,
      "type": "person",
      "description": "A skilled software engineer."
    },
    {
      "name": "PQR Industries",
      "phone": 7778889999,
      "type": "company",
      "description": "Manufacturing high-quality products."
    }
  ];

  useEffect(() => {
    setPartnersBase(listPartners);
  },[])

  const handleSearch = (event) => {
    let auxArr = [];
    listPartners.forEach((item)=>{
      if(item.title.toLowerCase().includes(event.target.value.toLowerCase())){
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
          placeholder="Search.."
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
            : rows).map((partner) => (
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