import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Adminlayout() {


  const [enq, setEnq] = useState([]);
  const [cen, setCen]=useState([]);
  const [foll,setFollow]=useState([]);
  const [tfol,setTfol]=useState(0);

// for enquire
const getenq = async () => {
  const res = await axios.get('http://localhost:5000/api/enq');

  if (res.data.msg === 'sucess') {
    setEnq(res.data.enq); 
  }
};

useEffect(() => {
  getenq();
}, []);

//center
const getcen = async () =>{
  const res = await axios.get('http://localhost:5000/api/center');

  if(res.data.msg === 'sucess'){
    setCen(res.data.center);
  }
};

useEffect(()=>{
  getcen();
},[]);

//followup
const getfollow = async () =>{
  const res = await axios.get('http://localhost:5000/api/followup');

  if(res.data.msg === 'sucess'){
    setFollow(res.data.followup);
  }
  // tody follow-up
  const todayfollowup = res.data.followup.filter((e)=>new Date(e.createdAt).toDateString() == new Date().toDateString()).length;
  setTfol(todayfollowup);
  
};

useEffect(()=>{
  getfollow();
},[]);


const name = localStorage.getItem('name'); // for admin name dynamic






  return (
    <>
        <div className="row bg-white shadow" id='dashbord'>
            <div className="col-sm-4">
              <h5>Complete Reports</h5>
              <span>Quick snapshot of progress  - what you did & what's Next</span>
            </div>
            <div className="col-sm-2">
              <select name="" id="">
                <option value="">2026</option>
                <option value="">2025</option>
                <option value="">2024</option>
                <option value="">2023</option>
              </select>
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-5">
              <div className='d-lg-flex gap-3 datt'>
                <input type="date" />
                <input type="date" />
                <button className='btn btn-da'>Apply</button>
                <button className='btn btn-daa'> Reset</button>
              </div>
              
            </div>
        </div>

        {/* 3 */}

        <div className="row" id='dashbord'>
          <div className="col-sm-7 shadow rounded-4 p-4">
            <div className="header">
              <div>
                <h5>{name}(Admin)</h5>
                <h2>Overview</h2>
                <h1>{enq.length}<span>enquiries</span></h1>
              </div>

              <div className="progress-box">
                <p>Assigned - <b>3</b></p>

                <div className="progress">
                  <div className="progress-fill"></div>
                </div>

                <small>12% assigned</small>
              </div>
            </div>
            {/* card */}
            <div className="cards">
              <div className="card shadow">
                <p>Today's follow-ups</p>
                <h3>{tfol}</h3>
                <span className="red">Overdue: 2</span>
              </div>
              <div className="card shadow">
                <p>Workshop students</p>
                <h3>0</h3>
                <span>Recent: 0</span>
              </div>
              <div className="card shadow">
                <p>Registered</p>
                <h3>2</h3>
                <span>Total conversions</span>
              </div>
              <div className="card shadow">
                <p>Centers</p>
                <h3>{cen.length}</h3>
                <span>Active centers</span>
              </div>
            </div>
          </div>
          <div className="col-sm-4 shadow rounded-4" id='daa'>
            <div className="action-card">
              <div className="header">
                <h3>Action Items</h3>
                <span>What to do next</span>
              </div>
              {/*  */}
              <div className="item">
                <span className="badge">Leads</span>
                <div className="text">
                  <b>3 assigned</b>
                  <p>Assigned across your centers</p>
                </div>
                <button className="btn">View Enquiries</button>
              </div>
              {/*  */}
              <div className="item">
                <span className="badge">Today</span>
                <div className="text">
                  <b>0 calls due</b>
                  <p>Prioritise overdue first</p>
                </div>
                <button className="btn orange">Start Calls</button>
              </div>
              {/* 3 */}
              <div className="item">
                <span className="badge">Today</span>
                <div className="text">
                  <b>0 calls due</b>
                  <p>Prioritise overdue first</p>
                </div>
                <button className="btn orange">Start Calls</button>
              </div>

            </div>
          </div>
        </div>

        <div className="row" id='dashbord'>
          <div className="col-sm-12">
            <h5>Center</h5>
          </div>
        </div>

        {/* 4 */}
        <div className="row " >
          {
            cen.map((c)=>(
          <div className="col-sm-3  rounded-3 p-3">
            <div className='border p-2 rounded-3'>
            <div className="card-header">
              <div className="title-area">
                <h4>{c.name} <br /> {c.address}</h4>
              </div>

              <div className='close'>
                <p>Closed</p>
                <b> 0</b>
                <p>(0%))</p>
              </div>

              <div className="circle">
                <span className="percent">0%</span>
              </div>

            </div>
            <div className="stats">
              <div className="stat-box">
                <b></b>
                <span><b>{enq.filter((e)=>e.assignto && e.center == c.name).length}</b></span>
                <span>Assigned to</span>

              </div>

              <div className="stat-box">
                <b>{foll.filter((e)=>e.enqid && e.enqid.center === c.name).length}</b>
                <span>Follow-ups</span>
              </div>

              <div className="stat-box red">
                <b>{enq.length}</b>
                <span>Enquiries</span>
              </div>
            </div>
            <div className="tab-group">
              <button className="btn-active">Open Enquiries</button>
              <button className="btn-inactive">Timeline</button>
            </div>
            <div className="content-placeholder">
              {
                foll.map((f)=>(
                f.enqid.center==c.name &&   <div className="item">
                <span className="badge">Today</span>
                <div className="text">
                  <b>{f.uid.name}</b>
                  <p>{f.remark}</p>
                </div>
                <button className="btn orange">Start Calls</button>
              </div>
                ))
              }
            </div>
            </div>
          </div>
            ))
          }
         

        </div>

      
    
    </>
  )
}

export default Adminlayout