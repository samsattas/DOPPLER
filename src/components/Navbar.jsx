import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({open, handleClose}) => {
  return(
    <aside className="flex bg-slate-600 h-full items-center">
      {/* <nav className="flex flex-col justify-between h-full max-h-[30%]">
        <NavLink to={""}>Home</NavLink>
        <NavLink to={"projects"}>Projects</NavLink>
        <NavLink to={"partners"}>Partners</NavLink>
      </nav> */}
      <Drawer
        open={open}
        onClose={handleClose}
      >
        <NavLink onClick={handleClose} to={""}>Home</NavLink>
        <NavLink onClick={handleClose} to={"projects"}>Projects</NavLink>
        <NavLink onClick={handleClose} to={"partners"}>Partners</NavLink>
      </Drawer>
    </aside>
  )
}

export default Navbar;