import React from 'react'
import Changepassword from '../Component/Changepassword';

function Changepass() {
  return (
    <div className="row">
        <div className='change border w-50 mx-auto rounded-3 p-5 shadow bg-light'>
            <h5 className='text-center'>Change Password</h5>
        <Changepassword  id={localStorage.getItem('cons')} role="cons" />

        </div>
    </div>
  )
}

export default Changepassword