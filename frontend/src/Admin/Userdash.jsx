import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Userdash() {

  
  return (
    <>
       <div className="row bg-white shadow" id='dashbord'>
            <div className="col-md-4 col-12 mb-3 mb-md-0">
              <h5>Complete Reports</h5>
              <span>Quick snapshot of progress  - what you did & what's Next</span>
            </div>
            <div className="col-md-2 col-6">
              <select name="" id="">
                <option value="">2026</option>
                <option value="">2025</option>
                <option value="">2024</option>
                <option value="">2023</option>
              </select>
            </div>
            {/* <div className="col-md-1"></div> */}
            <div className="col-md-6 col-6">
              <div className='d-flex flex-column flex-md-row gap-2 datt'>
                <input type="date" />
                <input type="date" />
                <button className='btn btn-da'>Apply</button>
                <button className='btn btn-daa'> Reset</button>
              </div>
              
            </div>
        </div>

         {/*  */}
        <div className="row" id='dashbord'>
          <div className=" col-12 col-lg-7 shadow rounded-4 p-4 ">
            <div className="header">
              <div>
                <p>Welcome, <b>User</b></p>
                <h2>Overview</h2>
                <h1>24 <span>enquiries</span></h1>
              </div>

              <div className="progress-box">
                <p>Assigned - <b>3</b></p>

                <div className="progress">
                  <div className="progress-fill"></div>
                </div>

                <mdall>12% assigned</mdall>
              </div>
            </div>
            {/* card */}
            <div className="cards">
              <div className="card shadow">
                <p>Today's follow-ups</p>
                <h3>0</h3>
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
                <h3>4</h3>
                <span>Active centers</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 shadow rounded-4 mt-3 mt-lg-0" id='daa'>
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

        {/*  */}
        <div className="row" id='dashbord'>
          <div className="col-md-12">
            <h5>Center</h5>
          </div>
        </div>

        <div className="row  justify-content-start ms-3">
          <div className="col-md-3 shadow p-3 rounded-3">
            <div className="card-header">
              <div className="title-area">
                <h4>Softpro Full Stack Academy, <br /> Gomtinagar, Lucknow</h4>
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
                <b>1</b>
                <span>Assigned</span>
              </div>

              <div className="stat-box">
                <b>0</b>
                <span>Follow-ups</span>
              </div>

              <div className="stat-box red">
                <b>8</b>
                <span>Enquiries</span>
              </div>
            </div>
            <div className="tab-group">
              <button className="btn-active">Open Enquiries</button>
              <button className="btn-inactive">Timeline</button>
            </div>
            <div className="content-placeholder">
              No recent follow-ups
            </div>
          </div>

          <div className="col-md-3"></div>
          <div className="col-md-3"></div>
        </div>
    </>
  )
}

export default Userdash