import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom'

function Forget() {
    const [step,setStep] =useState(1)

    const [email,setEmail] = useState('');
    const [otp,setOtp] = useState('');
    const [pass,setPass] = useState('');
    const [cpass,setCpass] = useState('');
    const navigate = useNavigate()

    const sendotp = async (e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/otp/send_otp',{email})
        if(res.data.msg == "success"){
            toast.success("otp sent");
            setStep(2);
        }
        else{
            toast.error(res.data.msg || "otp not send")
        }
    }

    const verifyotp = async(e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/otp/verify_otp',{email,otp})
        if(res.data.msg == "success"){
            toast.success("Verfication Done");
            setStep(3);
        }
        else{
            toast.error(res.data.msg || "Not Verified")
        }
    }

    const resetpassword = async(e)=>{
        e.preventDefault();
        if(pass !== cpass){
            return toast.error("Password Not Match")
        }
        const res = await axios.post('http://localhost:5000/api/otp/create_pass',{email,cpass})
        if(res.data.msg == "success"){
            toast.success("new password created")
        }
        else{
            toast.error(res.data.msg || "password Not Created")
        }
        navigate('/login')
    }

  return (
    <>
    <div className="row">

    <div className="col-md-12">
        <div className="row mx-auto">
            <div className="col-md-6">
            {/* email */}

            {
                step ==1 && (
                    <>
                    <form action="" onSubmit={sendotp}>
                    <div className='border text-center'>
            <h5>Forget Password</h5>

            <input type="email" placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
            <button className='btn btn-primary'>Send Otp</button>
            </div>
            </form>
            </>
                )
            }
          
            
        {/* verify password */}
        {
            step==2 &&(
                <div>
            <form onSubmit={verifyotp}>
            <input type="number" placeholder='enter your otp' value={otp} onChange={(e)=>setOtp(e.target.value)} /> 
            <button className='btn btn-primary'>Verify Otp</button>
            </form>
        </div>
            )
        }
        
        {/* passord */}
        {
        step==3 && (
            <div>
                <form onSubmit={resetpassword}>
            <label htmlFor="">Create Password</label>
            <input type="text" placeholder='enter your password' value={pass}  onChange={(e)=>setPass(e.target.value)}/> <br />
            <label htmlFor="">Confirm Password</label>
            <input type="text" placeholder='Confirm password' value={cpass} onChange={(e)=>setCpass(e.target.value)} />
            <button className='btn btn-primary'>Verify Otp</button>
            </form>
        </div>
        )
    }
         
            </div>
        </div>
    </div>
        
        </div>
    </>
  )
}

export default Forget