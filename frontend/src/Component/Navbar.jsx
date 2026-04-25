import React from 'react'
import { Link, Navigate } from 'react-router-dom'

function Navbar() {

  return (
    <>
        <div className="row py-5" style={{backgroundColor:"#ff8c3c", borderRadius:'0px 0px 30px 30px'}}>
            <div className="col-sm-1"></div>
            <div className="col-sm-1 text-center">
                <img src="/src/assets/spilogo.png" alt="" id='spi-logo' />
            </div>
            <div className="col-sm-4">
              <h5 className='algin-item-center mt-3 pt-2 text-white fw-bold '>
                   Softpro India Computer Technologies (P) Ltd.
                </h5>
            </div>
            <div className="col-sm-4">
                <p className='iit mt-3 text-center p-2'>
                  A Company Founded by Technocrats from IIT & IET
                </p>
            </div>
            <div className="col-sm-1 text-center">
              <button className="btn btn-primary rounded-pill mt-4 shadow fw-bold">
              <Link to="/login" className="text-white text-decoration-none">
                  Login
              </Link>
            </button>
            </div>
            <div className="col-sm-1"></div>
        </div>

    </>
  )
}

export default Navbar