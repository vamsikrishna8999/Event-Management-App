import React from 'react'
import {useForm} from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Signup() {

  let [error,setError]=useState("")
    //let [selectedFile,setSelectedFile]=useState(null)
    const navigate=useNavigate()
    let {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm()

    let submitForm=(data)=>{
      console.log(data)

      axios
        .post("http://localhost:3500/user-api/user-signup",data)
        .then((response)=>{
            //console.log(response)
            if(response.status===201){
                
                navigate('/Signin')
            }else{
                setError(response.data.message)
            }
        })
        .catch((err)=>{
            setError(err.message)
        })
    }
  return (
    <div className='container'>
      <p className="lead display-2 text-center">Signup</p>
      <div className="container">
      {error.length!==0 && 
            <p className='display-5 fw-semibold text-danger text-center'>{error}</p>}
        <form className="shadow text-light col-8 mx-auto p-3 mb-4 rounded" onSubmit={handleSubmit(submitForm)}>
        
        <div className="col-8 mx-auto mb-3">
                <label htmlFor="uname"className='mb-2' >Username</label>
                <input type="text" for="uname" className='form-control'
                {...register("username",{required:"*Please enter username",validate: {
                  minLength: (v) => v.length >= 5 || "Minimum length is 5",
                },
              })}
            />
                {errors && 
                <p className="text-danger">{errors.username?.message}</p> }
        </div>
        
          
          
        <div className="col-8 mx-auto mb-3">
                <label htmlFor="pwd"className='mb-2' >Password</label>
                <input type="password" for="pwd" className='form-control'
                {...register("password",{required:"*Please enter password",validate: {
                  minLength: (v) => v.length >= 5 || "Minimum length is 5",
                },
              })}
            />
                {errors && 
                <p className="text-danger">{errors.password?.message}</p> }
        </div>

        <div className="col-8 mx-auto mb-3">
                <label htmlFor="email"className='mb-2' >Email</label>
                <input type="text" for="email" className='form-control'
                {...register("email",{required:"*Please enter email",validate:{matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },})}
              />
                {errors && 
                <p className="text-danger">{errors.email?.message}</p> }
        </div>
          
          <div className="text-center">
            <button className="btn btn-success text-center mt-2" type="submit" >Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup