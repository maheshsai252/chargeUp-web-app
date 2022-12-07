import axios from 'axios';

export const signin = async (email,password) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'JWT fefege...'
      }
    try {
        const response = await axios.post('/api/user/signin/', {
            "email": email,
            "password": password
        }, {
            headers: headers
          });
        console.log('response  ', response)
        return response;
    } catch(error) {
        console.log(error);
        return {"id": error.response.data["message"],"status": 400};
    }
}
export const signup = async (name,email,password,file) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'JWT fefege...'
      }
    try {
        const response = await axios.post('/api/user/create/', {
            "email": email,
            "password": password,
            "name": name,
            "file": file.length>0 ? file[0] : "none"
        }, {
            headers: headers
          });
        console.log('response  ', response)
        return response;
    } catch(error) {
        console.log(error);
        return {"id": error.response.data["message"],"status": 400};
    }
}
export const signinWithGoogle = async (email, name, googleId) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'JWT fefege...'
      }
    try {
        console.log("signing in with google");
        const response = await axios.post('/api/user/signinWithGoogle/', {
            "email": email,
            "googleId": googleId,
            "name": name
        }, {
            headers: headers
          });
        console.log('response  ', response)
        return response;
    } catch(error) {
        console.log(error);
        return {"id": error.response.data["message"],"status": 400};
    }
}
export const signout = async () => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'JWT fefege...'
      }
    try {
        const response = await axios.post('/api/user/logout/', {
           
        }, {
            headers: headers
          });
        console.log('response  ', response)
        return response;
    } catch(error) {
        console.log(error);
        return {"id": error.response.data["message"],"status": 400};
    }
}
export const fetchUser = async (id) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'JWT fefege...'
      }
    try {
        console.log("powering",id, typeof(id));
        const body =  {
            "userid": id
        }
         console.log(body);
        const response = await axios.post('/api/user/', body, {
            headers: headers
          });
        console.log('response  ', response)
        return response;
    } catch(error) {
        console.log(error);
        return {"id": error.response.data["message"],"status": 400};
    }
}