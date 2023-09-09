import Footer from "./Footer"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

function RootLayot() {
  return (
    <div>
        <Navbar />
        {/*dynamic content*/}
        
        

        
        
        <div className="container">
        
        
        <Outlet />
        
        </div>
        
        
    </div>
  )
}

export default RootLayot