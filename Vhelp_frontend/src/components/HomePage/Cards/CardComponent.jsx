import React from 'react'
import './cards.css'
import Details from './CardDetails'
import image from './tasker.png'
const CardComponent = () => {
  return (
    <div>
      <div>
        <img src={image} className='w-100' alt="dfsd"></img>
      </div>
      <h1 className='heading text-center text-light'>Our Services</h1>
      <div className='card-con'>
        {Details.map(
          (curElem) => {
            return (
              <div className=" order order-lg-2 card--main text-center border border-primary shadow-4" key={curElem.id}>
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src={curElem.image} className="img-fluid" />
                  <a href="#!">
                    <div className="mask" ></div>
                  </a>
                </div>
                <div className="card-header text-light card-head">{curElem.heading}</div>
                <div className="card-body">
                  <p className="card-text">
                    {curElem.bio}
                  </p>
                </div>
              </div>
            )
          }
        )}
      </div>
      <hr></hr>
      <hr></hr>
    </div>
  )
}

export default CardComponent