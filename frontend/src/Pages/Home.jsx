import React, { useEffect } from 'react'
import Navbar from '../Component/Navbar'
import Card from '../Component/Card'
import Footer from '../Component/Footer'
import { useState } from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
import Swal from "sweetalert2"



function Home() {
  const [fullName , setfullName] = useState('');
  const [college , setcollge] = useState('');
  const [course , setcourse] = useState('');
  const [branch , setbranch] = useState('');
  const [year , setyear] = useState('');
  const [email,setemail] = useState('');
  const [contactNumber , setcontactNumber] = useState('');
  const [purpose , setpurpose] = useState('');
  const [role , setrole] = useState('student');
  const [center , setcenter] = useState('');
  const [address, setaddress] = useState('');
  const [remark,setremark] = useState('');
  const [status , setstatus] = useState('u');
  // for dynamic center
  const [centerList, setCenterList] = useState([]);


  const addEnq = async (e) => {
  e.preventDefault();

  //  STUDENT
  if (role === "student") {
    const res = await axios.post("http://localhost:5000/api/enq", {
      fullName, college, course, branch, year,
      email, contactNumber, purpose, role, center, status
    });

    if (res.data.msg === "sucess") {
      // alert("Saved");
      // toast.success('Form Submited')
      Swal.fire({
      title: "Form Submit SucessFull",
      icon: "success",
      draggable: true
    });

    } else {
      toast.error('Form Submited')
    } 
   }

  // VISITOR OFFICIAL
  else if (role === "visitor_official") {
    const res = await axios.post("http://localhost:5000/api/visitor", {
      fullName,
      email,
      contactNumber,
      purpose,
      remark,
      role,
      center
    });

    if (res.data.msg === "sucess") {
      toast.success('Form Submited')
    } else {
      toast.error('Form Submited')
    }
  }

  // reset
  setfullName('');
  setcollge('');
  setcourse('');
  setbranch('');
  setyear('');
  setemail('');
  setcontactNumber('');
  setpurpose('');
  setrole('student');
  setcenter('');
  setaddress('');
  setremark('');
  setstatus('u');
};


// for dynamic center
  const getCenters = async () => {
    const res = await axios.get("http://localhost:5000/api/center");

    if (res.data.msg === "sucess") {
      setCenterList(res.data.center);
    }
  };

  useEffect(() => {
    getCenters();
  }, []);





  return (
    <>
      <Navbar />

      <div className="container">
        <div class="row mt-5 shadow " id='main'>
           <div className="col-lg-4 col-md-5 col-12 order-2 order-md-1 ps-4">
                <h5 className='ps-2 mt-4 fw-bold'>Contact Us</h5>
                <div className='icon'>
                  <i className="fa-solid fa-phone-volume fa-shake"></i>  Call: +91 7080102006, 7080462022
                      <br />
                  <i class="fa-solid fa-envelope fa-bounce"></i>  Email: hr@softproindia.in
                </div>
                {/* card */}
                <Card head=' Softpro Head Office' par='Softpro Tower, Near New Hanuman Temple, Kapoorthala, Aliganj,' par1='Lucknow - 226006.' str='Mobile Number: +91 7080102007' />
                {/* card 2 */}
                <Card head='  Softpro House Lucknow' par='3/213, Sector J, Jankipuram, Kursi Rd,' par1='Near Gudamba Thana, Lucknow' par2='Uttar Pradesh-226026.' str='Mobile Number:  +91 7080462022' />
                {/* card 3 */}
                <Card head='  Softpro Full Stack Academy' par='1/6, Vastu Khand, Gomtinagar,' par1='Lucknow -226010.'  str='Mobile Number:   +91 7080422022' />
                {/* card 4 */}
                <Card head='  Softpro Noida Office' par='Creatons Business Park,' par1='Ground Floor, H - 35, Sec 63,' par2='Noida Gautam Buddha Nagar, UP - 201301.' str='Mobile Number:   +91 7080102006' />
            </div>
            <div className="col-lg-8 col-md-7 col-12 order-1 order-md-2 ps-4 mt-4 mb-5">

              <form action="" onSubmit={addEnq}  >

              <div id='right-b'>
              <div className='right'>
                  <div className='enquiry-form pt-4 p-3'>
                    <span><i className="fa-regular fa-comment-dots fs-3"></i> <span id='enq'>Enquiry Form</span>  </span>
                      <hr />
                      <label htmlFor="" className='ms-3'>You are a ?</label>
                      <div className='input-icon'>
                        <i className="fa-solid fa-table-cells-large"></i>
                          <select  value={role} onChange={(e)=>{setrole(e.target.value)}}>
                            <option value="student">Student</option>
                            <option value="visitor_official">Visitor (Official)</option>
                            <option value="visitor_personal">Visitor (Personal)</option>
                          </select>
                      </div>
                      {/* 2 form */}
                      <label htmlFor="" className='ms-3'>You are at ?</label>
                      <div className='input-icon'>
                        <i className="fa-solid fa-table-cells-large"></i>
                          <select value={center} onChange={(e)=>setcenter(e.target.value)}>
                            <option value="">-- Select Center --</option>
                            {
                              centerList.map((c) => (
                                <option key={c._id} value={c.name}>{c.name}</option>
                              ))
                            }
                          </select>
                      </div>
                  </div>
                  <hr />
              </div>
              {/* 3 section after 2 */}
                <div className='stuinfo shadow'>
                  Student Information
                </div>
                {role === 'student' && (
                  
                  <>
                  <div className="row mt-2 p-3">
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Full Name</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-user"></i>
                          <input type="text" value={fullName} onChange={(e)=>setfullName(e.target.value)} placeholder='e.g., Ashutosh Parmar' />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>College</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-building"></i>
                          <input type="text" value={college} onChange={(e)=>{setcollge(e.target.value)}} placeholder='Your College Name' />
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="row p-3">
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Course</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-graduation-cap"></i>
                          <input type="text" value={course} onChange={(e)=>setcourse(e.target.value)} placeholder='e.g., B.Tech / BCA / MCA' />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Branch</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-sitemap"></i>
                          <input type="text" value={branch} onChange={(e)=>setbranch(e.target.value)} placeholder='e.g., CSE / IT / ECE' />
                      </div>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="row p-3">
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Year</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-calendar"></i>
                          <input type="text" value={year} onChange={(e)=>setyear(e.target.value)} placeholder='e.g., 2nd Year"' />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Contact Number </label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-phone"></i>
                          <input type="tel" value={contactNumber} onChange={(e)=>setcontactNumber(e.target.value)} placeholder='10-digit mobile' />
                      </div>
                    </div>
                  </div>
                  {/* 4 */}
                  <div className="row p-3">
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Email</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-envelope"></i>
                          <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='e.g., 2nd Year"' />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Purpose </label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-list-check"></i>
                          <select name="" id="" value={purpose} onChange={(e)=>setpurpose(e.target.value)}>
                            <option >- Select Purpose -</option>
                            <option >Enquiry</option>
                            <option >Registration </option>
                            <option >Reporting</option>
                            <option >Certificate Work</option>
                          </select>
                      </div>
                    </div>
                  </div>
                  </>
                )}
                    {/* send form visiter offical */}
                {role === 'visitor_official' && (
                    
                  <>
                  <div className="row p-3">
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Name</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-calendar"></i>
                          <input type="text" value={fullName} onChange={(e)=>setfullName(e.target.value)} placeholder='e.g., Visiter Name' />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Contact Number </label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-phone"></i>
                          <input type="tel" value={contactNumber} onChange={(e)=>setcontactNumber(e.target.value)} placeholder='10-digit mobile' />
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                    <div className="row p-3">
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Email</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-envelope"></i>
                          <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='e.g., Enter Your Email"' />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Purpose </label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-list-check"></i>
                          <select value={purpose} onChange={(e)=>setpurpose(e.target.value)}>
                            <option >- Select Purpose -</option>
                            <option >Enquiry</option>
                            <option >Registration </option>
                            <option >Reporting</option>
                            <option >Certificate Work</option>
                          </select>
                      </div>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="row">
                      <div className="col-md-12 col-12">
                      <label htmlFor="" className='ms-3'>Remark</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-envelope"></i>
                          <input type="text" value={remark} onChange={(e)=>setremark(e.target.value)} placeholder='e.g., Any Remark ( Optional )"' />
                      </div>
                    </div>
                  </div>
                  </>
                  )}
                  {/* 3 visitor personal */}
                  {role === 'visitor_personal' && (
                    <>
                    <div className="row p-3">
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Name</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-calendar"></i>
                          <input type="text" value={year} onChange={(e)=>setyear(e.target.value)} placeholder='e.g., Visiter Name' />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <label htmlFor="" className='ms-3'>Contact Number </label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-phone"></i>
                          <input type="tel" value={contactNumber} onChange={(e)=>setcontactNumber(e.target.value)} placeholder='10-digit mobile' />
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                      <div className="row">
                      <div className="col-md-12 col-12">
                      <label htmlFor="" className='ms-3'>Address</label>
                      <div className='input-icon'>
                        <i class="fa-solid fa-envelope"></i>
                          <input type="text" value={address} onChange={(e)=>setaddress(e.target.value)} placeholder='e.g., Visitor Address' />
                      </div>
                    </div>
                  </div> 
                  </>                 
                  )}
                    {/* end */}






                  <div className="row">
                    <div className="col-md-12 col-12  d-flex justify-content-end pe-4 mb-2 ">
                      <button type='submit' className='btn btn-custom'  >
                          <i class="fa-solid fa-paper-plane"></i> Submit Details
                      </button>
                    </div>
                  </div>


              </div>

              </form>
              {/* form end */}

             
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home