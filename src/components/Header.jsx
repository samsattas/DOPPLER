import logo from '../assets/logo.png'
import favicon from '../assets/favicon.png'
import iconMenu from '../assets/icons/iconMenu.svg'

const Header = ({title, handleOpenMenu}) => {
  return(
    <header className="w-full flex justify-between bg-green-100 h-16 items-center px-4">
      <button onClick={handleOpenMenu} className='h-full'>
        <img src={iconMenu} className='h-1/2'/>
      </button>
      <img src={logo} className='w-[150px] h-[40px] hidden md:block' />
      <img src={favicon} className='w-[40px] h-[40px] md:hidden' />
    </header>
  )
}

export default Header;