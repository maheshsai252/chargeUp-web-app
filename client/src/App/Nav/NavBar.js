import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import PersonComponent from './PersonComponent';
import {useSelector} from 'react-redux';

export default function NavBar() {
    const tab = useSelector((state) => {
        console.log(state.tab,"tab state");
        return state.tab.tab;
      });
  return (
    <div>
        <nav className="navbar sticky-top navbar-dark bg-black navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">chargEup</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              
              <li className="nav-item">
              <button className='nav-button'>  
              <a href="/createEvent" style={{textDecoration: "none"}}> Create Event</a>
               
              </button>
                {/* <a className={`nav-link ${tab==="Home" ? "active" : ""}`} aria-current="page" href="/">Home</a> */}
              </li>
              <li className="nav-item">
              {/* <button className='nav-button'>          
              <i className="fas fa-ticket-simple"></i>
             </button> */}
                {/* <a className={`nav-link ${tab==="Home" ? "active" : ""}`} aria-current="page" href="/">Home</a> */}
              </li>
              <li className="nav-item">
                <button className="nav-link nav-button" >
                 <a style={{textDecoration: 'none'}} href="/search">Search</a> <i class="fas fa-magnifying-glass"></i>
                 </button>
                  {/* <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search" /> */}
                  {/* <button className=" ">Search</button> */}
              </li>
              <PersonComponent />
             
                        
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  )
}
