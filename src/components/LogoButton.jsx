const LogoButton = ({image, link, alt}) => {
  return(
    <a href={link} className="rounded-md hover:bg-orange-600 transition-all duration-300">
      <img
      src={image}
      alt={alt}
      className="h-10 p-1 " />
    </a>
  )
}

export default LogoButton;