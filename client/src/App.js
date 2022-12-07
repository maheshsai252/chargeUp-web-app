import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
// import Login from './App/Login/Login';
import Home from './App/Home/Home';
import Login from './App/Login/SignInUp';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {fetchUser} from './App/Login/LoginService';
import { useDispatch } from 'react-redux';
import { ActionCreators } from './App/actions/actionCreators';
import ViewEvent from './App/Events/ViewEvent/ViewEvent';
import PrivateRoute from './App/Login/PrivateRoute';
import CreateEvent from './App/Events/CreateEvent/CreateEvent';
import EventIntro from './App/Events/ViewEvent/EventIntro';
import EventDetailEntry from './App/Events/ViewEvent/EventDetailEntry';
import RegisterEvent from './App/Events/RegisterEvent/RegisterEvent';
import SearchEvent from './App/Events/SearchEvent/SearchEvent';
import MyEvents from './App/Events/MyEvents/MyEvents';
// import Jobs from './App/Jobs/Jobs';
// import Profile from './Pages/Profile';
// import ErrorPage from './Pages/ErrorPage';
import SignInUp from './App/Login/SignInUp';
import SignInForm from './App/Login/SignInForm';
import SignUp from './App/Login/SignUp';
import EditButton from './App/ProfilePage/profilepage';
import PairingEntry from './App/Events/MyEvents/Pairing/PairingEntry';
function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const user = useSelector((state) => {
    console.log(state);
    return state.user.profile;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("executing");
    // React advises to declare the async function directly inside useEffect
    async function getToken() {
      console.log(sessionStorage.getItem("userid"));
      const res = await fetchUser(sessionStorage.getItem("userid"));
      console.log("data",res);
      if(res["status"]===200 && res.data.length !== 0) {
        const user = {
          name: res.data[0].name,
          email: res.data[0].email
        }
        dispatch(ActionCreators.login(user));
      }
      
    };

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    // if (user===undefined) {
       getToken();
    // }
  }, []);
  return (
    <Router>

      <Routes>
      {/* <PrivateRoute path="/viewEvent/" component={ViewEvent} /> */}

      <Route path = "/" element = {<Home/>}></Route>
      <Route path = "/login" element = {<Login />}></Route>
      {/* <Route exact path='/viewEvent' element={<PrivateRoute path='/viewEvent'/>}>
            <Route exact path='/viewEvent' element={<ViewEvent/>}/>
      </Route> */}
      <Route path='/createEvent' element={<PrivateRoute path='/createEvent'/>}>
            <Route exact path='/createEvent' element={<CreateEvent/>}/>
      </Route>
      <Route path='/event/:nameTag' element={<EventDetailEntry />} >

      </Route>
      <Route path='/register/:nameTag' element={<RegisterEvent />} >
      </Route>
      <Route path='/search/' element={<SearchEvent />} >
      </Route>
      <Route path='/myevents/' element={<MyEvents />} >
      </Route>
      <Route path='/sign-in/' element={<Login />} >
      </Route>
      <Route path='/sign-up/' element={<SignUp />} >
      </Route>
      <Route path='/profile/' element={<EditButton />} >
      </Route>
      <Route path='/pairing/:nameTag' element={<PairingEntry />} >
      </Route>
      {/* <Route path="/viewEvent" element = {<ViewEvent />}></Route>  */}
      {/* <Route path = "/login" element = { <Login setToken={setToken} />}></Route> */}
      {/* <Route path = "/jobs" element = {<Jobs/>}></Route> */}
      {/* <Route path = "*" element = {<ErrorPage/>}></Route> */}

      </Routes>
    </Router>
  );
}

export default App;
