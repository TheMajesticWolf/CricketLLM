import React, { useState, useEffect, useRef, useContext } from 'react'
import LeftPanel from './LeftPanel';
import RenderOutput from './RenderOutput';
import Title from './Title';
import { json, useNavigate } from 'react-router';
import axiosInstance from '../api/myaxios'
import useLogout from '../hooks/useLogout';
// import socket from '../api/socket';
import { AuthContext } from '../context/AuthProvider';
import socket from '../api/socket';





const ChatRoom = () => {

	
	socket.on("connect", () => {
		console.log("Socket Connected to server")
	})
	
	useEffect(() => {
		socket.emit("user-connected", localStorage.getItem("username"))
	}, [])

	const [userQuestion, setUserQuestion] = useState("")
	const [roomId, setRoomId] = useState("")
	const [isInputDisabled, setIsInputDisabled] = useState(false)
	const { auth, setAuth } = useContext(AuthContext)


	const navigate = useNavigate()
	const logout = useLogout()

	const dummy = useRef(null)
	const scrollToBottom = () => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
	}







	const [responseItems, setResponseItems] = useState([])

	useEffect(() => {
		scrollToBottom();
	}, [responseItems])

	const isAuthenticated = (jsonData) => {

		if (jsonData?.response?.authenticationFailed == true) {
			logout()
		}

	}

	useEffect(() => {

		socket.on("from-server", (obj) => {
			setResponseItems(prev => [...prev, {
				"output": obj["message"],
				"from": obj["from"],
				"return_format": "chatRoomItem"
			}])
		})

	}, [socket])


	const sendDataToServer = async () => {

		console.log("Sending data")

		socket.emit("from-frontend", { message: userQuestion, from: localStorage.getItem("username"), roomId: roomId })

		setResponseItems(prev => [...prev, {
			"output": `${userQuestion}`,
			"from": "Me",
			"return_format": "chatRoomItem"
		}])

		return




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



		else {
			url = "http://localhost:6969/api/fetch/conversation-response"
			query = userQuestion
		}



		// let response = await axiosInstance.post(url, {
		// 	"question": query
		// })


		// let jsonData = response.data

		// isAuthenticated(jsonData)






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

	let joinRoom = (e) => {
		e.preventDefault()
		console.log("HERE")
		socket.emit("join-room", roomId)
	}

	return (

		<div className="overall-container">


			<LeftPanel responseItems={responseItems} setResponseItems={setResponseItems} isChatPage={false} />
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
					<form onSubmit={handleSubmit}>
						<div className="input-box-row">
							<input type="text" placeholder="Enter your question" disabled={isInputDisabled} value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
							<input type="text" placeholder="Enter room id" disabled={isInputDisabled} value={roomId} onChange={(e) => setRoomId(e.target.value)} />
							<button type="button" onClick={joinRoom}>Join</button>
							<button type="submit" onClick={handleSubmit} style={{flex: 0}}></button>

						</div>

					</form>
				</div>

			</div>
		</div>

	)

}

export default ChatRoom