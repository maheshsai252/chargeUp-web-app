import React, { useEffect, useState } from 'react'
import "../css/profile.scss";
import facebook from "../resources/facebook.png";
import instagram from "../resources/instagram.png";
import twitter from "../resources/twitter.png";
import snapchat from "../resources/snapchat.png";
import pinterest from "../resources/pinterest.png";
import pin from "../resources/pin.png";
import calender from "../resources/calender.png";
import mail from "../resources/mail.png";
import cover from "../resources/cover.jpg";
import profilepic from "../resources/profilepic.jpg";
import EventGrid from '../Events/Cards/EventGrid';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ActionCreators } from '../../App/actions/actionCreators';
import UploadImageToS3WithNativeSdk from '../Media/UploadFile';
import { fetchUser } from "../Login/LoginService";

export default function ProfileView({myEvents, user, setUser, events}) {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [ file, setFile] = useState([])
    const dispatch = useDispatch(); 
    const [status, setStatus] = useState("")
    useEffect(()=> {
        setName(user.name);setEmail(user.email);
    },[user])
    const updateUser = async () => {
        try {
            const res = await axios.post('/api/user/edit', {
                name: name,
                email: email,
                password: password.length !==0 ? password : "none",
                file: file.length!==0 ? file[0] : "none"
            });
            console.log("data",res.data);
          if(res["status"]===200 && res.data.length !== 0) {
            const user = {
              name: res.data.name,
              email: res.data.email,
              image: res.data.image
            }
            setName(res.data.name);setEmail(res.data.email);setFile([]);setPassword("");

            const res1 = await fetchUser(sessionStorage.getItem("userid"));
            console.log("data",res1);
            if(res1["status"]===200 && res1.data.length !== 0) {
                setUser(res1.data[0])
                
                console.log("session container", user, sessionStorage.getItem("userid"))
                dispatch(ActionCreators.login(user));
            }
            
            
        }
        } catch(error) {
            console.log(error)
            setStatus(error.response.data["message"])

        }
        
      }
    
    const handleEdit = (e) => {
        if(edit) {
            updateUser()
        } 
        setEdit(!edit);
        
    }

  return (
    <div>
         <div className="profile">
            <div className="imagesv">
                <img
                    src={cover}
                    alt=""
                    className="cover"
                />
               
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">

                    {
                   
                        user.file === undefined || user.file === 'none' ? 

                    <svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    :        
                    <img
                    src= {"https://chargeup.s3.amazonaws.com/"+user.file} 
                    style={{width: '150px',height:'150px', borderRadius: "50%", padding: '10px', border: '3px solid yellow'}}
                    alt=""
                    />
                    }
                   
                     
                       
                    </div>
                    <div className="center">

                        {
                            !edit ? <span>{user.name}</span> :

                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                        }
                        
                        <div className="info">
                            
                            <div className="item">
                                <img src={calender} alt='calender' />
                                <span>{events.length} Events</span>
                            </div>
                        </div>
                        <button onClick={(e) => {handleEdit(e)}} className="buttonv"> {edit ? "Done" : "Edit Profile"}</button>
                    </div>
                     <div className="right" style={{textAlign: "center"}}>
                        {/* <img src={mail} alt='mail' /> */}
                         <img style={{width: '40px', height: '40px'}} src={mail} alt=""/>
                         {edit ?  <input type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}} /> : <p style={{paddingTop: '10px'}}>{user.email}</p>}
                    </div> 
                </div>
            </div>
            <p className='status' > {status}</p>
            {/* <Posts/> */}
            {edit ?  <div> 
            <h2> New Profile Pic Upload</h2>
            <UploadImageToS3WithNativeSdk  files={file} setSelectedFiles={setFile}/>
            <br />
            <h2> Password Update</h2>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <br />
            
            </div>
                        : <p></p>}
            <div className="Events">
                <h2>Find Your Attended Events Below</h2>
            </div>
            {/* <EventGrid events={events} /> */}
            <div className="Events">
                <h2>Manage Your Events</h2>
            </div>
            <EventGrid events={myEvents} />
        </div>

    </div>
  )
}
