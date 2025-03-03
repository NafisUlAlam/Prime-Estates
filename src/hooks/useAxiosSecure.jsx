import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ADDRESS,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      //console.log("token inside secure axios", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        //console.log("error from axios interceptor", error);
        //console.log("trying to get into different place");
        toast.error(error.response.data.message);
        navigate("/login");
        logOut()
          .then(() => {})
          .catch((err) => console.log(err));
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
