import axios from 'axios';
import React, { useState } from 'react'

function Enqadd() {

      const [fullName , setfullName] = useState('');
      const [college , setcollge] = useState('');
      const [course , setcourse] = useState('');
      const [branch , setbranch] = useState('');
      const [year , setyear] = useState('');
      const [email,setemail] = useState('');
      const [contactNumber , setcontactNumber] = useState('');
      const [center , setcenter] = useState('');
      const [source,setsource] = useState('');
      const [program ,setprogram] =useState('');

    const eenqadd = async(e)=>{
        e.preventDefault();
        const addenq = {fullName,course,college,branch,year,email,contactNumber,center,source,program};
        const res = await axios.post('http://localhost:5000/api/enq',addenq)

        if(res.data.msg === "sucess"){
            window.alert('submit AddEnq data');
            setbranch('');
            setcenter('');
            setcenter('');
            setcollge('');
            setcontactNumber('');
            setcourse('');
            setemail('');
            setfullName('');
            setyear('');
            setsource('');
            setprogram('');

        }
        else{
            window.alert('not submit AddEnq data');
        }
    }

  return (
<>
    <div className="row">
        <div className="col-md-12">
            <div className='border fors p-5 rounded-4 shadow'>
            <form method='post' className='row g-3' onSubmit={eenqadd} >
                <h5 className='text-center'>Student Enquire</h5>
                <div className="col-md-6 form-floating">
                    <select className='form-select' value={center} onChange={(e)=>setcenter(e.target.value)}>
\                        <option>--Select Center---</option>
                        <option>Softpro Noida Office</option>
                        <option>Softpro Full Stack Academy, Gomtinagar, Lucknow </option>
                        <option>Softpro Full Stack Academy, Gomtinagar, Lucknow </option>
                        <option> Softpro Full Stack Academy, Gomtinagar, Lucknow </option>
                    </select>
                    <label htmlFor="floatInputValue" className='ps-4'>Select center</label>
                </div>
                <div className="col-md-6 form-floating">
                    <select className='form-select' value={source} onChange={(e)=>setsource(e.target.value)} >
                        <option >--Select---</option>
                        <option >Walk-in</option>
                        <option>Telephonic</option>
                        <option>Website</option>
                    </select>
                    <label htmlFor="floatInputValue" className='ps-4'>Source</label>
                </div>

                {/* full name */}
                <div className="col-md-6">
                    <input type="text" placeholder='Full Name' className='form-control' value={fullName} onChange={(e)=>setfullName(e.target.value)} />
                </div>
                {/* college */}
                <div className="col-md-6">
                    <input type="text" placeholder='College' className='form-control' value={college} onChange={(e)=>setcollge(e.target.value)}/>
                </div>
                {/* course */}
                <div className="col-md-6">
                    <input type="text" placeholder='Course' value={course} className='form-control' onChange={(e)=>setcourse(e.target.value)} />
                </div>
                {/* branch */}
                <div className="col-md-6">
                    <input type="text" placeholder='Branch' value={branch} className='form-control' onChange={(e)=>setbranch(e.target.value)} />
                </div>
                {/* year */}
                <div className="col-md-6">
                    <input type="year" placeholder='Year' value={year} className='form-control' onChange={(e)=>setyear(e.target.value)} />
                </div>
                {/* Contact Number */}
                <div className="col-md-6">
                    <input type="number" placeholder='Contact Number' value={contactNumber} className='form-control' onChange={(e)=>setcontactNumber(e.target.value)} />
                </div>
                {/* Email */}
                <div className="col-md-6">
                    <input type="email" placeholder='Email' value={email} className='form-control' onChange={(e)=>setemail(e.target.value)} />
                </div>
                {/* select Program */}
                <div className="col-md-6">
                    <select className='form-select mt-2' value={program} onChange={(e)=>setprogram(e.target.value)} >
                        <option>--Select Program----</option>
                        <option>Full Stack</option>
                        <option>Java Stack</option>
                        <option>Mern Stack</option>
                        <option>IOT</option>
                        <option>Python</option>
                    </select>
                </div>
                <div className="col-md-12 text-center">
                    <button className='btn btn-info sav' type='submit'>Save Enquiry</button>
                </div>
            </form>
            </div>
        </div>
    </div>


</> 
)
}

export default Enqadd