import React from 'react'
import { useState } from 'react'
import {TbEdit} from 'react-icons/tb'
import {RiDeleteBin6Line} from 'react-icons/ri'
import axios from 'axios'
import { useEffect } from 'react'
import { useContext } from 'react'
import { loginContext } from '../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {ListGroup, Modal} from 'react-bootstrap'

function Events() {

  let navigate=useNavigate()

  let [events,setEvents]=useState([])
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser,adminStatus]=useContext(loginContext)

  

  let [error,setError]=useState("")

  let [show,setShow]=useState(false)

  let [eventToEdit,setEventToEdit]=useState({})

  let {
    register,
    setValue,
    getValues
  }=useForm()

  let showModal=()=>setShow(true)
  let closeModal=()=>setShow(false)

  let editEvent=(eventObjToBeEdited)=>{
    showModal()
    setEventToEdit(eventObjToBeEdited)
    console.log(eventObjToBeEdited)
    //filling input fields
    setValue("eventname",eventObjToBeEdited.eventname)
    setValue("date",eventObjToBeEdited.date)
    setValue("StartTime",eventObjToBeEdited.StartTime)
    setValue("EndTime",eventObjToBeEdited.EndTime)
    setValue("Status",eventObjToBeEdited.Status)
  }

  let saveEvent=()=>{
    closeModal()
    //get modified Task data
    let modifiedEvent=getValues()
    console.log(modifiedEvent,"bef")
    //setting modified taskid
    modifiedEvent._id=eventToEdit._id
    console.log(modifiedEvent,"aft")
    //http put request
    axios.put("http://localhost:3500/event-api/update-event",modifiedEvent)
    .then(response=>{
      console.log(response)
      if(response.status===200){
        getEvents()
      }
    })
    .catch((err)=>{
      setError(err.message)

    })
  }

  let getEvents=()=>
  //http get request
  axios.get(" http://localhost:3500/event-api/get-events")
  .then(response=>{
    if(response.status===200){
    setEvents(response.data.payload)
    }
  })
  .catch((err)=>{
    setError(err.message)
  })

  useEffect(()=>{
    getEvents()
  },[])

  let deleteEvent=(eventToBeDeleted)=>{
    //console.log(eventToBeDeleted)
    axios.delete(" http://localhost:3500/event-api/delete-event",eventToBeDeleted)
  .then(response=>{
    if(response.status===200){
      getEvents()
    }
  })
  .catch((err)=>{
    setError(err.message)
  })
  }

  let registerEvent=(regEventData)=>{
    
    //console.log(regEventData)

    axios
        .post(`http://localhost:3500/user-api/user-eventregister/${currentUser.username}`,regEventData)
        .then((response)=>{
            //console.log(response)
            if(response.status===201){
                
                //navigate('/user-profile')
                //console.log(response)
            }else{
                setError(response.data.message)
            }
        })
        .catch((err)=>{
            setError(err.message)
        })


    

  }


  return (
    <div className="container">

      <div className="header display-3">
      <p className="lead display-3 text-center text-white">Current Events</p>
      {error.length!==0 && 
            <p className='lead display-5 text-danger'>{error}</p>}
      </div>
      <hr className='text-white fw-bold' />



      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-2 justify-content-start">

        {
          events?.map((eventObj)=>
            <div className="col text-center mx-auto" key={eventObj.id}>
              <div className="card text-center mt-2 mb-2 bg-black bg-opacity-75 text-white shadow rounded ">
              <img src={eventObj.image} height="200px" max-width="300px"  alt="" className='w-100' />
                <div className="card-body " >
                <p className=" fs-4  fw-semibold ">{eventObj.eventname}</p>
                  <hr />
                  <p className="">Date: {eventObj.date}</p>
                  <p className="fw-semibold ">Time: {eventObj.StartTime}-{eventObj.EndTime}</p>
                  
                  <p className="fst-italic text-decoration-underline">{eventObj.Status}</p>
                  
                  
                  {
                    adminStatus===true && <button className="btn text-center text-white fw-light" onClick={()=>editEvent(eventObj)}  >
                    Edit<span className='fs-4 text-warning'><TbEdit /></span>
                  </button>
                  }

                  {
                    adminStatus===true ? (
                      <button className="btn text-center text-white fw-light" onClick={()=>deleteEvent(eventObj)}  >
                    delete<span className='fs-4 text-danger'><RiDeleteBin6Line /></span>
                  </button>

                    ) :(
                      
                      <button className="btn btn-success text-center text-white fw-light" onClick={()=>registerEvent(eventObj)}  >
                        
                    Register
                  </button>

                    )
                  }

                  
                  
                  
                  
                </div>
            
              </div>
              
            </div>
          )
        }
      </div>

      {/*modal for editing*/}
      <Modal 
      show={show}
      onHide={closeModal}
      backdrop="static"
      centered
      className="modal" >
        
        {/*modal header*/}
        <Modal.Header>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        {/*modal body*/}
        <Modal.Body>
        <form  className="bg-white rounded p-3 modalForm" >
        
        <div className="row">
          <div className="mb-3">

                        <label htmlFor="Task" className='mb-2 fw-bold'>Eventname</label>
                        <input type="text" id="Task" className="form-control" 
                        {...register("eventname")} />
                        
          </div>

          <div className=" mb-3">
                            <label htmlFor="date" className='mb-2 fw-bold labels'>Date</label>
                            <input type="date" className='form-control' required 
                            {...register("date")} />              
              </div>

          <div className="mb-3">
                        <label htmlFor="StartTime" className='mb-2 fw-bold'>StartTime</label>
                        <input type="time" className='form-control' required 
                        {...register("StartTime")} />
                        
          </div>

          <div className=" mb-3">
                        <label htmlFor="EndTime" className='mb-2 fw-bold'>EndTime</label>
                        <input type="time" className='form-control' required 
                        {...register("EndTime")} />              
          </div>

          

          <div className=" ">
                        <label htmlFor="Status" className='fw-bold mb-2'>Registrations</label>
                        <select {...register("Status")} name="Status" id="Status" className="form-select mb-3" defaultValue={""}>

                        <option value=""></option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Cancelled">Cancelled</option>
                        </select>
                        
          </div>
        </div>   
      </form>

        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success"onClick={saveEvent} >save</button>
          <button className="btn btn-light"onClick={closeModal} >close</button>
        </Modal.Footer>
      </Modal>

      



    </div>
  )
}

export default Events