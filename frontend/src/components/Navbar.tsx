import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks"
import { reset } from "@/store/auth"


const Navbar = () => {
const dispatch = useAppDispatch()
  const handleLogout  = ()=>{
      dispatch(reset())
  }

  return (
    <div className="flex items-center justify-end p-3 px-5"> 
        <LogOut 
          onClick={()=>handleLogout()}
        size={20} className="cursor-pointer"/>
    </div>
  )
}

export default Navbar