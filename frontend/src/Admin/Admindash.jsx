import React from 'react'
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Admindash() {

const navigate = useNavigate();

function logout(){
    localStorage.removeItem('admin')
    navigate('/login')
    toast.success('Logout Sucessfull')
}


    function validate(){
        if(!localStorage.getItem('admin')){
          toast.error('Please Login')
            navigate('/login')
        }
    }

    useEffect(()=>{
        validate()
    },[])



  return (
    <>
        <div className="row bg-white " id='dashbord'>
            <div className="col-sm-11" >
              <button className="brnoff" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa-solid fa-bars"></i></button>

                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                  <div className="offcanvas-header">
                   <p className='text-center w-100'> <img src="/src/assets/spilogo.png" alt="" /></p>
                    <button type="button" className="btn-close mb-5 me-4 " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                     <ul>
                      <li><Link to={''}><i className="fa-solid fa-chart-line text-danger"></i> Dashboard</Link></li>
                      <li><Link to={'visitor'}><i className="fa-solid fa-people-group text-danger"></i> Visitors </Link></li>

                      <li><Link to={'adviewenq'}><i class="fa-solid fa-comment-dots text-danger"></i>Enquiries</Link></li>
                      
                      <li><Link to={'center'}><i class="fa-solid fa-building-circle-arrow-right text-danger"></i>Center</Link></li>
                      <li><Link to={'enqadd'}><i class="fa-solid fa-comment-dots text-danger"></i> Add Enquiries</Link></li>
                      <li><Link to={'user'}><i class="fa-regular fa-circle-user text-danger"></i> user</Link></li>
                      <button className='offbtn' onClick={logout}>logout</button>
                      <div className='text-center  mt-2'>
                          {localStorage.getItem('role') && (
                              <p>Logged in as: {localStorage.getItem('role')}</p>
                          )}
                      </div>
                     </ul>
                  </div>
                </div>
              <i className="fa-solid fa-bell"></i>
            </div>
            {/* profile */}
            <div className="col-sm-1" >
              <div class="dropdown ">
              <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">             
                <img src="/src/assets/dash.png" alt=""  id='admin-logo' />
              </button>
              <ul class="dropdown-menu border-warning">
                <li><Link class="dropdown-item" href="#"><i class="fa-regular fa-address-card text-warning me-3"></i> Profile</Link></li>
                <li><Link class="dropdown-item " href="#" to={'/changepassword'}><i class="fa-solid fa-key text-warning me-2"></i> Change Password</Link></li>
                <li><button className='btn' onClick={logout}><i class="fa-solid fa-arrow-right-from-bracket me-2 text-warning"></i> logout</button></li>
              </ul>
            </div>
              {/* <img src="/src/assets/dash.png" alt=""  id='admin-logo' /> */}
            </div>
        </div>
        {/* 2 */}
        <Outlet/>
        
         
    
    </>
  )
}

export default Admindash