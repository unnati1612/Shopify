import React, { useState } from 'react'
import productIcon from '../assets/product.png'
import productimg from '../assets/productimg.gif'
import shopIcon from '../assets/shopIcon.png'
import { Link, useNavigate } from 'react-router-dom'
const SignUp = () => {

  const [userData,setUserData]=useState({
    name:'',
    email:'',
    password:'',
    confirmPass:'',    
  })

  
  const navigate=useNavigate()
  const handleChange = (e) => {
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e) => {
    e.preventDefault()
    // console.log(values)
    if(userData.password!==userData.confirmPass){
      alert('Password and Confirm Password do not match')
      return
    }
    console.log(userData)

    let users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')) : null
    if(users==null){
      localStorage.setItem('users',JSON.stringify([userData]))
      navigate('/login')
      
    }else{
      if(users.some((item)=>(
        item.email==userData.email
      )))
      {
        alert('Email Id already exists')
        return
      }
  
      users.push(userData)
      localStorage.setItem('users',JSON.stringify(users))
      navigate('/login')

    }

  }

  return (
    <div className='d-flex justify-content-center align-items-center pt-2'>

    <div className='row p-3 signbox container border '>
    <div className='col-5 p-3 border signupleft d-flex flex-column align-items-center justify-content-between text-white'>
    <h5 className='logotext'><img src={shopIcon} style={{width:"32px", height:"32px",}} className='me-1'/>SHOPIFY</h5>
    <div className='mt-4'>
    <h1 className="text-center">Start Your Journey With Us</h1>
    <p className="text-center mt-3">Discover the World's most Trending Products at your convenience !</p>
    </div>
    <img src={productimg} style={{width:"170px",height:"170px"}} className='mt-2' />
    </div>
    
    <div className=' col-7 d-flex justify-content-center align-items-center flex-column'>        
    <h4 className=''>Sign Up</h4>
    <form onSubmit={handleSubmit}>
        <label for="name">Name</label>
        <input type='text' className='form-control mb-2 bg-light border-2 border' required onChange={handleChange} name="name"/>
        <label for="email">Email Id</label>
        <input type='email' className='form-control mb-2  bg-light border-2 border ' required onChange={handleChange} name="email"/>
        <div className='row'>
            <div className='col-6'>
        <label for="password">Password</label>
        <input type='password' className='form-control mb-2 bg-light border-2 border' onChange={handleChange} name="password"/>
        </div>
        <div className='col-6'>
        <label for="confirmPass">Confirm Password</label>
        <input type='password' className='form-control mb-2 bg-light border-2 border' onChange={handleChange} name="confirmPass"/>
        </div>
        
            </div>
            <div>
       <input type="checkbox" required name="terms"className='me-2' />
       <label for="terms"><small >I agree to all the Terms and Conditions</small></label>
       </div>
      <button type="submit" className='btn btn-primary mt-3 w-100'>Create Account</button>
      <div className="hr-theme-slash-2 mt-2">
  <div className="hr-line"></div>
    <p className='m-0'>OR</p>
  <div className="hr-line"></div>
</div>
    <button className='btn btn-outline-primary w-100 mb-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google me-3" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg>Continue With Google</button>
    <small className='mt-3 align-self-start'>Already Registered? <Link to="/login">Login</Link></small>
    </form>
    </div>
    </div>
    </div>
  )
}

export default SignUp