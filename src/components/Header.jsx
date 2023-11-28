const Header = ({title, handleOpenMenu}) => {
  return(
    <header className="w-full flex bg-slate-800 h-16">
      <button onClick={handleOpenMenu}>Menu</button>
      <img />
      {title}
    </header>
  )
}

export default Header;