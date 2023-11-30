import logoCIAT from "../assets/logoCIAT.svg";
import iconGitHub from '../assets/icons/iconGitHub.svg';
import iconFacebook from '../assets/icons/iconFacebook.svg';
import iconLinkedIn from '../assets/icons/iconLinkedIn.svg';
import iconX from '../assets/icons/iconX.svg';
import iconInstagram from '../assets/icons/iconIntagram.svg';

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
        <a href="https://github.com/samsattas" className="rounded-md hover:bg-orange-600 transition-all duration-300">
          <img
          src={iconGitHub}
          alt="github"
          className="h-10 p-1 " />
        </a>
        <a href="https://www.facebook.com/BiovIntCIAT.eng/" className="rounded-md hover:bg-orange-600 transition-all duration-300">
          <img
          src={iconFacebook}
          alt="facebook"
          className="h-10 p-1 " />
        </a>
        <a href="https://www.linkedin.com/company/ciat" className="rounded-md hover:bg-orange-600 transition-all duration-300">
          <img
          src={iconLinkedIn}
          alt="linkedin"
          className="h-10 p-1 " />
        </a>
        <a href="https://twitter.com/BiovIntCIAT_eng" className="rounded-md hover:bg-orange-600 transition-all duration-300">
          <img
          src={iconX}
          alt="x"
          className="h-10 p-1 " />
        </a>
        <a href="https://www.instagram.com/bioversityciat/" className="rounded-md hover:bg-orange-600 transition-all duration-300">
          <img
          src={iconInstagram}
          alt="instagram"
          className="h-10 p-1 " />
        </a>
      </section>
    </footer>
  )
}

export default Footer;