import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import RenderOutput from './RenderOutput'
import './style.css'
import { useNavigate } from 'react-router'
import LeftPanel from './LeftPanel'
import Title from './Title'

const LatestNews = () => {


	const navigate = useNavigate()
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



	const fetchDataFromServer = async (matchType) => {
		
		let response = await fetch("http://localhost:6969/api/fetch-latest-news")

		let jsonData = await response.json()
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


			<LeftPanel setResponseItems={setResponseItems}/>

			<div className="center-panel-container">
				<Title subtitle={"Latest news"}/>
				<div className="response-box" style={{ height: "75%" }}>
					<RenderOutput frontendList={responseItems} />
					<div ref={dummy} className="loading-box" style={{ display: (isInputDisabled == true ? "block" : "none") }}>
						<p>Loading...</p>
					</div>
					<div ref={dummy}></div>

				</div>

				<div className="input-box">
					<form onSubmit={handleSubmit}>
						<button type="submit" style={{width: "90%"}}>Refresh</button>

					</form>
				</div>

			</div>

		</div>

	)
}

export default LatestNews