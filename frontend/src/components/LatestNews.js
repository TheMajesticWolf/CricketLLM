import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import RenderOutput from './RenderOutput'
import './style.css'
import { useNavigate } from 'react-router'
import LeftPanel from './LeftPanel'
import Title from './Title'
import axiosInstance from '../api/myaxios'
import useLogout from '../hooks/useLogout'

const LatestNews = () => {


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

		let response = await axiosInstance.get("/api/fetch/fetch-latest-news")

		let jsonData = response.data
		isAuthenticated(jsonData)
		setResponseItems(responseItems => [...responseItems, jsonData["response"]])
		console.log(jsonData)
		setIsInputDisabled(false)
	}



	const handleSubmit = (e) => {
		e.preventDefault()
		setIsInputDisabled(true)

		fetchDataFromServer()
	}
	return (

		<div className="overall-container">


			<LeftPanel setResponseItems={setResponseItems} />

			<div className="center-panel-container">
				<Title subtitle={"Latest news"} />
				<div className="response-box" style={{ height: "75%" }}>
					<RenderOutput frontendList={responseItems} />
					<div ref={dummy} className="loading-box" style={{ display: (isInputDisabled == true ? "block" : "none") }}>
						<p>Loading...</p>
					</div>
					<div ref={dummy}></div>

				</div>

				<div className="input-box">
					<form onSubmit={handleSubmit}>
						<div className="input-box-row">
							<button type="submit" style={{ width: "90%", flex: 0.9}}>Refresh</button>

						</div>
					</form>
				</div>

			</div>

		</div>

	)
}

export default LatestNews