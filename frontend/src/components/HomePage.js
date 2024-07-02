import React, { useState, useEffect, useRef } from 'react'
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RenderOutput from './RenderOutput';
import Title from './Title';
import { json, useNavigate } from 'react-router';

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

	useEffect(() => {

		let fetchDataFromServer = async () => {
			let response = await fetch(`http://localhost:6969/api/db/fetch-chat-ids/${localStorage.getItem("user_id")}`)
			let jsonData = await response.json()
			
			// console.log(jsonData["response"])
			// If a user logs in for the first time, automatically create a "Default" chat
			if(jsonData["response"].length == 0) {
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
			if(chatIds[0]) {
				// console.log(chatIds)

				// let newCurrentChatIdx = chatIds[chatIds.length - 1]["_id"]
				// console.log(newCurrentChatIdx, currentChatIndex)
				// setCurrentChatIndex(newCurrentChatIdx)

				// console.log(newCurrentChatIdx, currentChatIndex)

				let response = await fetch(`http://localhost:6969/api/db/fetch-chat/${currentChatIndex}`)
				let jsonData = await response.json()
				setResponseItems(jsonData["response"]["conversations"])
				// console.log(jsonData["response"]["conversations"])

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



		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"question": query
			})
		})

		let jsonData = await response.json()
		
		
		
		setResponseItems([...responseItems, jsonData["response"]])
		
		// TODO: Save chats incrementally
		// DONE
		
		response = await fetch(`http://localhost:6969/api/db/update-chat/${localStorage.getItem("user_id")}/${currentChatIndex}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"newConversationObj": jsonData["response"]
			})
		})

		jsonData = await response.json()






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

		let response = await fetch(`http://localhost:6969/api/db/create-new-chat/${localStorage.getItem("user_id")}`)
		let jsonData = await response.json()

		setChatIds(prev => [...prev, {_id: jsonData["response"]["_id"], title: jsonData["response"]["title"]}])
		// console.log([...chatIds, {_id: jsonData["response"]["_id"], title: jsonData["response"]["title"]}])
		setCurrentChatIndex(jsonData["response"]["_id"])
		
	}
	
	let deleteChat = async () => {

		if(chatIds.length == 1) {
			alert("You need to have atleast one chat")
			return
		}
		
		let response = await fetch(`http://localhost:6969/api/db/delete-chat/${localStorage.getItem("user_id")}/${currentChatIndex}`, {
			method: "DELETE"
		})
		let jsonData = await response.json()

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		response = await fetch(`http://localhost:6969/api/db/fetch-chat-ids/${localStorage.getItem("user_id")}`)
		jsonData = await response.json()
		
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