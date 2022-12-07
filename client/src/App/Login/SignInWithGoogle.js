import React, {useEffect, useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {signinWithGoogle} from './LoginService';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { ActionCreators } from '../actions/actionCreators';

export default function SignInWithGoogle() {
    const [ profile, setProfile ] = useState("");
    const navigate = useNavigate();
    const clientId = '85239687105-ah21d8g9oce9pjm31heftnas9mqp97sr.apps.googleusercontent.com';
     useEffect(() => {
            const initClient = () => {
                gapi.client.init({
                clientId: clientId,
                scope: ''
                });
            };
   
    gapi.load('client:auth2', initClient);
});
const onSuccess = async (res) => {
    console.log('success:', res);

    const response = await signinWithGoogle(res.profileObj.email,res.profileObj.name,res.profileObj.googleId);
    console.log(response.data);
        if(response["status"]===200) {
            const user = {
                email: response.data["email"],
                name: response.data["name"]
            }
            dispatch(ActionCreators.login(user));
            sessionStorage.setItem('token', response.data["name"]);
            sessionStorage.setItem('userid', response.data["id"]);

            navigate('/');

        } else {
          setProfile(response["id"]);
        }
    // setProfile(res.profileObj);
    console.log(profile);
};
const onFailure = (err) => {
    console.log('failed:', err);
};
const logOut = () => {
    setProfile(null);
};
const dispatch = useDispatch();
  return (
    <div>
        {profile}
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
      />
    </div>
  )
}
