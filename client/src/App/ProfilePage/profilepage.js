
import { useEffect, useState } from "react";
import { fetchUser } from "../Login/LoginService";
import axios from "axios";
import ProfileView from "./ProfileView";
import NavBar from "../Nav/NavBar";

const Profile = () => {
  const [user,setUser] = useState({})
  const [events, setEvents] = useState([])
  const [myEvents, setMyEvents] = useState([])

  useEffect(() => {
    console.log("executing");
    // React advises to declare the async function directly inside useEffect
    async function getToken() {
      console.log(sessionStorage.getItem("userid"));
      const res = await fetchUser(sessionStorage.getItem("userid"));
      console.log("data",res);
      if(res["status"]===200 && res.data.length !== 0) {
        setUser(res.data[0])
      }
      const getEvent = async () => {
        const response = await axios.post('/api/registartionsByUser/',{
            userId: sessionStorage.getItem("userid")
        });
        console.log( response.data,"gotten")
        if(response.status===200) {
           setEvents(response.data);
        } 
    }
    const myevents = async () => {
      
      const response = await axios.post('/api/events-created/',{
        userid: sessionStorage.getItem("userid")
      });
      console.log( response.data,"gotten my events")
        if(response.status===200) {
          setMyEvents(response.data);
        } 
      }

      getEvent();
      myevents()
    };
    

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    // if (user===undefined) {
       getToken();
    // }
  }, []);
    return (
       <div>
       <NavBar />
          <ProfileView user={user} setUser={setUser} events={events} myEvents={myEvents} />
       </div>
    );
};

export default Profile;