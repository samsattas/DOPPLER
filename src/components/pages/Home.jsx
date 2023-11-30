import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import Card from "../Card";
import { useContext, useEffect, useState } from "react";
import { getAllPartners } from "../../utils/PartnerStore";
import { getAllProjects } from "../../utils/ProjectStore";
import { MyContext } from "../../utils/MyContext";

const Home = () => {
  const navigate = useNavigate()
  const {page, setPage} = useContext(MyContext);
  const [listPartners, setListPartners] = useState([]);
  const [listProjects, setListProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let projects = await getAllProjects();
        if (projects) {
          setListProjects(projects);
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchData();
  },[])

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
  },[])

  return(
    <article className="px-4 w-full">
      <h1 className="flex flex-col text-center items-center text-4xl font-bold text-green-700">
        Welcome to
        <img src={logo} alt="DOPPLER" className="md:w-1/3 w-full" />
        <section className="w-full flex flex-col items-center md:flex-row md:justify-evenly gap-10 pt-10">
          <Card
            title={listProjects.length}
            content={"Go to Projects"}
            subtitle={"Projects"}
            handleClick={() => {
              navigate('projects');
              setPage("Projects")
            }}
          />
          <Card
            title={listPartners.length}
            content={"Go to Partners"}
            subtitle={"Partners"}
            handleClick={() => {
              navigate('partners');
              setPage("Partners");
            }}
            variant={1}
          />
        </section>
      </h1>

    </article>
  )
}

export default Home;