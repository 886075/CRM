import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify";

function Center() {

    const [name,setName] = useState('');
    const [address,setaddress] = useState('');
    const [status,setStatus] = useState('');


    const addcenter = async (e)=>{
        e.preventDefault();

        const center = {name,address,status}
        const res = await axios.post('http://localhost:5000/api/center',center);
        if(res.data.msg =='sucess'){
        window.alert('sucess')
        getcenter();
        setName('')
        setStatus('')
        setaddress('')
        }
        else{
            window.alert('not')
        }

    }

    // table me data store
    const [center,setCenter] = useState([]);

    const getcenter = async()=>{
        const res = await axios.get('http://localhost:5000/api/center')
        if(res.data.msg=="sucess"){
            setCenter(res.data.center) // center means jo router me de rakha hai use likhan hai
        }

    }
    
    useEffect(()=>{
        getcenter();
    },[])



    // delete data
    const userdel = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/center/${id}`);
    if (res.data.msg === "sucess") {
        window.alert('Data deleted');
        getcenter(); // dubara data fetch
    }
    }

    //active or deactive
    const changestatus = async(id,st)=>{
       
        const res = await axios.put(`http://localhost:5000/api/center/${id}/${st}`);
        if(res.data.msg==="sucess"){
            toast.success('Updated');
            getcenter();
        }
        else{
            toast.error('something want Wrong')
        }
    }

    // edit button
    const [editid,seteditid]=useState(null);

    const update = async(e)=>{
        e.preventDefault();
        const center= {name,address,status};
        const res = await axios.put(`http://localhost:5000/api/center/${editid}`,center);
        if(res.data.msg="sucess"){
            toast.success('Update Success');
            seteditid(null);
            setName('');
            setaddress('');
            setStatus('');
            getcenter();
        }
        else{
            toast.error('Something went wrong');
        }
    }
    




  return (
    <>
    <div className="row">
    <div className="col-md-12 p-4">
            <form action="" className='row g-3 p-4 border rounded-3 shadow' onSubmit={addcenter}>
                <h5 className=''>
                    Create New Center
                </h5>
                <div className='col-md-4'>
                    <label htmlFor="" className='form-label'>Center Name *</label>
                    <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className='col-md-3'>
                    <label htmlFor="" className='form-label'>Enter Location *</label>
                    <input type="text"  className='form-control' value={address} onChange={(e)=>setaddress(e.target.value)}/>
                </div>
                <div className='col-md-3'>
                    <label htmlFor="" className='form-label'>Select Status</label>
                <select className='form-control' value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option 
                    >Select Status</option>
                    <option>Active</option>
                    <option>Deactive</option>
                </select>
                </div>
                <div className="col-md-2">
                    <button className='btn btn-danger mt-4 p-2 w-100 ' type='submit'>Submit</button>
                </div>
            </form>
            </div>
            </div>

    <div className="row">
        <div className="col-sm-12 p-4">
            <div class="table-responsive border p-3 rounded-3 shadow">
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

                <table className='table table-border mt-4'>
                <thead className='bg-light '>
                    <tr>
                        <th>S.no</th>
                        <th>name</th>
                        <th>Location</th>
                        <th colSpan={2}>status</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        center.map((e,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{e.name}</td>
                                <td>{e.address}</td>
                                <td><small style={{color:`${e.status=="Active" ?"green" : "red"}`}}>{e.status}</small></td>
                                
                                <td className="text-center"> <button onClick={()=>{changestatus(e._id,e.status)}} className={`btn btn-sm ${e.status=="Deactive"? "btn-success" :"btn-danger"}  w-md-25 `}>{e.status=="Active"?"Deactive":"Active"}</button></td>


                                <td className="text-center"><button className='btn w-50' onClick={()=>{
                                    setName(e.name);
                                    setaddress(e.address);
                                    setStatus(e.status);
                                    seteditid(e._id);
                                    }}><i className="fa fa-edit " ></i></button></td>

                                <td className="text-center"><button className='btn w-50' onClick={() => userdel(e._id)}><i className="fa fa-trash" ></i></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    </div>
            
    
    </>
  )
}

export default Center