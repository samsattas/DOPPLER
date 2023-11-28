import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar"
import beans from '../../assets/beans.svg'

const PageContainer = ({children}) => {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="flex flex-col h-full w-full">
      <Header handleOpenMenu={() => setOpen(true)} title={"DOPPLER"} />
      <main className="flex flex-col-reverse md:flex-row w-full h-full p-4 md:p-10">
        <Navbar handleClose={() => setOpen(false)} open={open} />
        {children}
        <img src={beans} className="block fixed bottom-0 left-0 -z-10 -mb-20 -ml-20 opacity-50 h-1/2" />
      </main>
    </div>
  )
}

export default PageContainer;