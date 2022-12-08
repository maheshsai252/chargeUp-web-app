import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import avatar from '../resources/avatar-2.jpg';
import mail from '../resources/mail.png';
export default function AdminUsersListView() {
    const [users,setUsers] = useState([]);
    useEffect(() => {
        
    
        getUsers();
    })
    const getUsers = async () => {
        try {
            const response = await axios.post('/api/user/getAll/',{
            
            });
            if(response.status===200) {
                setUsers(response.data);
             } 
             console.log(response.data,"gotten");
        } catch (error) {
            console.log(error, "error")
        }
        
       
        
    }
    const deleteUser = async () => {
        const response = await axios.post('/api/user/delete',{
            
        });
        console.log( response.data,"gotten")
        if(response.status===200) {
           
        } else {
            
        }
        getUsers();
    }
  return (
 
    <div>
    {
        users.length === 0 ? <p> Loading </p> :
           <ul style={{listStyle: 'none'}}>
    {
            users.map((reg) => {
                
                return <div style={{margin: '15px', display: 'flex', alignItems: 'center'}}>
                {
            reg.file === 'none' ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            :        
              <img style={{width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px'}} src= {"https://chargeup.s3.amazonaws.com/"+reg.file} alt='lol'/>

          }
                    <p style={{marginLeft: '20px', fontWeight: "bolder"}}> {reg.name }</p>
                    {/* <a href = {"mailto:"+reg.email} style={{marginLeft: '40px', fontWeight: "bolder"}}> <img style={{width: '40px', height: '40px'}} src={mail} alt=""/></a> */}
                    <button onClick={deleteUser} style={{color: "red", marginLeft: "30px"}}>Delete </button>
                </div>
            })
        }
    </ul>
    }
    </div>
  )


   
}
