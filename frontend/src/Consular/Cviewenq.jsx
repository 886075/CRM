import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Cviewenq() {

    const [user,setEnq] = useState([]);
    const [users,setUsers] = useState([]);

    // for lock
    const [d,setd]=useState(true);

    // for filter
    const [filteruser,setfilteruser] = useState([]);

    // dynamic data show on offcanvas through tr
    const [selectedEnq, setSelectedEnq] = useState(null);


    // follow up
    const [status,setstatus]= useState('');
    const [nextdate,setnextdate]= useState('');
    const [program,setprogram] = useState('');
    const [remark ,setremark]= useState('');

    // followup
    const [filterfollow,setfilterfollow] = useState([]);


    const [uid ,setUid] = useState('');
    const [rem,setRem] = useState('');
    const [editId,setEditId] =useState(null);

    const getenq = async()=>{
        const res = await axios.get('http://localhost:5000/api/enq')
        const res2 = await axios.get(`http://localhost:5000/api/users/${localStorage.getItem('cons')}`)

        if(res.data.msg=="sucess" && res.data.msg=="sucess"){
            console.log(res.data.enq);
            var enquires = res.data.enq.filter((a)=>{
                return a.assignto?a.assignto._id==localStorage.getItem('cons'): a.center == res2.data.user.center
            })
            console.log(enquires);
            setEnq(enquires)
            // setEnq(res.data.enq);
        }

    }

    useEffect(()=>{
        getenq();
    },[])


    // delete
    const adviewdel = async(id)=>{
        const res = await axios.delete(`http://localhost:5000/api/enq/${id}`)
        if(res.data.msg === "Delete"){
            window.alert('delete data');
            getenq();
        }
    }


    // users ka data

    const getUsers = async()=>{
        const res = await axios.get('http://localhost:5000/api/users')
        if(res.data.msg=="sucess"){
            setUsers(res.data.user)
        }

    }

    useEffect(()=>{
        getUsers();
    },[])


    // edit
    const updateEnq = async (e)=>{
        e.preventDefault();
        const d=Date();
        const data ={"assignto":uid,"assignby":localStorage.getItem("cons"),assigndate:d};
        const res = await axios.put(`http://localhost:5000/api/enq/${editId}`,data);
        // console.log(res);
        const assigndata = {enqid:editId,assignto:uid,assignby: localStorage.getItem("cons"),assignbyModel:'user',remark:rem};
        const res2 = await axios.post(`http://localhost:5000/api/assign`,assigndata);
        console.log(res2)
        if(res.data.msg=="Update" && res2.data.msg=="success"){
            // console.log(user)
            window.alert("update data");
            setUid('');
            setEditId(null);
            setRem('');
            // getenq();
        }
    }


    // new assignfun

    const assignfun=(e)=>{
        console.log(e);
        setEditId(e._id);
        var fu = users.filter((u)=>{
            if(localStorage.getItem("cons") == u._id){
                return false
            }
            else{
                return u.center == e.center
            }
        })
        setfilteruser(fu);
    }

    
    //dynamic data show on offcanvas through tr
    const handleRowClick = (data) => {
    setSelectedEnq(data);

    if(data.assignto && data.assignto._id==localStorage.getItem('cons')){
        setd(false)
    }
    else{
        setd(true)
    }

    const offcanvas = new window.bootstrap.Offcanvas(
        document.getElementById("enqOffcanvas")
    );

    // for follow up data to call kiya
    getfollowup(data._id)
    offcanvas.show();
    };


    // for follow up data 27-03-26

    const addfollowup = async(e)=>{
        e.preventDefault();
        const followupdata ={'enqid':selectedEnq._id, 'uid':localStorage.getItem('cons'),status,nextdate,remark,program}
        console.log(followupdata)
        const res = await axios.post('http://localhost:5000/api/followup',followupdata)
        if(res.data.msg=="sucess"){
            window.alert('Follow-up added successfully');
            setstatus('');
            setprogram('');
            setremark('');
            setnextdate('');
        }
        else{
            window.alert('Something went Wrong');
        }

    }

    //  filter for histroy of followup
    const getfollowup = async (id)=>{
        const res = await axios.get('http://localhost:5000/api/followup')
        console.log(res)
        if(res.data.msg=="sucess"){
            const followupdata =res.data.followup;
            const fd = followupdata.filter((f)=>{
                return f.enqid._id == id;
            })
            console.log(fd)
            setfilterfollow(fd);
        }
    }

    
    

    


  return (
    <>
    
    <div className="row">
        <div className="col-md-12 p-5 ">
            <div className="row border rounded-3 shadow">
                <div className="col-md-2"></div>
                <div className="col-md-1">
                    <h5 className='text-center mt-5'>Enquire</h5>
                </div>
                <div className="col-md-3 p-4">
                    <div className='border rounded-3 p-3 shadow'>
                        <p>Total Enquire</p>
                        <h5>{user.length}</h5>
                    </div>
                </div>
                <div className="col-md-3 p-4">
                    <div className='border rounded-3 p-3 shadow'>
                        <p>Total Assigned</p>
                        <h5 className='text-success'>{user.filter(e => e.assignto).length}</h5>
                    </div>
                </div>
                <div className="col-md-3 p-4">
                    <div className='border rounded-3 p-3 shadow'>
                        <p>Not Assigned</p>
                        <h5 className='text-danger'>{user.filter(e => !e.assignto).length}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/*  */}
    <div className="row">
        <div className="col-md-12 p-5 ">
            <div className="row border rounded-3 p-3 border-bottom-0">
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Search</label>
                    <input type="search" className='form-control' placeholder='Name,Mobile,College,Center,etc' />
                </div>
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Status</label>
                    <select className='form-control'>
                        <option >All</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Assigned to</label>
                    <select className='form-control'>
                        <option >All</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Center</label>
                    <select className='form-control'>
                        <option >All</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Source</label>
                    <select className='form-control'>
                        <option >All</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Session</label>
                    <select className='form-control'>
                        <option >All</option>
                    </select>
                </div>
            </div>
            <div className="row  border rounded-3 p-3 border-top-0">
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Next-Follow-Up</label>
                    <select className='form-control'>
                        <option >All</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>Form</label>
                    <input type="date" className='form-control'  />
                </div>
                <div className="col-md-2">
                    <label htmlFor="" className='form-label'>To</label>
                    <input type="date" className='form-control'  />
                </div>
                <div className="col-md-2">
                    <button className='btn w-100 btn-light p-3 my-4 border'>Reset</button>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-2"></div>
            </div>
        </div>
        </div>
    

    {/*  */}
    <div className="row">
        <div className="col-md-12 p-5 ">
            <div className="table-responsive p-5 border rounded-4 shadow">
                <h4 className='mb-3'>View All Enquire</h4>
        <div className='d-flex gap-2 flex-wrap align-items-center mb-3'>
            <button className='rounded-1 tc'>Copy</button>
                <button className='rounded-1 tc'>Excel</button>
                <button className='rounded-1 tc'>PDF</button>
                <button className='rounded-1 tc'>Column Visibility</button>
                <button className='rounded-1 tc'>Show</button>
                <div className="ms-md-auto d-flex text-center">
                    <label htmlFor="" className='mt-2'> Search:- </label>  <input type="search" placeholder="Search..." className="form-control" />
                </div>
        </div>
        <div className='table-responsive'>
        <table  className='table table-border'>
            <thead>
                <tr className='bg-light'>
                <th>S.no</th>
                <th>Date</th>
                <th>Action</th>
                <th>Source</th>
                <th>Name</th>
                <th>College</th>
                <th>Center</th>
                <th>For-Program</th>
                <th>Assigned</th>
                <th>Status</th>
                <th>Next-follow-up</th>
                </tr>
            </thead>
            <tbody>
                {
                user.map((e,i)=>(
                <tr key={i}  onClick={() =>{ e.status=="u"?handleRowClick(e):toast.error('Enquire is Deactive')}} style={{ cursor: "pointer" }} > 

                    <td>{i+1}</td>
                    <td>{e.createdAt.split("T")[0]}</td>
                    <td>
                    <div className='d-flex gap-2'>
                    {/* whatapp */}
                    <a href={`https://web.whatsapp.com/${e.contactNumber}`} target='_blank' className='btn btn-outline-success' onClick={(e)=>e.stopPropagation()}>WA</a>
                    {/* copy */}
                    <button className='btn btn-info' onClick={(e)=>e.stopPropagation()}>Copy</button>
                    
                        <div class="dropdown d-inline" onClick={(e)=>e.stopPropagation()}>
                        <button class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#"><button className='btn' onClick={() => adviewdel(e._id)} ><i className="fa fa-trash" ></i>
                        </button></a></li>
                            <li><a class="dropdown-item">
                            </a></li>
                            
                        </ul>
                        </div>
                        </div>
                    </td>
                    <td>{e.source}</td>
                    <td>
                        <b>{e.fullName}</b>
                        <br />
                        {e.contactNumber}
                        <br />
                        {e.course}
                    </td>
                    <td>{e.college}</td>
                    <td>{e.center}</td>
                    <td>{e.forprogram || "-"}</td>
                    <td>{e.assignto? e.assignto.name :"Not Assigned"}</td>
                    <td style={{color:`${e.status=="u"?"green":"red"}`}}>{e.status=="u"?"Active":"Deactive"}</td>
                    <td>{e.nextfollowupdate || "-"}</td>
                    
                </tr>
                ))
            }
            </tbody>

        </table>
        </div>

            </div>
        </div>
        {/* model */}
                <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form onSubmit={updateEnq}>
                <div class="mb-3">
                    <label htmlFor="recipient-name" class="col-form-label">Assign Enquire</label>
                    {/* <input type="text" value={editId} /> sirf dekhne ke liye ki id aa raha hai ki nahi */}
                    <select className='form-control' value={uid} onChange={(e)=>setUid(e.target.value)}>
                        <option>--Select User--</option>
                        {
                            filteruser.map((u)=>(
                                <option key={u._id} value={u._id}>{u.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div class="mb-3">
                    <label htmlFor="message-text" class="col-form-label">Note(Optional):</label>
                    <textarea class="form-control" id="message-text"  onChange={(e)=>setRem(e.target.value)}></textarea>
                </div>

                <div class="modal-footer">
                <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Assign</button>
            </div>
        </form>

            </div>
            

            </div>
        </div>
        </div>

        {/* model 2 */}
        
        {/*  */}
            {/* <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasLabel">Enquire Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div className="row">
                    <div>
                        <div className="row">
                            <div className="col-md-8">
                                <h6>Tapasya Singh</h6>
                                <p>MBA.Softpro House,Jankipuram,Lucknow</p>
                            </div>
                            <div className="col-md-4">
                                <button className='btn btn-danger w-100'>New</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-4">
                                <p>Mobile</p>
                                <p>Email</p>
                                <p>Course</p>
                                <p>Center</p>
                                <p>Assigned</p>
                                <p>Created</p>
                            </div>
                            <div className="col-md-8">
                                <h6>9696456126</h6>
                                <h6>-------</h6>
                                <h6>MBA</h6>
                                <h6>Softpro House,Jankipuram ,Lucknow</h6>
                                <h6>Saloni Mani</h6>
                                <h6>2025-10-12 00:00:00</h6>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-4">
                                <button className='btn btn-outline-info w-100'>Call</button>
                            </div>
                            <div className="col-md-4">
                                <button className='btn btn-outline-success w-100'>WhatApp</button>
                            </div>
                            <div className="col-md-4">
                                <button className='btn btn-outline-danger'>Transfer</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <p>Add Follow-Up</p>
                            <label htmlFor="" className='form-label'>Status</label>
                            <select className='form-control'>
                                <option >Follow Up</option>
                            </select>
                            <label htmlFor="" className='form-label'>Next-Follow-Up Date</label>
                            <input type="date" className='form-control' />
                            <label htmlFor="" className='form-label'>For Program</label>
                            <select className='form-control' >
                                <option >Select Program</option>
                            </select>
                            <label htmlFor="" className='from-label'>Remark</label>
                            <textarea className='form-control'></textarea>
                            <button className='btn btn-danger w-100'>Save Follow-Up</button>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-8">
                                <h6>Follow-Up-Timeline</h6>
                                <p>Now Follow-ups yet</p>
                            </div>
                            <div className="col-md-4">
                                <button className='btn btn-outline-dark w-100'>Refresh</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div> */}
            <div 
    className="offcanvas offcanvas-end" 
    tabIndex="-1" 
    id="enqOffcanvas"
    style={{ width: "420px" }}
    >
    <div className="offcanvas-header border-bottom">
        <div>
        <h5 className="mb-0">Enquiry Details</h5>
        <small className="text-muted">
            {selectedEnq?.course} • {selectedEnq?.center}
        </small>
        </div>

        <button 
        type="button" 
        className="btn-close" 
        data-bs-dismiss="offcanvas"
        ></button>
    </div>

    <div className="offcanvas-body">

        {selectedEnq && (
        <>
            {/* USER HEADER */}
            <div className="mb-3">
            <h6 className="mb-0">{selectedEnq.fullName}</h6>
            <small className="text-muted">
                {selectedEnq.course} • {selectedEnq.center}
            </small>

            <span className="badge bg-warning float-end">New</span>
            </div>

        <hr />

        {/* DETAILS */}
        <div className="mb-3">
          <p className="mb-1"><b>Mobile:</b> {selectedEnq.contactNumber}</p>
          <p className="mb-1"><b>Email:</b> {selectedEnq.email || "-"}</p>
          <p className="mb-1"><b>Course:</b> {selectedEnq.course}</p>
          <p className="mb-1"><b>Center:</b> {selectedEnq.center}</p>
          <p className="mb-1">
            <b>Assigned:</b> {selectedEnq.assignto?.name || "Not Assigned"}
          </p>
          <p className="mb-1">
            <b>Created:</b> {selectedEnq.createdAt?.split("T")[0]}
          </p>
        </div>

        {/* ACTION BUTTONS */}

        {
            selectedEnq.assignto &&
            <div className="d-flex gap-2 mb-3">
          <a 
            href={`tel:${selectedEnq.contactNumber}`} 
            className="btn btn-outline-primary w-100"
          >
            Call
          </a>

          <a 
            href={`https://api.whatsapp.com/send/?phone=${selectedEnq.contactNumber}`} 
            target="_blank"
            className="btn btn-outline-success w-100"
          >
            WhatsApp
          </a>

          <button type="button" class="btn btn-outline-warning w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={()=>{assignfun(selectedEnq)}}>Trasfer</button>
        </div>
        }
        

        <hr />

        {/* FOLLOW-UP SECTION */}
        <h6>Add Follow-Up</h6>

        <div className='position-relative '>
            {
                    d && <div style={{backgroundColor:"rgba(255,0,0,0.5)"}} className='d-flex justify-content-center align-items-center display-1 rounded-3 position-absolute w-100 h-100'>
                    <i className='fa-solid fa-lock text-black'></i>
                    
                </div>
            }
              <form action="post" onSubmit={addfollowup}>
        <div className="mb-2">
          <label >Status</label>
          <select value={status} onChange={(e)=>setstatus(e.target.value)} className="form-control">
            <option>Follow Up</option>
            <option>Hot Enquire</option>
            <option>Cold Enquire</option> 
            <option>Not Interest</option>  
            <option>Registor</option>


          </select>
        </div>

        <div className="mb-2">
          <label  >Next Follow-Up Date</label>
          <input value={nextdate} onChange={(e)=>setnextdate(e.target.value)} type="date" className="form-control" />
        </div>

        <div className="mb-2">
          <label  >For Programme</label>
          <select  value={program} onChange={(e)=>setprogram(e.target.value)} className="form-control">
            <option>Select Programme</option>
            <option>Summer Training</option>
            <option>Vocational Training</option>
            <option>Industrial Training</option>
          </select>
        </div>

        <div className="mb-3">
          <label >Remark</label>
          <textarea value={remark} onChange={(e)=>setremark(e.target.value)}
            className="form-control" 
            placeholder="Write exact conversation notes..."
          ></textarea>
        </div>

        {/* button */}
        <input type="submit" className="btn btn-warning w-100 mb-3" value="Save Follow-up" />

        </form>
            
        </div>

      
        <hr />

        {/* TIMELINE */}
        <div className="d-flex justify-content-between align-items-center">
          <h6>Follow-Up Timeline</h6>
          <button className="btn btn-sm btn-outline-secondary">
            Refresh
          </button>
        </div>

        {
            filterfollow.map((f)=>(
                <div>
                    <ul className='' type="circle">
                        <li>
                            <div className='d-flex justify-content-between'>
                                <span>{f.status}</span>
                                <span>{f.createdAt}</span>
                            </div>
                            <p>{f.remark}</p>
                            <div className='d-flex justify-content-between bg-light rounded-2 px-2 '>
                                <p> By:- {f.uid.name}</p>
                                <p>Next :-{f.nextdate}</p>
                            </div>
                            <hr />
                        </li>
                    </ul>
                </div>
            ))
        }
      </>
    )}

  </div>
</div>

        {/* model end */}
    </div>
        
    
    </>
  )
}

export default Cviewenq