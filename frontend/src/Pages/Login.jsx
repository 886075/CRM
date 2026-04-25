import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import{toast} from "react-toastify"

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const logcode = async (e)=>{
        e.preventDefault();
        const user ={email,password}
        console.log(user)
        const res= await axios.post('http://localhost:5000/api/admin/log',user);
        console.log(res);
        if(res.data.msg=='success'){
            // window.alert('Login Sucess')
            toast.success('login sucess');
            
            // for login throgh mongodash base manualy but dat
            // localStorage.setItem('admin',res.data.user);
            

            // setEmail('');
            // setPassword('');
            // navigate('/dashboard');

            localStorage.setItem(res.data.role,res.data.id)
            localStorage.setItem("role",res.data.role)
            // for name strore
            localStorage.setItem("name", res.data.name)
            localStorage.setItem("id", res.data.id)

            setEmail('');
            setPassword('');
            if(res.data.role=='admin'){
                navigate('/dashboard')
            }
            else if(res.data.role=='manger'){
                navigate('/mdash/')
            }
            else{
                navigate('/cdash')
            }
            

        }
        else{
            // window.alert('not sucess');
            toast.error(res.data.msg)
            setPassword('');
            setPassword('');
        }

    }

    // logout

    const validate =()=>{
        if(localStorage.getItem('admin')){
            localStorage.removeItem('admin')
        }
        
        if(localStorage.getItem('manger')){
            localStorage.removeItem('manger')
        }
        
        if(localStorage.getItem('cons')){
            localStorage.removeItem('cons')
        }
    }

    useEffect(()=>{
        validate();
    },[])


    // show password or hide function

    function showpass(){
        const t = document.querySelector('input[name=password]')
            if(t.type=="password"){
                t.type="text";
                eye.className="fa-solid fa-eye";

            }
            else{
                t.type="password";
                eye.className="fa-solid fa-eye-slash";
            }
        
    }




  return (
    <>
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 bg-white shadow" id='login'>
                <div className='text-center logo mt-4 '>
                    <img src="/src/assets/spilogo.png" alt="" height={'80px'}/>
                    <h5 className='mt-2 fw-bold'>CRM</h5>
                </div>
                <div className='ms-3'>
                    <h4 className='mt-5' style={{color:'orange'}}>Welcome Back <i class="fa-solid fa-hand fa-shake text-warning"></i></h4>
                    <p>Sign in to continue</p>
                </div>
                <form action="" className='form-control'>
                <div className='for ms-3'>
                    <label htmlFor="">Username *</label> <br />
                    <input type="email" placeholder='Enter username' className='form-control w-100' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                </div>
                <div className='for ms-3 mt-3'>
                    <label htmlFor="">Password *</label> <span onClick={showpass}><i class="fa-solid fa-eye-slash" id='eye'></i></span>
                    <input type="password" placeholder='Enter Password' name='password'   value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <button className='btn  btn-customs ' type='submit' onClick={logcode}>
                  <Link  className="text-white text-decoration-none" >  <i class="fa-solid fa-right-to-bracket"></i> Sign In </Link>
                </button>
                    <Link to='/forgetpassword'>Forget PAssword</Link>
                </form>
                <div className='text-center ashu'>
                    <p>
                        Designed & Developed By <span style={{color:'orange'}}>Ashutosh Singh Parmar</span> 
                    </p>
                </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
    
    </>
  )
}

export default Login