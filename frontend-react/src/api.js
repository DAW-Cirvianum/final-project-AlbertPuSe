import axios from "axios"
import { ROUTES } from "./routes";
export const api= axios.create({
    baseURL:"http://localhost/api/",
    timeout:5000
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response=>response,
  error=>{
    if(error.response && error.response.status==401){
        localStorage.removeItem("token")
        window.location.href=ROUTES.LOGIN
    }
    return Promise.reject(error);
  }
);
