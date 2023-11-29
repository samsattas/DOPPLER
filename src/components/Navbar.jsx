import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import iconCancel from "../assets/icons/iconCancel.svg"

const Navbar = ({open, handleClose}) => {
  const routes = [
    {
      path: "",
      title: "Home",
    },
    {
      path: "projects",
      title: "Projects",
    },
    {
      path: "partners",
      title: "Partners",
    }
  ]

  return(
    <aside className="flex h-full items-center">
      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "bg-green-100 sm:w-1/4 w-full"
        }}
      >
        <div className="w-full flex justify-end px-8 py-8">
          <button type="button" onClick={handleClose}><img src={iconCancel} alt="cancel" /></button>
        </div>
        {routes.map((route) => (
          <NavLink 
            key={route.path}
            onClick={handleClose} 
            to={route.path} 
            className={"w-full text-center sm:text-start sm:pl-10 hover:bg-green-500 font-bold text-2xl text-green-500 hover:text-white py-4 sm:hover:pl-16 transition-all duration-300"}
          >
            {route.title}
          </NavLink>
        ))}
      </Drawer>
    </aside>
  )
}

export default Navbar;