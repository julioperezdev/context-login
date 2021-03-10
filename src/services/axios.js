import axios from "axios";
import swal from "sweetalert2";

const HttpClient = axios.create({
  //baseURL: "http://localhost:4300/api/v1",
  baseURL: "http://localhost:8080",
  //baseURL: process.env.REACT_APP_BACKEND_URL,
  //baseURL: "http://192.168.137.28:3000",
  //baseURL: "http://192.168.137.211:3000",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

HttpClient.interceptors.request.use(
  (config) => {
    //SETEO DE AUTHORIZATION -> LOGIN BASIC ELSE BEARER + TOKEN
    const token = JSON.parse(localStorage.getItem("token"));

    const header = token === null ? "" : "Bearer " + token;
    config.headers.Authorization = header;
    return config;
  },
  function (error) {
    // Do something with request error

    console.log("ERROR -> interceptor request");
    console.log(error);
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("interceptor response");

    if (response.info) {
      response = undefined;
    } else {
      response = response.data;
    }
    return response;
  },
  function (error) {
    console.log({ error });
    if (error.isAxiosError) {
      if (
        error.message === "timeout of 10000ms exceeded" ||
        error.message === "Network Error" ||
        error.response === undefined
      ) {
        swal
          .fire({
            title: "Connection failed",
            text: "A connection error has occurred. Please try again later.",
            icon: "warning",
            confirmButtonText: "Ok",
          })
          .then((confirm) => {
            if (confirm.value) {
              return Promise.reject(error);
            }
          });
      } else {
        let errMsg;
        if (error.response) {
          if (
            error.response.status === 500 ||
            error.response.status === 400 ||
            error.response.status === 401 ||
            error.response.status === 404 ||
            error.response.status === 408 ||
            error.response.status === 26 ||
            error.response.status === 19
          ) {
            if (error.response.status === 0) {
              errMsg = "A connection error has occurred. Please retry again";
            }
            if (error.response.status === 26 || error.response.status === 19) {
              errMsg = `${error.response.status} - Problems connecting to the network`;
            }
            if (error.response.status === 401) {
              if (error.response.data.status === "error") {
                errMsg = error.response.data.message;
              } else {
                return Promise.reject(error);
              }
            }
            if (error.response.status === 404) {
              errMsg = `${error.response.status} - The requested content is not available`;
            }
            if (error.response.status === 408) {
              errMsg = `${error.response.status} - Sesion Expired`;
            }
            if (error.response.status === 400) {
              return Promise.reject(error);
            }
            if (error.response.status === 500) {
              errMsg = `${error.response.status} - Error in Data Base`;
            }
          } else {
            errMsg = `${error.response.status} - ${
              error.response.data.error || ""
            } - ${error.response.data.message}`;
          }
        }

        swal
          .fire({
            title: "An unexpected error occurred",
            icon: "error",
            text: errMsg,
            allowOutsideClick: false,
            confirmButtonText: "Ok",
          })
          .then(() => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "/login";
          });
      }
    }
  }
);

export default HttpClient;