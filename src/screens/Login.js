import React, { useState } from 'react'
import loginbg from '../assets/loginbg.png'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
  const [userData,setUserData]=useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange=e=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }
  const handleSubmit=e=>{
    e.preventDefault()
    console.log(userData)

    let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):null
    if(users!=null){
      if(users.some((item)=>(
        item.email==userData.email&&item.password==userData.password
      ))){
        localStorage.setItem('isLoggedIn',true);
        window.location.href="/";
        // navigate('/')
      }      
    }
  }
  return (
    <div className='container  pt-2'>
        <div className='row ' >
        <div className='col-6 logindiv p-3 m-0'>
          <div className='border border-3 rounded-3 p-3' style={{width:"80%"}}>
            <div className='text-center'>
            <h4 >Welcome Back !</h4>  
            <p>Login to start Shopping!!</p>
            </div>
            <form onSubmit={handleSubmit}>
            <label for="email">Email Id</label>
        <input type='email' required className='form-control mb-2  bg-light border-2 border' onChange={handleChange} name="email"/>
        <label for="password">Password</label>
        <input type='password' required className='form-control mb-2  bg-light border-2 border' onChange={handleChange}  name="password"/>
        <button type='submit' className='btn btn-primary mt-2 w-100'>Login</button>
        <div className="hr-theme-slash-2 mt-2">
  <div className="hr-line"></div>
    <p className='m-0'>OR</p>
  <div className="hr-line"></div>
</div>
    <button className='btn btn-outline-primary w-100 mb-3'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google me-3" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg>Continue With Google</button>
    <small className='mt-3 align-self-start'>Not a Member? <Link to="/signup">Register</Link></small>
            </form>
          </div>
        </div>
        <div className='col-6 p-0 m-0'>     
        <img src={loginbg} style={{width:"100%" , height:"85vh"}} className='' />
        </div>
        </div>
    </div>
  )
}

export default Login