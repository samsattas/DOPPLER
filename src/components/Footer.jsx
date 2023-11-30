import logoCIAT from "../assets/logoCIAT.svg";
import iconGitHub from '../assets/icons/iconGitHub.svg';
import iconFacebook from '../assets/icons/iconFacebook.svg';
import iconLinkedIn from '../assets/icons/iconLinkedIn.svg';
import iconX from '../assets/icons/iconX.svg';
import iconInstagram from '../assets/icons/iconIntagram.svg';
import LogoButton from "./LogoButton";

const Footer = () => {
  return(
    <footer className="w-full h-72 bg-orange-700 opacity-90 flex flex-col justify-evenly items-center rounded-t-xl">
      <div className="w-full flex flex-col md:flex-row justify-evenly items-center">
        <img src={logoCIAT} alt="logo CIAT" className="md:w-1/4 w-1/2" />
        <section className="text-white flex flex-col gap-2 text-lg">
          <p>Colombia</p>
          <p>Valle del Cauca</p>
          <p>Palmira</p>
          <p>Km 17 Recta Cali-Palmira</p>
        </section>
      </div>
      <section className="text-white flex  gap-2 text-lg">
        <LogoButton
          alt={"github"}
          image={iconGitHub}
          link={"https://github.com/samsattas"}
        />
        <LogoButton
          alt={"facebook"}
          image={iconFacebook}
          link={"https://www.facebook.com/BiovIntCIAT.eng/"}
        />
        <LogoButton
          alt={"linkedin"}
          image={iconLinkedIn}
          link={"https://www.linkedin.com/company/ciat"}
        />
        <LogoButton
          alt={"x"}
          image={iconX}
          link={"https://twitter.com/BiovIntCIAT_eng"}
        />
        <LogoButton
          alt={"instagram"}
          image={iconInstagram}
          link={"https://www.instagram.com/bioversityciat/"}
        />
      </section>
    </footer>
  )
}

export default Footer;