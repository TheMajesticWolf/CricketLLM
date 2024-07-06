import React, { useState, useEffect, useRef } from 'react'
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RenderOutput from './RenderOutput';
import Title from './Title';
import { json, useNavigate } from 'react-router';
import axiosInstance from '../api/myaxios'

const HomePage = () => {

	const [userQuestion, setUserQuestion] = useState("")
	const [isInputDisabled, setIsInputDisabled] = useState(false)

	const [singleResponseItem, setSingleResponseItem] = useState("")

	const navigate = useNavigate()

	const dummy = useRef(null)
	const scrollToBottom = () => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
	}





	let [chatIds, setChatIds] = useState([])

	const [currentChatIndex, setCurrentChatIndex] = useState("")

	const [responseItems, setResponseItems] = useState([])

	useEffect(() => {
		scrollToBottom();
	}, [responseItems])

	const isAuthenticated = (jsonData) => {

		if (jsonData["response"]["authenticationFailed"] == true) {
			return false
		}
		return true

	}

	useEffect(() => {

		let fetchDataFromServer = async () => {


			let response = await axiosInstance.get("/api/db/fetch-chat-ids", {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
				}
			})



			let jsonData = response.data

			if (!isAuthenticated(jsonData)) {
				navigate("/")
			}


			// console.log(jsonData["response"])
			// If a user logs in for the first time, automatically create a "Default" chat
			if (jsonData["response"].length == 0) {
				await createNewChat();
				return
			}

			setChatIds(jsonData["response"])
			setCurrentChatIndex(jsonData["response"][jsonData["response"].length - 1]["_id"])
		}

		fetchDataFromServer()

	}, [])

	useEffect(() => {

		let fetchDataFromServer = async () => {
			if (chatIds[0]) {
				// console.log(chatIds)

				// let newCurrentChatIdx = chatIds[chatIds.length - 1]["_id"]
				// console.log(newCurrentChatIdx, currentChatIndex)
				// setCurrentChatIndex(newCurrentChatIdx)

				// console.log(newCurrentChatIdx, currentChatIndex)

				let response = await axiosInstance.get(`/api/db/fetch-chat/${currentChatIndex}`, {
					headers: {
						"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
					}
				})

				let jsonData = await response.data

				if (!isAuthenticated(jsonData)) {
					navigate("/")
				}
				// console.log("HERE")
				setResponseItems(jsonData["response"]["conversations"])
				console.log(jsonData["response"]["conversations"])

			}
		}

		fetchDataFromServer()

	}, [chatIds, currentChatIndex])


	const sendDataToServer = async () => {



		let url

		let query

		if (/help/.test(userQuestion)) {

			let helpObject = {
				"return_format": "help_text",
				"question": userQuestion,
				"output": "Test"
			}

			setResponseItems(responseItems => [...responseItems, helpObject])
			setIsInputDisabled(false)

			return
		}

		else if (/.*videos.*/.test(userQuestion)) {

			let dateObj = new Date()

			url = "http://localhost:6969/api/fetch/get-videos-of-player"
			query = userQuestion + " only english cricket " + dateObj.toLocaleString('default', { month: 'long' }) + ", " + dateObj.getFullYear()
			// query = `virat kohli english videos ${dateObj.toLocaleString('default', { month: 'long' }) + ", " + dateObj.getFullYear()}`
		}

		else {
			url = "http://localhost:6969/api/fetch/conversation-response"
			query = userQuestion
		}



		let response = await axiosInstance.post(url, {
			"question": query
		},
			{
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
				}
			})


		let jsonData = await response.data

		if (!isAuthenticated(jsonData)) {
			navigate("/")
		}




		setResponseItems([...responseItems, jsonData["response"]])

		// TODO: Save chats incrementally
		// DONE

		response = await axiosInstance.post(`/api/db/update-chat/${currentChatIndex}`, {
			"newConversationObj": jsonData["response"]
		}, 
		{
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
			}
		})

		jsonData = response.data





	}

	let handleSubmit = async (e) => {
		e.preventDefault()

		if (!userQuestion) {
			alert("Please enter your question")
			return
		}
		setUserQuestion("")
		setIsInputDisabled(true)
		await sendDataToServer()
		setIsInputDisabled(false)




	}

	let createNewChat = async () => {

		let response = await axiosInstance.get(`/api/db/create-new-chat`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
			}
		})

		let jsonData = await response.data

		if (!isAuthenticated(jsonData)) {
			navigate("/")
		}


		setChatIds(prev => [...prev, { _id: jsonData["response"]["_id"], title: jsonData["response"]["title"] }])
		// console.log([...chatIds, {_id: jsonData["response"]["_id"], title: jsonData["response"]["title"]}])
		setCurrentChatIndex(jsonData["response"]["_id"])

	}

	let deleteChat = async () => {

		if (chatIds.length == 1) {
			alert("You need to have atleast one chat")
			return
		}

		let response = await axiosInstance.delete(`/api/db/delete-chat/${currentChatIndex}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
			}
		})

		let jsonData = await response.data

		if (!isAuthenticated(jsonData)) {
			navigate("/")
		}


		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		response = await axiosInstance.get(`/api/db/fetch-chat-ids`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("accessToken")}`
			}
		})
		jsonData = response.data

		setChatIds(jsonData["response"])
		setCurrentChatIndex(jsonData["response"][jsonData["response"].length - 1]["_id"])





	}


	return (

		<div className="overall-container">


			<LeftPanel chatIds={chatIds} setCurrentChatIndex={setCurrentChatIndex} currentChatIndex={currentChatIndex} deleteChat={deleteChat} responseItems={responseItems} setResponseItems={setResponseItems} createNewChat={createNewChat} isChatPage={true} />
			{/* <LeftPanel deleteChat={deleteChat} setResponseItems={setResponseItems}/> */}


			<div className="center-panel-container">

				<Title subtitle={'Your one-stop for all cricket-related queries (Type "help" for more info)'} />

				<div className="response-box">

					<RenderOutput frontendList={responseItems} />

					<div ref={dummy} className="loading-box" style={{ display: (isInputDisabled == true ? "block" : "none") }}>
						<p>Loading...</p>
					</div>
					<div ref={dummy}></div>

				</div>




				<div className="input-box">
					{/* 
					{
						(suggestions.length != 0 && /.*profile of/g.test(userQuestion)) && (
							<select className='input-box suggestions-list' style={{border: "2px solid red"}}>
								{suggestions.map((suggestion, index) => (
									<option
										key={index}
										onClick={() => handleSuggestionClick(suggestion)}
									>
										{suggestion}
									</option>
								))}
							</select>
						)
					} */}
					<form onSubmit={handleSubmit}>

						<input type="text" placeholder="Enter your question" disabled={isInputDisabled} value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
						{/* <input type="text" placeholder="Enter your question" disabled={isInputDisabled} value={userQuestion} onChange={handleInputChange} /> */}
						{/* <textarea type="text" style={{resize: "vertical"}} rows={5} placeholder="Enter your question" disabled={isInputDisabled} value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} /> */}


						<button onClick={handleSubmit}>↑</button>
					</form>
				</div>

			</div>
		</div>

	)

}

export default HomePage