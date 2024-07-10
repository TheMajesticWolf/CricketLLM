import axios from 'axios';
import useLogout from '../hooks/useLogout'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:6969',
    withCredentials: true
});

const responseInterceptor = axiosInstance.interceptors.response.use(
    response => response,
	async (error) => {
		
		const originalRequest = error.config


        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

			try {
				
				const refreshedResponse = await axiosInstance.post("/api/auth/refresh")
				if(refreshedResponse.status == 200) {
					return axiosInstance(originalRequest)
	
				}
			}
			catch (refreshError) {
				console.log("Refresh token expired, please relogin")
				window.location.href = "/"
				window.history = ""
			
			}
			
		}
		return Promise.reject(error?.response?.data)
	}
);


export default axiosInstance;
