import axiosInstance from '../api/myaxios'
import { useNavigate } from 'react-router'


const useLogout = () => {

	const navigate = useNavigate()
	const handleLogout = async () => {

		let response = await axiosInstance.post("/api/auth/logout", {

		})

		let jsonData = response.data

		if(jsonData.success) {
			localStorage.clear()
			navigate("/", {replace: true})
			alert("Logged out successfully")
		}

	}


	return (
		handleLogout
	)
}

export default useLogout