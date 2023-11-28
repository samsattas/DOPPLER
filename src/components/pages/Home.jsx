import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import Card from "../Card";

const Home = () => {
  const navigate = useNavigate()

  return(
    <article className="px-4 w-full">
      <h1 className="flex flex-col text-center items-center text-4xl font-bold text-green-700">
        Welcome to
        <img src={logo} alt="DOPPLER" className="sm:w-1/3 w-full" />
        <section className="w-full flex flex-col sm:flex-row sm:justify-evenly gap-10 pt-10">
          <Card title={10} content={"Go to Projects"} subtitle={"Projects"} handleClick={() => navigate('projects')} />
          <Card title={6} content={"Go to Partners"} subtitle={"Partners"} handleClick={() => navigate('partners')} variant={1} />
        </section>
      </h1>

    </article>
  )
}

export default Home;