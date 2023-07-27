
import axios from 'axios';
import {router} from './routes'


export const jwtintercepter = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});
// const router = useRouter();
// let retry:number = 0;

export async function refreshAuthHeader() {
    console.log('refreshed');
    // axios.defaults.headers.common['Authorization'] = refreshToken;
    await jwtintercepter
        .post(`/auth/refresh`,{
            withCredentials:true
        })
        .then((response) => {
          console.log('worked'+ response.data.accessToken)
            setAuthHeader(response.data.accessToken)
        })
        .catch(() => {
            router.push({ name: "Login" });
        });
}

//handing api responses
jwtintercepter.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the response is HTTP 401 and the original request hasn't already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          refreshAuthHeader()
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh access token:', refreshError);
          router.push({ name: "Login" });

        }
      }
  
      // Return any other errors
      return Promise.reject(error);
    }
  );


//setting auth token header 
export function setAuthHeader(token?:string) {

    if (token) {
      jwtintercepter.defaults.headers.common = {
            Authorization: "Bearer " + token,
        }
    }
    else {
        localStorage.removeItem("token");

    }
}




// export default {
//     setAuthHeader,
//     // refreshAuthHeader
// };