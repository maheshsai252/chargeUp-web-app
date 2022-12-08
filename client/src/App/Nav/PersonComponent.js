import React from 'react'
import { useSelector } from 'react-redux'
import { signout } from '../Login/LoginService';
import { useNavigate } from "react-router-dom";

export default function PersonComponent() {
const user = useSelector((state) => {
    console.log(state, "high");
    return state.user.profile;
});
       return ( 
       <div>
       {user.email.length === 0 ? 
             <List /> :
             <LoggedIn user={user}/>
            
       }
       </div>);
       
        
        
    }
//   return (
//     <div>  

       

//     </div>
//   )

function List() {
    return (
        <div>
            <li className="nav-item">
                <a className="nav-link" href="/login"> Login </a>
            </li>
        </div>
    )
}

function LoggedIn(props) {
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await signout();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userid");
        console.log(response);
        navigate('/');
        window.location.reload();
    }
    const navigate = useNavigate();

    return (<div>
    <li className="nav-item dropdown bg-dark">
        <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          </svg> */}
          
          {
            props.user.image=== undefined || props.user.image === 'none' ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          </svg>
            :        
            
              <img style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px'}} src= {"https://chargeup.s3.amazonaws.com/"+props.user.image} alt='lol'/>

          }
           {props.user.email}
        </a>
        <ul className="dropdown-menu">

          <li style={{backgroundColor: "transparent"}}><a className="dropdown-item" href="/myevents"> My Registrations</a></li>
          <li style={{backgroundColor: "transparent"}}><a className="dropdown-item" href="/profile"> My Profile</a></li>

        
          <button className="btn nav-button" type="submit" style={{color: 'red'}} onClick={handleSubmit}>Logout</button>
          
        </ul>
        </li>
        </div>);
}