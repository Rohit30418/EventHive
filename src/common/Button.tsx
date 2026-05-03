import { motion } from "motion/react"

interface ButtoninterfaceProps{
 text:string,
 padding?:string,
}
const Button:React.FC<ButtoninterfaceProps> = ({text,padding}) => {
  return (
    <motion.button whileHover={{scale:1.02}} className={`bg-gradient-to-r from-[#FA831E] from-[10%] to-[#F4B930] to-[100%]" hover:bg-white  text-white cursor-pointer transition-all duration-200 ${padding?padding:"px-6 py-3"}  rounded-full font-semibold shadow`}>{text}</motion.button>
  )
}

export default Button