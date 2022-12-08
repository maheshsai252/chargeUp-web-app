import React from 'react'
// import { Navigate, Route } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../../App/Login/SignInUp';
function getToken() {
    console.log("yes");
    const tokenString = sessionStorage.getItem('token');
    console.log(tokenString);
    
    return tokenString
  }


const PrivateRoute = (props) => {
    const isLoggedIn = () => {
        console.log(getToken(),"getting");
        if(getToken()===null || getToken().length === 0) {
            return false;
        }
        console.log("logged in");
        return true;
      }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLoggedIn() ? <Outlet /> : <Login from={props.path} />;
}
// const PrivateRoute = ({ component: Component, ...rest }) => {

//   // Add your own authentication on the below line.
//   const isLoggedIn = () => {
//     console.log(rest);
//     if(getToken() == null) {
//         return false;
//     }
//     return true;
//   }

//   return (
//     <Route
//       {...rest}
//       render={props =>
//          isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
//         )
//       }
//     />
//   )
// }

export default PrivateRoute