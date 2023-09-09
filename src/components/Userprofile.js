import React from 'react'
import { useContext } from 'react'
import { loginContext } from '../contexts/loginContext'
import { useState,useEffect } from 'react'
import axios from 'axios'

function Userprofile() {

    let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser,adminStatus]=useContext(loginContext)
    let [regEvents,setRegEvents]=useState([])
    let [error,setError]=useState("")
    let [newarr,setNewArr]=useState([])

    

    let addtoans=((newregobj)=>{
      console.log(newregobj)
      newarr.push(newregobj)
      console.log(newarr)
      setRegEvents([...regEvents,...newarr])
        console.log(regEvents)
    })

    
     let getRegisteredEvents=()=>{

      

        currentUser?.registeredEvents?.map((eid)=>{
          console.log(eid)
          axios
            .get(`http://localhost:3500/event-api/get-userevents/${eid}`)
            .then((response)=>{
              if(response.status===200){
                console.log(response.data.payload)
                setNewArr([regEvents.push(response.data.payload)])
                console.log(newarr)
                setRegEvents([...regEvents,...newarr])
                console.log(regEvents)
              }
            })
            .catch((err)=>{
              setError(err.message)
            })
  
        })
        setRegEvents([...regEvents,...newarr])
        


      
        
      

    }

    
      useEffect(()=>{
        getRegisteredEvents()
      },[]) 

    

      
  



  return (
    <div className="container">
     
        <p className="lead display-2 text-white text-center fs-bold"> 
        Welcome {currentUser.username}
        
        </p>
        <hr/>
        <p className="lead display-5  text-white mt-2">Registered Events</p>
        <div className="container">

        

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-2 justify-content-start">

        {
          userLoginStatus===true && regEvents?.map((eventObj)=>
            <div className="col text-center mx-auto" key={eventObj.id}>
              <div className="card text-center mt-2 mb-2  text-white bg-black bg-opacity-75 rounded ">
                
              <img src={eventObj?.image} height="200px" max-width="300px"  alt="" className='w-100' />
                <div className="card-body " >
                
                  <p className="fs-4  fw-semibold ">{eventObj.eventname}</p>
                  <hr />
                  <p className="">Date: {eventObj.date}</p>
                  <p className="fw-semibold ">Time: {eventObj.StartTime}-{eventObj.EndTime}</p>
                  
                  <p className="fst-italic text-decoration-underline">{eventObj.Status}</p>
                  
                  
                </div>
            
              </div>
              
            </div>
          )
        }
      </div>
      </div>
        

        

      

    </div>
  )
}

export default Userprofile