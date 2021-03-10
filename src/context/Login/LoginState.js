import React, {useReducer} from "react"
import LoginReducer from "./LoginReducer"
import LoginContext from "./LoginContext"
import HttpClient from "../../services/axios";
import { setUserInfo } from "./LoginAction";


const LoginState = (props) =>{

    const initialState = {
        userInfo: [],
        token: null
    }

    const [state, dispatch] = useReducer(LoginReducer, initialState)

    //const loginApi = (username, password) => async (dispatch) => {
    const loginApi = (username, password) => async () => {
        try {
          const params = {
            username,
            password,
          };
      
          const response = await HttpClient.post("login", params);
          console.log(response);
          if (response && response.data) {
            localStorage.setItem("userInfo", JSON.stringify(response.data));
      
            localStorage.setItem("token", JSON.stringify(response.data.token));
            dispatch(setUserInfo(response.data));
            return response;
          }
        } catch (error) {
          const msgerror = error.response
            ? error.response.data.message
            : error.message;
          console.log({ error });
          console.log (msgerror);
          //dispatch(showMessage({ msg: msgerror, type: "error" }));
        }
      };
      /*
    const getUsers = async() => {
        const res = await axios.get(`https://reqres.in/api/users`)
        console.log(res.data.data)
        console.log(state.users)
        dispatch({
            type: 'GET_USERS',
            payload: res.data.data
        })
    }
    const getProfile = async(id) => {
        const res = await axios.get(`https://reqres.in/api/users/`+ id)
        dispatch({
            type: 'GET_PROFILE',
            payload: res.data.data
        })

    }
*/
    return (
        <LoginContext.Provider value = {{
            userInfo: state.userInfo,
            token: state.token,
            loginApi,
            
            //getUsers, //getUsers : getUsers
            //getProfile //getProfile : getProfile
        }}>
            {props.children}
        </LoginContext.Provider>
    )


}

export default LoginState;




/*
const loginApi = (username, password) => async (dispatch) => {
    try {
      const params = {
        username,
        password,
      };
  
      const response = await HttpClient.post("login", params);
      console.log(response);
      if (response && response.data) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
  
        localStorage.setItem("token", JSON.stringify(response.data.token));
        dispatch(setUserInfo(response.data));
        return response;
      }
    } catch (error) {
      const msgerror = error.response
        ? error.response.data.message
        : error.message;
      console.log({ error });
      console.log (msgerror);
      //dispatch(showMessage({ msg: msgerror, type: "error" }));
    }
  };
  
  export const api = {
    loginApi,
  };

*/