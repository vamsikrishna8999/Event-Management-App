import React, { useEffect } from 'react'
import { useState,useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../contexts/loginContext'


function Signin() {

  let [currentUser,loginErr,userLoginStatus,loginUser]=(useContext(loginContext))

  //console.log(useContext(loginContext))

    let [error,setError]=useState("")

    const navigate=useNavigate()

    let{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm();

    let handleSubmitUser=(userCredObj)=>{
      //console.log(userCredObj)
      loginUser(userCredObj)
      
    }

    useEffect(()=>{
        if(userLoginStatus===true){
            navigate("/user-profile")
        }
    },[userLoginStatus]) 


  return (
    <div className='container'>
      <div className="display-2 text-center header">
        Signin
        {loginErr.length!==0 && <p className='lead display-5 fw-semibold text-danger'>{loginErr}</p>}
        </div>
      <div className="container mt-3">
        <form className="shadow  text-light col-8 mx-auto  p-3 mb-4 rounded" onSubmit={handleSubmit(handleSubmitUser)} >
        <div className="col-8 mx-auto mb-3">
                <label htmlFor="uname"className='mb-2' >Username</label>
                <input type="text" for="uname" className='form-control'
                {...register("username",{required:"*Please provide username"})} />
                {errors && 
                            <p className="text-danger">{errors.username?.message}</p> }
        </div>
          <div className="col-8 mx-auto mb-3">
                <label htmlFor="pwd"className='mb-2' >Password</label>
                <input type="password" for="pwd" className='form-control'
                {...register("password",{required:"*Please enter password"})} />
                {errors && 
                <p className="text-danger ">{errors.password?.message}</p> }
        </div>

        <div className="col-8 mx-auto mb-3">
                            <label htmlFor="usertype" className=' mb-2 labels'>Type</label>
                            <select {...register("usertype")} name="usertype" id="usertype" className="form-select mb-3">

                            
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            </select>
                            <p className="text-danger">{errors.usertype?.message}</p> 
              </div>



          <div className="text-center">
            <button className="btn btn-success text-center mt-2" type='submit' >Submit</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Signin