import React from 'react'

import cemusicalfest from '../resources/cemusicfest.gif'
import cetheater from '../resources/cetheater.gif'
export default function EntryCarousel() {
  return (
    <div>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          
        </div>
        <div className="carousel-inner">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={cemusicalfest} alt="musicfest" />
            </div>
      
            <div className="carousel-item">
              <img src={cetheater} alt="game" />
            </div>
          
            <div className="carousel-item">
              {/* <img src="../../resources/cecarnival.gif" alt="nusan" style="width:100%;" />  */}
              
            </div>
           
          </div>
          
        </div>
       
      </div>
  </div>
  )
}
