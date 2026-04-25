import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"

function Aduser() {
    const [centers,setcenters]=useState([]);
    const [email,setEmail]=useState('');
    const [number,setNumber]=useState('');
    const [password,setPassword] = useState('');
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [status,setStatus]=useState('');
    const [center,setCenter]=useState('')
     const [users, setUsers] = useState([]);

    const getcenter = async ()=>{
        const res = await axios.get('http://localhost:5000/api/center');
        if(res.data.msg=='sucess'){
            var x = res.data.center;
            console.log(x)
            x = x.filter((e)=>e.status=='Active');
            setcenters(x);
        }
    }

    useEffect(()=>{
        getcenter()
    },[])

   // input data store in md
    const adduser = async (e)=>{
        e.preventDefault();
        const user = {name,number,email,role,center};
        const res = await axios.post('http://localhost:5000/api/users',user);
        console.log(res);
        if(res.data.msg=="sucess"){
            window.alert('submit user');
            getUsers();
        }
        else{
            window.alert('not submit')
        }
    }


    // table data show
    const getUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');       
        if(res.data.msg === "sucess"){
            setUsers(res.data.user);
           
        }
    }

    useEffect(()=>{
        getUsers();
    },[])

    //delete
    const userdel = async(id)=>{
        const res = await axios.delete(`http://localhost:5000/api/users/${id}`)
        if(res.data.msg === "Delete"){
            window.alert('delete data');
            getUsers();
        }
    }


    //u or b
     const changestatus = async(id,st)=>{
       
        const res = await axios.put(`http://localhost:5000/api/users/${id}/${st}`);
        if(res.data.msg==="sucess"){
            toast.success('Updated');
            getUsers();
        }
        else{
            toast.error('something want Wrong')
        }
    }


  return (
    <>
    <div className="row">
    <div className="col-sm-12 p-5">
        <form  onSubmit={adduser} className='row g-3  border shadow p-2 rounded-3'>
        {/* name */}
        <div className='col-md-3'>
        <label htmlFor="">Enter Name :-</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='form-control' />
        </div>
        {/* email */}
        <div className=' col-md-3'>
        <label htmlFor="">Enter Email :-</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control' />
        </div>
        {/* mobile */}
        <div className='col-md-2'>
        <label htmlFor="">Enter Mobile :-</label>
        <input type="tel" value={number} onChange={(e)=>setNumber(e.target.value)} className='form-control' />
        </div>
        {/* password */}
        <div className='col-md-2'>
            <label htmlFor="">Enter Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' />
        </div>
        {/* Role */}
        <div className='col-md-2'>
        <label htmlFor="">Role</label>
        <select value={role} onChange={(e)=>setRole(e.target.value)} className='form-control'>
            <option value="">---Select Role ---</option>
            <option value="manger">Manger</option>
            <option value="cons">Conselor</option>

        </select>
        </div>
        {/* center */}
        <label className="">Assign Center</label> <br />
        <div className="col-md-12 bg-light p-4 rounded-3 text-muted">

        {
        centers.map((c) => (
            // agar radio buuton hoga tho name='center' 
            <label key={c._id} className="me-3">
            <input type="checkbox" value={c.name}  onChange={(e) => setCenter(e.target.value)}/> {c.name} </label>

        ))}

        </div>
        <div className='col-md-2'>
            <button type='submit' className='btn btn-danger w-100' >Create User</button>
        </div>
        </form>
        </div>
        </div>

        {/*  */}
        <div className="row">
        <div className="col-md-12 p-5">
            <div className='row border p-2 shadow rounded-3'>
            <h5 className='mt-2'>Exisiting Users</h5>
            
            <div className='d-flex gap-2 flex-wrap align-items-center '>
                <button className='rounded-1 tc'>Copy</button>
                <button className='rounded-1 tc'>Excel</button>
                <button className='rounded-1 tc'>PDF</button>
                <button className='rounded-1 tc'>Column Visibility</button>
                <button className='rounded-1 tc'>Show</button>
                  <div className="ms-md-auto d-flex text-center">
                  <label htmlFor="" className='mt-2'> Search:- </label>  <input type="search" placeholder="Search..." className="form-control" />
                  </div> 
            </div>

            <div className="table-responsive">
            <table className='table table-border mt-4' >
                <thead>
                    <tr className='bg-light '>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Center</th>
                        <th>Status</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((e,i)=>(
                            <tr key={e._id} >
                                <td>{i+1}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.number}</td>
                                <td><button className='btn btn-sm  btn-info'>{e.role}</button></td>
                                <td>{e.center}</td>
                                <td>{e.status=="u"?"Active":"Deactive"}</td>
                                <td><button onClick={()=>{changestatus(e._id,e.status)}} className={`btn btn-sm ${e.status=="u" ? "btn-success" :"btn-danger"}`}>{e.status=="u"?"Active":"Deactive"}</button></td>
                                <td><button className='btn'><i className="fa fa-edit ps-3" ></i></button></td>
                                <td><button className='btn' onClick={() => userdel(e._id)}><i className="fa fa-trash pe-3 text-danger"></i></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
        {/*  */}
        

    
    </>
  )
}

export default Aduser