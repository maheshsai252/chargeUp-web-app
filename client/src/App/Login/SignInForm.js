import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ActionCreators } from '../actions/actionCreators';
import SignInWithGoogle from './SignInWithGoogle';
import {signin} from './LoginService';

export default function SignInForm(props) {
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const handleSubmit = async e => {
      e.preventDefault();
      // setemail(JSON.stringify(credentials));
      const response = await signin(email,password);
      console.log(response.data);
      if(response["status"]===200) {
          const user = {
              email: response.data["email"],
              name: response.data["name"],
              image: response.data["image"]
          }
          dispatch(ActionCreators.login(user));
          sessionStorage.setItem('token', JSON.stringify(response.data["name"]));
          sessionStorage.setItem('userid', response.data["id"]);
          console.log(props.from,"coming from");
          console.log('location', state);
          if(props.from === undefined) {
            navigate('/');
          }
          // navigate('/');

      } else {
        setStatus(response["id"]);
      }
      // setToken(token);
    }

  
    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={handleSubmit}>
          <div className="formField">
            <label style={{textAlign: "left", marginLeft: '20px'}} className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={e => setemail(e.target.value)}
              style={{backgroundColor: "transparent", color: "white"}}
            />
          </div>

          <div className="formField">
            <label style={{textAlign: "left", marginLeft: '20px'}} className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <p className='status'><b>{status}</b></p>

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/sign-up" className="formFieldLink">
              Create an account
            </Link>
          </div>

          <div className="socialMediaButtons">
            <div className="facebookButton">
            <SignInWithGoogle />

              {/* <GoogleLoginButton onClick={() => alert("Hello")} /> */}
            </div>

          
          </div>
        </form>
      </div>
    );
  
}

