import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import {signin} from './LoginService';

import Map from '../Maps/Map'
import Payment from '../Registration/Payment';
import { connect } from 'react-redux';
import '../css/home.scss';
import { useNavigate, useLocation } from "react-router-dom";

import { ActionCreators } from '../actions/actionCreators';
import SignInWithGoogle from './SignInWithGoogle';
import Checkout from '../Registration/Checkout';
import { loadStripe } from "@stripe/stripe-js";
import UploadImageToS3WithNativeSdk from '../Media/UploadFile';
// import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "../Registration/PaymentForm"; // not implemented yet
const STRIPE_PUBLISHABLE = "pk_test_2XgFZYwKpyVZ9mDucI0LqdTQ00ZbMJF5Ae";

// const stripePromise = loadStripe(STRIPE_PUBLISHABLE);

const mapStateToProps = (state) => {
    return {
      profile: state.user.profile
    }
  }

  const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: -122.08427,
  }
function Loginv(props) {
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
    <div className="login-wrapper">
    <h1>Log In to chargEup</h1>
   

    
    <form onSubmit={handleSubmit}>
        <p className='status'><b>{status}</b></p>
        <label><b>Email</b></label>  
        <br />
        <input type="text" onChange={e => setemail(e.target.value)} />
        <br/>
      <label><b>Password</b></label>  
      <br/>
        <input type="password" onChange={e => setPassword(e.target.value)} />

      <div>
        <button className="loginbutton" type="submit"><b>Submit</b></button>
      </div>
    <br/>
    <SignInWithGoogle />
    </form>
  </div>
  )
}


// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   };
export default connect(mapStateToProps)(Loginv);



// import React, { Component } from 'react';
// import { withRouter} from "react-router-dom";
// // import { connect } from 'react-redux';
// import { ActionCreators } from '../actions/actionCreators';
// import { getStore } from '../utils';
// // import { useHistory } from "react-router-dom";

// export class Login extends Component {
//   constructor(props) {
//     super(props);
//     // const { history } = this.props;
//     this.state = {
//       username: '',
//       password: '',
//       errors: {
//         username: 'Enter User Name!',
//         password: 'Enter Password!'
//       },
//       loginStatus: '',
//       submitted: false
//     }
//   }

//   inputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//     this.validationErrorMessage(event);
//   }

//   validationErrorMessage = (event) => {
//     const { name, value } = event.target;
//     let errors = this.state.errors;
//     switch (name) {
//       case 'username': 
//         errors.username = value.length < 1 ? 'Enter User Name' : '';
//         break;
//       case 'password': 
//         errors.password = value.length < 1 ? 'Enter Password' : '';
//         break;
//       default:
//         break;
//     }
//     this.setState({ errors });
//   }

//   validateForm = (errors) => {
//     let valid = true;
//     console.log(errors)
//     Object.entries(errors).forEach(item => {
//       console.log(item)
//       item && item[1].length > 0 && (valid = false)
//     })
//     console.log(valid)
//     return valid;
//   }

//   loginForm = async (event) => {
//     event.preventDefault();
//     console.log(getStore('user'),"user");
//     console.log(this.state.errors, this.validateForm(this.state.errors));
//     this.setState({ submitted: true });
    
    
//     if (this.validateForm(this.state.errors)) {
//       console.info('Valid Form');
//       const user = getStore('user');
//       console.log("as",user);
//       if (!user) {
//         const response = await signin(user.email,user.password);
//         if(response["status"]===200) {
//             this.props.history.push('/home');

//         } else {
//             this.setState({ loginStatus: response["id"]})

//         //   setStatus(response["id"]);

//         }
//         this.props.dispatch(ActionCreators.login(user));
//       } else {
//         this.setState({ loginStatus: 'Login Failed! Invalid Username and Password'})
//       }
//     } else {
//       console.log('Invalid Form')
//     }
//   }

//   render() {
//     const { username, password, errors, submitted, loginStatus } = this.state;
//     return (
//       <div className="pagecenter loginForm">
//         <form>
//           <div className="row">
//             <div className="col-sm-3"></div>
//             <label htmlFor="username" className="col-sm-2 col-form-label">User Name:</label>
//             <div className="col-sm-3 mb-2">
//               <input type="text" value={username} name="username" onChange={(e) => { this.inputChange(e)} } className="form-control" id="username" placeholder="User Name" />
//               { submitted && errors.username.length > 0 &&  <span className='error'>{errors.username}</span>}
//             </div>
//             <div className="col-sm-4">
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-3"></div>
//             <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
//             <div className="col-sm-3 mb-2">
//               <input type="password" value={password} autoComplete="on" name="password" onChange={(e) => { this.inputChange(e)} } className="form-control" id="password" placeholder="Password" />
//               { submitted && errors.password.length > 0 &&  <span className='error'>{errors.password}</span>}
//             </div>
//             <div className="col-sm-4"></div>
//           </div>
//           <div className="row">
//             <div className="col-sm-12 center mt-1">
//               { submitted && loginStatus.length > 0 &&  <span className='error'>{loginStatus}</span>}
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-12 center mt-2">
//               <button type="submit" className="button" onClick={this.loginForm}>Login</button>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-4 mt-2"></div>
//             <div className="col-sm-4 right">
//               <a href="/register">Register</a>
//             </div>
//             <div className="col-sm-4 mt-2"></div>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     profile: state.user.profile
//   }
// }

// export default connect(mapStateToProps)(Login);