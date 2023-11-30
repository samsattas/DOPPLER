import logo from '../assets/logo.png'
import favicon from '../assets/favicon.png'
import iconMenu from '../assets/icons/iconMenu.svg'
import { useContext } from 'react';
import { MyContext } from '../utils/MyContext';

const Header = ({title, handleOpenMenu}) => {
  const {page, setPage} = useContext(MyContext);
  return(
    <header className="w-full flex justify-between bg-green-100 h-16 items-center px-4">
      <button onClick={handleOpenMenu} className='h-full'>
        <img src={iconMenu} className='h-1/2'/>
      </button>
      <div className='flex justify-between w-full px-4'>
        <h1 className='text-green-500 font-extrabold text-3xl'>{page}</h1>
        <img src={logo} className='w-[150px] h-[40px] hidden md:block' />
        <img src={favicon} className='w-[40px] h-[40px] md:hidden' />
      </div>
    </header>
  )
}

export default Header;