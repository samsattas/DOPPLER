const Card = ({title, subtitle, content, handleClick, variant = 0}) => {
  return (
    <div
      className={`w-full ${variant === 0 ? 'bg-green-300' : 'bg-orange-300 text-orange-700'} rounded-xl hover:bg-opacity-90 cursor-pointer flex flex-col items-start max-w-sm group overflow-hidden`}
      onClick={handleClick}
    >
      <p className="px-8 text-7xl pt-4 font-extrabold">
        {title}
      </p>
      <p className="px-8 pb-4 text-lg">
        {subtitle}
      </p>
      <p className={`w-full ${variant === 0 ? 'bg-green-400' : 'bg-orange-400'} group-hover:scale-y-100 transition-all origin-bottom duration-300 scale-y-0 text-base py-2 px-4 text-center hover:bg-opacity-90`}>
        {`${content} ❯`}
      </p>
    </div>
  )
}

export default Card;