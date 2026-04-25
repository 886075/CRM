import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Cvisitor() {

  const [vistor,setvistor] = useState([]);
 // for Mvisitor 
  const [visitorofficial, setvisitorofficial] = useState([]);

    const getcenter = async () => {
    const res = await axios.get('http://localhost:5000/api/visitor');

    if (res.data.msg === "sucess") {
        setvistor(res.data.vistor);

        const visitorData = res.data.vistor.filter(
            item => item.role === "visitor_official"
        );

        setvisitorofficial(visitorData);
    }
}

    useEffect(()=>{
        getcenter();
    },[])

    const visidel = async(id)=>{
        const res = await axios.delete(`http://localhost:5000/api/Mvisitor/${id}`)
        if(res.data.msg === "Delete"){
            window.alert('delete');
            getcenter();
        }
    }



  return (
    <>  
    <div className="row">
        <div className="col-sm-12 p-5 ">
            <div className="table-responsive border p-4 shadow rounded-4">
            <h4 className='my-3'>visitor Enquire</h4>
        <table className='table table-border'>
            <thead>
                <tr className='bg-light'>
                <th>S.no</th>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Purpose</th>
                <th>Remark</th>
                <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                 visitorofficial.map((e,i)=>(
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{e.date}</td>
                    <td>{e.fullName}</td>
                    <td>{e.email}</td>
                    <td>{e.contactNumber}</td>
                    <td className='text-center'><button className='btn btn-success'>{e.purpose}</button></td>
                    <td>{e.remark}</td>
                    <td className="text-center"><button className='btn w-md-25'><i className="fa fa-edit " ></i></button></td>
                    <td className='text-center'><button className='btn w-md-25' onClick={() => visidel(e._id)} ><i className="fa fa-trash" ></i></button></td>
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

export default Cvisitor