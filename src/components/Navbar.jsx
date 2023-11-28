import { Button, Drawer } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
        {routes.map((route) => (
          <NavLink 
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