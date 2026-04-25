import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Adviewenq() {
    const [user,setEnq] = useState([]);
    const [users,setUsers] = useState([]);
    // for filter
    const [filteruser,setfilteruser] = useState([]);

    // followup
    const [filterfollow,setfilterfollow] = useState([]);

    const [uid ,setUid] = useState('');
    const [rem,setRem] = useState('');
    const [editId,setEditId] =useState(null);

    const getenq = async()=>{
        const res = await axios.get('http://localhost:5000/api/enq')
        if(res.data.msg=="sucess"){
            setEnq(res.data.enq)
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
        const data ={"assignto":uid,"assignby":localStorage.getItem('admin'),assigndate:d};
        const res = await axios.put(`http://localhost:5000/api/enq/${editId}`,data);
        console.log(res);
        // for data assign
        const assigndata = {enqid:editId,assignto:uid,assignby: localStorage.getItem("admin"),assignbyModel:'user',remark:rem};
        const res2 = await axios.post(`http://localhost:5000/api/assign`,assigndata);
        console.log(res2);
        if(res.data.msg=="Update" && res2.data.msg=="success"){
            // console.log(user)
            window.alert("update data");
            setUid('');
            setEditId(null);
            setRem('');
            // getenq();
        }
        // if(res.data.msg=="Update"){
        //     console.log(user)
        //     window.alert("update data");
        //     setUid('');
        //     setEditId('');
        //     setRem('');
        //     getenq();
        // }
    }


    // new assignfun

    const assignfun=(e)=>{
        console.log(e);
        setEditId(e._id);
        var fu = users.filter((u)=>{
            if(e.assignto && e.assignto._id == u._id){
                return false
            }
            else{
                return u.center == e.center && u.status=="u";
            }
        })
        setfilteruser(fu);
    }

    //
    const [selectedEnq , setSelectedEnq]=useState('')
    const handleRowClick = (data) => {
    setSelectedEnq(data);
    setEditId(data._id);

    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal1'));
        getfollowup(data._id)
    modal.show();
    };


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
                    <tr key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }} >
                        <td>{i+1}</td>
                    <td>{e.createdAt.split("T")[0]}</td>
                    <td>
                    <div className='d-flex gap-2'>

                
                    <a href={`https://api.whatsapp.com/send?phone=${e.contactNumber}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success"onClick={(event) => {event.stopPropagation();window.open(`https://api.whatsapp.com/send?phone=${e.contactNumber}`,"_blank");}}>WA</a>

                    <button className='btn btn-info' onClick={(e)=>e.stopPropagation()}>Copy</button>
                        <div class="dropdown d-inline">
                        <button class="btn btn-secondary " onClick={(e)=>e.stopPropagation()} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu"  >
                            <li><a class="dropdown-item" href="#"><button className='btn' onClick={() => adviewdel(e._id)}  ><i className="fa fa-trash" ></i>
                        </button></a></li>
                            {
                                e.status=="u" &&
                           
                            <li><a class="dropdown-item"><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={(c)=>{assignfun(e);c.stopPropagation();}}>Assign</button>
                            </a></li>
                             }

                            <li><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#enquiryModal">
                            Enquire
                            </button></li>
                            
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
                                <option key={u._id}  value={u._id} > {u.name} <b><i>{u.role=="manger"?"(m)":"(c)"}</i></b> </option>
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
        {/* modal 2nd for Enquire */}
            {/* <!-- Button trigger modal --> */}
            
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1">
  <div className="modal-dialog modal-xl modal-dialog-centered">
    <div className="modal-content">

      {/* HEADER */}
      <div className="modal-header">
        <div>
          <h5 className="modal-title">
            Enquiry #{selectedEnq?._id?.slice(-4)} - {selectedEnq?.fullName}
          </h5>
          <small className="text-muted">
            {selectedEnq?.course} • {selectedEnq?.center}
          </small>
        </div>
        <button className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* FILTER SECTION */}
      <div className="px-3 pt-2 d-flex gap-2">
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
        <button className="btn btn-warning">Apply Date Filter</button>
        <button className="btn btn-outline-secondary">Reset</button>
      </div>

      {/* STATUS CARDS */}
      <div className="row px-3 mt-3">
        <div className="col-md-3">
          <div className="card p-2">
            <small>Assigned To</small>
            <b>{selectedEnq?.assignto?.name || "Not Assigned"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Status</small>
            <b>{selectedEnq?.status || "New"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Next Follow-up</small>
            <b>{selectedEnq?.nextfollowupdate || "-"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Total Followups</small>
            <b>0</b>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="row p-3">

        {/* LEFT SIDE - USER INFO */}
        <div className="col-md-5">
          <div className="card p-3">
            <h5>
              {selectedEnq?.fullName}
              <span className="badge bg-warning ms-2">New</span>
            </h5>

            <hr />

            <p><b>Mobile:</b> {selectedEnq?.contactNumber}</p>
            <p><b>Email:</b> {selectedEnq?.email}</p>
            <p><b>Course:</b> {selectedEnq?.course}</p>
            <p><b>Center:</b> {selectedEnq?.center}</p>
            <p><b>Created:</b> {selectedEnq?.createdAt?.split("T")[0]}</p>

            <div className="d-flex gap-2 mt-3">
              <a
                href={`tel:${selectedEnq?.contactNumber}`}
                className="btn btn-outline-primary w-50"
              >
                Call
              </a>

              <a
                href={`https://api.whatsapp.com/send/?phone=${selectedEnq?.contactNumber}`}
                target="_blank"
                className="btn btn-outline-success w-50"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - TIMELINE */}
        <div className="col-md-7">
          <div className="card p-3">
            <div className="d-flex justify-content-between">
              <h6>Follow-up Timeline</h6>
              <button className="btn btn-sm btn-outline-secondary">Refresh</button>
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
          </div>
        </div>

      </div>

      {/* ASSIGN SECTION */}
      <form onSubmit={updateEnq}>
        <div className="p-3 border-top">

          <div className="row">
            <div className="col-md-6">
              <label>Assign To</label>
              <select
                className="form-control"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              >
                <option value="">-- Not Assigned --</option>
                {user.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label>Note</label>
              <textarea
                className="form-control"
                value={rem}
                onChange={(e) => setRem(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Assign Enquiry
            </button>
          </div>

        </div>
      </form>

    </div>
  </div>
</div>
        {/* end */}
    </div>
        
    
    </>
  )
}

export default Adviewenq