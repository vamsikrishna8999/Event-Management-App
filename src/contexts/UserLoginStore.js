import React from 'react'
import { useState } from 'react'
import { loginContext } from './loginContext'
import axios from 'axios'



function UserLoginStore({children}) {
    let [currentUser,setCurrentUser]=useState({})
    let [loginErr,setLoginErr]=useState("")
    let [userLoginStatus,setUserLoginStatus]=useState(false)
    let [adminStatus,setAdminStatus]=useState(false)
    //type of user usestate usertype setusertype
    //admin status set adminstatus

    
    //function to make user login request
    const loginUser=(userCredentialsObj)=>{

        //console.log(userCredentialsObj)

        if(userCredentialsObj.usertype=="Admin"){
            axios
            .post("http://localhost:3500/admin-api/admin-login",userCredentialsObj)
            .then((response)=>{
                //console.log(response)
                if(response.data.message==="success"){
                    //navigate to user profile/dashboard
                    localStorage.setItem("token",response.data.token)
                    setCurrentUser({...response.data.user})
                    setLoginErr("")
                // console.log("navigated to user profile")
                    setAdminStatus(true)
                    setUserLoginStatus(true)
                    //setadminstatsu(true)

                }else{
                    
                    setLoginErr(response.data.message)
                }


            })
            .catch((err)=>{
                console.log("err in user login ",err)
                setLoginErr(err.message)
            })



        }else{

            axios
            .post("http://localhost:3500/user-api/user-login",userCredentialsObj)
            .then((response)=>{
                //console.log(response)
                if(response.data.message==="success"){
                    //navigate to user profile/dashboard
                    localStorage.setItem("token",response.data.token)
                    setCurrentUser({...response.data.user})
                    setLoginErr("")
                // console.log("navigated to user profile")
                    setUserLoginStatus(true)
                    //setadminstatsu(true)

                }else{
                    
                    setLoginErr(response.data.message)
                }


            })
            .catch((err)=>{
                console.log("err in user login ",err)
                setLoginErr(err.message)
            })
        }
    }
    const logoutUser=()=>{
        localStorage.clear()
        setUserLoginStatus(false)
        setAdminStatus(false)
    }
    return(
        <loginContext.Provider value={[currentUser,loginErr,userLoginStatus,loginUser,logoutUser,adminStatus]} > 
            {children}
        </loginContext.Provider>
        //context provider take value attribute but not store

    )


    
  
}

export default UserLoginStore