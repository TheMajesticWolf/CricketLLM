import React, { useState, useEffect, useRef } from 'react'
import RenderOutput from './RenderOutput'

const CenterPanel = ({ allChats, handleUpdate }) => {


	let [prompt, setPrompt] = useState("")
	let [response, setResponse] = useState([])

	let [isInputDisabled, setIsInputDisabled] = useState(false)

	let inputBoxRef = useRef(null)

	const scrollToBottom = () => {
		inputBoxRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	useEffect(() => {
		scrollToBottom();
	}, [prompt])

	const sendDataToServer = async () => {

		let response = await fetch("http://localhost:4269/conversation-response", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"prompt": prompt
			})
		})

		let jsonData = await response.json()
		handleUpdate(jsonData.response["output"])
		// handleUpdate(jsonData.response)
		setResponse(jsonData.response)
		setIsInputDisabled(false)


		// console.log(jsonData)

	}

	let handleSubmit = async (e) => {
		e.preventDefault()
		if(!prompt) {
			return
		}
		setPrompt("")
		setIsInputDisabled(true)
		handleUpdate(prompt)
		await sendDataToServer()
		
		
	}



	return (
		<div className="center-panel-container">

			<div className="center-panel">


				<div className="response-box">

					{allChats.map((conversation, idx) => (
						<div className="response" key={idx}>
							<>
								{(idx % 2 == 0) ? <div className="response-origin"><h4>User</h4></div> : <div className="response-origin"><h4>Cricket LLM</h4></div>}
								<p>{conversation}</p>
							</>
						</div>

					))}



				</div>

				{/* <RenderOutput responseFromServer={response}/> */}

				
				<div className="input-box">
					<form onSubmit={handleSubmit}>
						
						<input type="text" placeholder="Enter your prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} ref={inputBoxRef} disabled={isInputDisabled}/>
						<button type="submit" onClick={handleSubmit}>↑</button>
					</form>
				</div>

			</div>
		</div>
	)
}

export default CenterPanel