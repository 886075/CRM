import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Login from './Pages/Login';
import Admindash from './Admin/Admindash';
import Sidebar from './Component/Sidebar';


import Adviewenq from './Admin/Adviewenq';
import Adminlayout from './Admin/Adminlayout';
import Center from './Admin/Center';
import Visitor from './Admin/Visitor';
import Aduser from './Admin/Aduser';
import Userdash from './Admin/Userdash';
import Enqadd from './Admin/Enqadd';


import Mdash from './Manager/Mdash';
import Mlayout from './Manager/Mlayout';
import Mvisitor from './Manager/Mvisitor';
import Mviewenq from './Manager/Mviewenq';
import MCenter from './Manager/Mcenter';
import Menqadd from './Manager/Menqadd';
import Maduser from './Manager/Maduser';



// import Clayout from './Consular/clayout';
import Cdash from './Consular/Cdash';
import Cviewenq from './Consular/Cviewenq';
import Addenq from './Consular/Addenq';
import Cvisitor from './Consular/Cvisitor';
import CCenter from './Consular/Ccenter';
import Clayout from './Consular/Clayout';
import { ToastContainer } from 'react-toastify';
import Changepass from './Consular/Changepass';
import Profile from './Consular/Profile';
import Forget from './Pages/Forget';




function App() {

  return (
    <>
    <div className="container-fluid">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/login' element={<Login />} />
          <Route  path='/forgetpassword' element={<Forget/>}/>
          
          <Route path='/dashboard/' element={<Admindash />} >
            <Route path='' element={<Adminlayout />}/>
            <Route path='adviewenq' element={<Adviewenq />}/>
            <Route path='center' element={<Center />}/>
            <Route path='visitor' element={<Visitor />} />
            <Route path='user' element={<Aduser />}/>
            <Route path='userdash' element={<Userdash/>}/>
            <Route path='enqadd' element={<Enqadd/>}/>
          </Route>

            <Route path='/mdash/' element={<Mlayout/>}>
             <Route path='' element={<Mdash />}/>
             <Route path='adviewenq' element={<Mviewenq/>}/>
             <Route  path='visitor' element={<Mvisitor/>}/>
             <Route  path='center' element={<MCenter/>}/>
             <Route  path='enqadd' element={<Menqadd/>}/>
             <Route  path='user' element={<Maduser/>}/>
            </Route>


            <Route path='/cdash/' element={<Clayout/>}>
            <Route path='' element={<Cdash />}/>
            <Route path='adviewenq' element={<Cviewenq />}/>
            <Route  path='addenq' element={<Addenq/>}/>
            <Route  path='visitor' element={<Cvisitor/>}/>
            <Route  path='center' element={<CCenter/>}/>
            <Route path='changepassword' element={<Changepass/>} />
            <Route path='profile' element={<Profile/>} />

             
            </Route>

        </Routes>
      </BrowserRouter>

    </div>
    </>
  )
}

export default App
