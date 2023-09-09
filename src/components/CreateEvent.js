import React from 'react'
import {useForm} from 'react-hook-form'
import {CgAdd} from 'react-icons/cg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function CreateEvent() {

  let navigate=useNavigate()

  let [error,setError]=useState("")
  let [selectedFile,setSelectedFile]=useState(null)

  let onFileSelect=(e)=>{
    setSelectedFile(e.target.files[0])
}



  let {
    register,
    handleSubmit,
    formState:{errors},
  }= useForm()

  let submitEvent=(newEventData)=>{
   // console.log(eventData)

   let fd=new FormData() //form data object constructor so we used new
        //append new user to formdata
        fd.append("event",JSON.stringify(newEventData)) //converting newUser object into string type using json.stringify
        //append selectedvfile
        fd.append("photo",selectedFile)

    axios
        .post("http://localhost:3500/event-api/create-event",fd)
        .then((response)=>{
            console.log(response)
            if(response.status===201){
                navigate('/events')
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
      <div className="row ">
        <div className=" mx-auto">
          <div className="pt-5">
            
            <p className="display-3 text-white text-center header">Create New Event</p>
          </div>
          
          <form onSubmit={handleSubmit(submitEvent)} className="shadow text-white p-5 mb-5 rounded border-top border-1 border-dark  " >
        
            <div className="row">
              <div className="col-12  mb-3">

                            <label htmlFor="event" className='mb-2 fw-bold labels'>Eventname</label>
                            <input type="text" id="event" className="form-control" 
                            {...register("eventname",{required:"*Please provide eventname"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.eventname?.message}</p> }
                            
              </div>

              <div className="col-sm-6 col-md-4 mb-3">
                            <label htmlFor="date" className='mb-2 fw-bold labels'>Date</label>
                            <input type="date" className='form-control' required 
                            {...register("date",{required:true})} />              
              </div>

              <div className="col-sm-6 col-md-4  mb-3">
                            <label htmlFor="StartTime" className='mb-2 fw-bold labels'>StartTime</label>
                            <input type="time" className='form-control' required 
                            {...register("StartTime",{required:"*Please provide StartTime"})} />
                            {errors && 
                            <p className="text-warning fw-bold">{errors.StartTime?.message}</p> }
                            
              </div>

              <div className="col-sm-6 col-md-4 mb-3">
                            <label htmlFor="EndTime" className='mb-2 fw-bold labels'>EndTime</label>
                            <input type="time" className='form-control' required 
                            {...register("EndTime",{required:"*Please provide EndTime"})} />  
                            {errors && 
                            <p className="text-warning fw-bold">{errors.EndTime?.message}</p> }            
              </div>

              

              <div className="col-sm-6 col-md-4  mb-3">
                            <label htmlFor="Status" className='fw-bold mb-2 labels'>Registrations</label>
                            <select {...register("Status",{required:"*Please provide this field"})} name="Status" id="Status" className="form-select mb-3" defaultValue={""}>

                            <option value="" disabled>Choose</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                            
                            </select>
                            {errors && 
                            <p className="text-warning fw-bold">{errors.Status?.message}</p> }
                             
              </div>

              <div className="col-sm-12 col-md-8 mx-auto mb-3">
                <label htmlFor="img" className="fw-bold mb-2 labels" >select event pic</label>
                <input onInput={onFileSelect} type="file" id="img" className='form-control' 
                {...register("image",{required:"*Please provide input file"})}/>
                {errors && 
                            <p className="text-danger lead">{errors.eventname?.message}</p> }
            </div>

              <div className="col-4 col-sm-6 col-md-2 pt-1 text-center justify-center mx-auto">
                
                <button className="btn btn-success mt-4 text-center"type='submit'>
                  <span className='fs-4 justify-center text-center text-light '>Create</span>

                </button>
              </div>

            </div>   
          </form>
        </div>
      </div> 
      
    </div>
  )
}

export default CreateEvent