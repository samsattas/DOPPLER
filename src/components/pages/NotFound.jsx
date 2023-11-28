import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <article className="px-4 w-full h-full flex flex-col justify-center text-center gap-10 text-green-700">
      <h1 className="font-bold sm:text-8xl text-6xl">Are you lost?</h1>
      <p className="text-xl">Don't worry, just click <NavLink className={"text-orange-700 font-bold"} to={'/'}>here</NavLink> to go back to the main page.</p>
    </article>
  )
}

export default NotFound;