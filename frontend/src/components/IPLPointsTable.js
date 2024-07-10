import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import RenderOutput from './RenderOutput'
import './style.css'
import { useNavigate } from 'react-router'
import LeftPanel from './LeftPanel'
import Title from './Title'
import axiosInstance from '../api/myaxios'
import useLogout from '../hooks/useLogout'


const IPLPointsTable = () => {
	const navigate = useNavigate()
	const logout = useLogout()
	const [selectedOption, setSelectedOption] = useState("null")
	const [responseItems, setResponseItems] = useState([])
	const [isInputDisabled, setIsInputDisabled] = useState(false)

	const dummy = useRef(null)
	const scrollToBottom = () => {
		dummy.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [responseItems])


	const isAuthenticated = (jsonData) => {

		if (jsonData?.response?.authenticationFailed == true) {
			logout()
		}

	}

	const fetchDataFromServer = async (matchType) => {
		let response = await axiosInstance.post(`/api/fetch/fetch-points-table`, {

			"question": `Points table for ${matchType}`,
			"matchType": matchType

		}, 
		{
			headers: {
				"Content-Type": "application/json"
			}
		})

		let jsonData = response.data
		isAuthenticated(jsonData)
		setResponseItems(responseItems => [...responseItems, jsonData["response"]])
		setIsInputDisabled(false)
	}




	const handleSubmit = (e) => {
		e.preventDefault()
		setIsInputDisabled(true)
		const value = e.target.value
		if (value === "null") {
			alert("Select a match")
			return
		}
		console.log("selected option: ", value)
		setSelectedOption(value)
		fetchDataFromServer(value); // Fetch data with the value directly from the event
	}

	return (
		<div className="overall-container">

			<LeftPanel setResponseItems={setResponseItems} />


			<div className="center-panel-container">

				<Title subtitle={'PPoints tables'} />

				<div className="response-box">
					<RenderOutput frontendList={responseItems} />
					<div ref={dummy} className="loading-box" style={{ display: (isInputDisabled == true ? "block" : "none") }}>
						<p>Loading...</p>
					</div>
					<div ref={dummy}></div>

				</div>
				<div className="input-box">
					<form>
						<select value={selectedOption} onChange={handleSubmit}>
							<option value="null">Select match</option>
							<option value="T20 World Cup 2024">T20 World Cup 2024</option>
							<option value="IPL 2024">IPL 2024</option>
							<option value="IPL 2023">IPL 2023</option>
							<option value="IPL 2022">IPL 2022</option>
							<option value="IPL 2021">IPL 2021</option>
							<option value="IPL 2020">IPL 2020</option>
							<option value="IPL 2019">IPL 2019</option>
							<option value="IPL 2018">IPL 2018</option>
							<option value="IPL 2017">IPL 2017</option>
							<option value="IPL 2016">IPL 2016</option>
							<option value="IPL 2015">IPL 2015</option>
							<option value="IPL 2014">IPL 2014</option>
							<option value="IPL 2013">IPL 2013</option>
							<option value="IPL 2012">IPL 2012</option>
							<option value="IPL 2011">IPL 2011</option>
							<option value="IPL 2010">IPL 2010</option>
							<option value="IPL 2009">IPL 2009</option>
							<option value="IPL 2008">IPL 2008</option>
						</select>
					</form>
				</div>
			</div>
		</div>
	)
}

export default IPLPointsTable
