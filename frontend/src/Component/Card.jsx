import React from 'react'

function Card(p) {
  return (
    <>
        <div className='card'>
            <div className='txt'>
                <i className="fa-solid fa-location-dot"></i>  {p.head}
            </div>
            <hr style={{margin:"7px 0;"}} />
            <div className='txt-p'>
                <p>
                        {p.par}
                        <br />
                        
                        {p.par1}
                        <br />
                        {p.par2}
                </p>
            </div>
            <div className='txt-mob'>
                <strong>{p.str}</strong>
            </div>
        </div>
    
    </>
  )
}

export default Card