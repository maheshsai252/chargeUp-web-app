import React, { Component } from "react";
import { Link } from "react-router-dom";
import {signup} from './LoginService';
import { useDispatch } from 'react-redux'
import { ActionCreators } from '../actions/actionCreators';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UploadImageToS3WithNativeSdk from "../Media/UploadFile";
function SignUpForm() {
  const [email, setemail] = useState();
  const [name, setName] = useState();

    const [password, setPassword] = useState();
    const [status, setStatus] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
  const [file,setFile] = useState([]);
  

   const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    e.preventDefault();
      // setemail(JSON.stringify(credentials));
      const response = await signup(name, email,password, file);
      console.log(response.data);
      if(response["status"]===200) {
          const user = {
              email: response.data["email"],
              name: response.data["name"]
          }
          dispatch(ActionCreators.login(user));
          sessionStorage.setItem('token', JSON.stringify(response.data["name"]));
          sessionStorage.setItem('userid', response.data["id"]);
          // console.log('location', state);
          // if(props.from === undefined) {
            navigate('/');
          // }
          // navigate('/');

      } else {
        setStatus(response["id"]);
      }
  }

  
    return (
      <div className="formCenter">
        <form onSubmit={handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="formFieldInput"
              placeholder="Enter your full name"
              name="name"
              value={name}
            
              onChange= {(e) => {setName(e.target.value)}}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange= {(e) => {setPassword(e.target.value)}}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange= {(e) => {setemail(e.target.value)}}            />
          </div>
          <UploadImageToS3WithNativeSdk  files={file} setSelectedFiles={setFile}/>
          <br />

          {
            file.length !==0 ?  
            <img style={{borderRadius: '50%', width: '150px', height: '150px'}} src= {"https://chargeup.s3.amazonaws.com/"+file[0]} alt='lol'/>
            : <p></p>
          }
          <br />

         {
          file.length > 1 ? <p className="status"> Only 1 allowed</p> : <p></p>
         }
         <br />
          <p className='status'><b>{status}</b></p>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/login" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    );
}
export default SignUpForm;
