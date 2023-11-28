import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar"

const PageContainer = ({children}) => {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="flex flex-col h-full w-full">
      <Header handleOpenMenu={() => setOpen(true)} title={"DOPPLER"} />
      <main className="flex flex-col-reverse md:flex-row">
        <Navbar handleClose={() => setOpen(false)} open={open} />
        {children}
      </main>
    </div>
  )
}

export default PageContainer;