import logo from '../assets/logo.png'
import iconMenu from '../assets/iconMenu.svg'

const Header = ({title, handleOpenMenu}) => {
  return(
    <header className="w-full flex justify-between bg-green-100 h-16 items-center px-4">
      <button onClick={handleOpenMenu} className='h-full'>
        <img src={iconMenu} className='h-1/2'/>
      </button>
      <img src={logo} className='w-[150px] h-[40px]' />
    </header>
  )
}

export default Header;