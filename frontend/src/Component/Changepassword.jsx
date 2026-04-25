import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Changepassword(p) {
    const [cpass,setcpass]=useState('');
    const [npass,setnpass]=useState('');
    const [conpass,setconpass]=useState('');
    const [user,setuser]=useState("");
    const Navigate = useNavigate();

    const chcode = async (e)=>{
        e.preventDefault();
        console.log(p);
        if(p.role!="admin"){
            const res = await axios.get(`http://localhost:5000/api/users/${p.id}`)
            if(res.data.msg === "success"){
                setuser(res.data.user);
                console.log(res.data.user);
                var opass=res.data.user.password;
            }
            if(opass && opass!= cpass){
                toast.error('Wrong Password');
                setcpass('');
                setconpass('');
                setnpass('');
            }
            else if(opass == npass){
                toast.error('Dont Use Previous Password');
                setnpass('');
                setconpass('');
            }
            else if(npass!= conpass){
                toast.error('Confirm Password Not Match');
                setnpass('');
                setconpass('');
            }
        else{
            if(p.role!='admin'){
                const data ={"password":npass};
                console.log(data);
                const res2 = await axios.put(`http://localhost:5000/api/users/${p.id}`,data);
                if(res2.data.msg === 'Update'){
                    toast.success("Password Chnage");
                    Navigate('/login')
                }
                else{
                    toast.error('Something Wrong');
                    setcpass('');
                    setnpass('');
                    setconpass('');
                }
            }
        }

    }
}

  return (
    <>
    <div className="row g-3">

        <form action="" onSubmit={chcode}>
            <div className="col-md-12">
                <label htmlFor="" className='form-label'>Password</label>
                <input type="password" className='form-control' placeholder='Password' value={cpass} onChange={(e)=>setcpass(e.target.value)} />
            </div>
            {/*  */}
            <div className="col-md-12 mt-3">
                <label htmlFor="" className='form-label'>New Password</label>
                <input type="password" className='form-control' placeholder='Enter Password' value={npass} onChange={(e)=>setnpass(e.target.value)} />
            </div>
            {/*  */}
             <div className="col-md-12 mt-3">
                <label htmlFor="" className='form-label'>Confirm Password</label>
                <input type="password" className='form-control' placeholder='Re-enter Password' value={conpass} onChange={(e)=>setconpass(e.target.value)} />
            </div>
            {/*  */}
            <button className='btn w-100 bg-warning my-3' type='submit'>Change Password</button>
        </form>

    </div>

    </>
  )
}

export default Changepassword