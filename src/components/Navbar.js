import { Link } from "react-router-dom"
import { loginContext } from "../contexts/loginContext"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
function Navbar() {

  const activeLink={
    color:"#FDFEFE",
    background:"#2C3E50",
  }
  const inactiveLink={
    color:"#E5E7E9",
    
  }

  const activeLink2={
    color:"#66FF00",
    background:"#2C3E50",
  }

  const inactiveLink2={
    color:"#2ECC71",
  }

  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser,adminStatus]=useContext(loginContext)
  return (
    <div className="">
      
      <ul className="nav justify-content-end p-1 mt-1 nav-pills rounded ">

        
        
      <li className="nav-item">
        <NavLink className="nav-link " to="/" style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }}>
          Home
        </NavLink>
      </li>


      {adminStatus===true && <li className="nav-item">
          <NavLink  className="nav-link" to="/create-event" style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }} >
            CreateEvent
          </NavLink>
        </li>
        }

      {(adminStatus==true || userLoginStatus==true) &&

      <li className="nav-item">
        <NavLink className="nav-link " to="/events" style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }} >
          Events
        </NavLink>
      </li>
      }

      {userLoginStatus===true && <li className="nav-item">
                <NavLink  className="nav-link" to="/user-profile" style={({isActive})=>{
                return isActive?activeLink:inactiveLink;
              }} >
                  Userprofile
                </NavLink>
              </li>
            }

      {userLoginStatus?(
        <li className="nav-item ">
          <NavLink onClick={logoutUser} className="nav-link text-danger" to="/Signin" style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }} >
            Signout
          </NavLink>
        </li>
      ):(
        <li className="nav-item   ">
          <NavLink className="nav-link" to="/Signin" style={({isActive})=>{
          return isActive?activeLink2:inactiveLink2;
        }}  >
              Signin
          </NavLink>
        </li>
            
      )}

      {userLoginStatus===false && <li className="nav-item">
        <NavLink className="nav-link" to="/Signup" style={({isActive})=>{
          return isActive?activeLink:inactiveLink;
        }} >
          Signup
        </NavLink>
      </li>
            
      }

      

      

     
   
    </ul>

    </div>
    
  )
}

export default Navbar