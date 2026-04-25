import React, { useEffect, useState } from 'react'
import bg from '../assets/bg.jpg';
import {toast} from "react-toastify";
import axios from 'axios';
import avatar from '../assets/avatar.avif';
function Profile() {
    const [user,setuser]=useState('');
    const [skill,setskill] =useState('');
    const [quali ,setquali]= useState('');
    const [address,setaddress] = useState('');
    const [exp ,setexp]=useState('');
    const [chech,setchech]=useState('');

    const getuser = async ()=>{
        const res = await axios.get(`http://localhost:5000/api/users/${localStorage.getItem('cons')}`);
        console.log(res)
        if(res.data.msg=="success"){
            setuser(res.data.user);
            setexp(res.data.setexp);
            setquali(res.data.setquali);
            setskill(res.data.setskill);
            setaddress(res.data.setaddress);

        }
    }


    // update prifile text
    const updateprofile = async ()=>{
        if(chech){
            const datauser = {quali,exp,skill,address};
            const res = await axios.put(`http://localhost:5000/api/users/${localStorage.getItem('cons')}`,datauser);
            if(res.data.msg=="Update"){
                toast.success('Update Sucess');
                getuser();
            }
            else{
                toast.error('Update Not Success')
            }
        }
    }

    // profile pic
    const uploadpic = async (p) => {
    if (!p) {
        return toast.error('No image Selected');
    }

    const formData = new FormData();
    formData.append("profilepic", p);

    const res = await axios.patch(
        `http://localhost:5000/api/users/${localStorage.getItem('cons')}`,
        formData
    );

    console.log(res);

    if (res.data.msg === "success") {
        toast.success('Pic Uploaded');
            getuser(); // 🔥 must

    } else {
        toast.error('Something Went Wrong');
    }
};
    



    useEffect(()=>{
        getuser();
    },[])

  return (
    <>
        <div className="row p-3" style={{backgroundImage:`url(${bg})`, height:"110vh",backgroundSize:"Cover"}}>
            <div className='col-md-5 mx-auto rounded-4 shadow-md p-3 ' style={{backgroundColor:"white"}}>

               <div className='position-relative '><img src={user.profilepic ? `http://localhost:5000/uploads/${user.profilepic}` : avatar} alt="" className='h-25 w-25 rounded-5 mx-auto d-block p-2'style={{filter:"drop-shadow(5px 5px 10px gray)",}} />
               <label htmlFor="profilepic"><i className='fa fa-pen position-absolute py-2 bg-warning text-black rounded-5 shadow d-block mx-auto' style={{left:"56%", bottom:"25%",width:"20px", height:"20px",fontSize:"10px"}}></i></label>
               <input type="file" onChange={(e)=>{uploadpic(e.target.files[0])}} style={{display:"none"}} id='profilepic' />
               </div>

                <div className="col-md-12 my-3">
                    <div className="row">
                <div className="col-md-6 ">
                    <h5>Name :- {user.name}</h5>
                </div>
                <div className="col-md-6">
                    <h5>Mobile :- {user.number}</h5>
                </div>
                </div>
                </div>
                <hr />
                {/*  */}
                <div className="col-md-12 my-3">
                <div className="row">
                    <div className="col-md-6 ">
                    <h5>Email :- {user.email}</h5>
                    </div>
                    <div className="col-md-6">
                    <h5>Role :- {user.role}</h5>
                    </div>
                </div>
                </div>
                <hr />
                {/*  */}
                <div className="col-md-12 my-3">
                <div className="row">
                    <div className="col-md-6 ">
                    <h5>Center :- {user.center}</h5>
                    </div>
                </div>
                </div>
                <hr />
                {/* Qualication */}
                <div className="col-md-12 my-3">
                <div className="row">
                    <div className="col-md-12 ">
                     <h5>Qualification :- { chech ? <input type='text' className='form-control mt-2' value={quali} onChange={(e)=> setquali(e.target.value)}/> :user.quali || "---"} </h5>
                    </div>
                </div>
                </div>
                <hr />
                {/* skill */}
                <div className="col-md-12 my-3">
                <div className="row">
                    <div className="col-md-12 ">
                    <h5>Skills :- { chech ? <input type='text' className='form-control mt-2' value={skill} onChange={(e)=> setskill(e.target.value)}/> :user.skill || "---"}</h5>
                    </div>
                </div>
                </div>
                <hr />
                {/* Expre */}
                <div className="col-md-12 my-3">
                <div className="row">
                    <div className="col-md-12 ">
                    <h5>Experince :- { chech ? <input type='text' className='form-control mt-2' value={exp} onChange={(e)=> setexp(e.target.value)}/> :user.exp || "---"}</h5>
                    </div>
                </div>
                </div>
                <hr />
                {/* address */}
                <div className="col-md-12 my-3">
                <div className="row">
                    <div className="col-md-12 ">
                    <h5>Address :- { chech ? <input type='text' className='form-control mt-2' value={address} onChange={(e)=> setaddress(e.target.value)}/> :user.address || "---"}</h5>
                    </div>
                </div>
                </div>
                <hr />
                {/*  */}
                <button className='btn btn-warning w-100' onClick={()=>{setchech(!chech); updateprofile()}} >Update Profile</button>
            </div>
            {/* 2nd box */}
            <div className='col-md-6 mx-auto '>
                <div className='row h-50 pb-2'>
                    <div className='col-md-12 rounded-3 shadow-md' style={{backgroundColor:"white"}}>

                    </div>
                </div>
                <div className="row h-50 pt-2 border">
                    <div className="col-md-12 rounded-3 shadow-md" style={{backgroundColor:"white"}}>

                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Profile