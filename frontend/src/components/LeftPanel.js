import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const LeftPanel = ({ chats, currentChatIndex, setCurrentChatIndex, setChats, responseItems, setResponseItems, clearChats, createNewChat, isChatPage }) => {

	const navigate = useNavigate()

	// useEffect(() => {
		// handleSettingChat(3);
		// setResponseItems(chats[0]);
	// }, [])

	let handleSettingChat = (idx) => {
		console.log("Idx = ", idx, chats[currentChatIndex])

		setCurrentChatIndex(prev => idx)
		setResponseItems(chats[idx])

		// console.log(responseItems)
	}



	return (

		<div className="left-panel-container">

			<div className="navigation-menu">

				<div className="navigation-box">
					<button className="navigation-box-button" type="button" onClick={() => navigate("/chat")}>Chat </button>
				</div>

				<div className="navigation-box">
					<button className="navigation-box-button" type="button" onClick={() => navigate("/points-table")}>Points table </button>
				</div>

				<div className="navigation-box">
					<button className="navigation-box-button" type="button" onClick={() => navigate("/latest-news")}>Latest News</button>
				</div>

				<div className="navigation-box">
					<button className="navigation-box-button" type="button" onClick={() => navigate("/player-profiles")}>Player profiles</button>

				</div>
				<div className="navigation-box">
					<button className="navigation-box-button" type="button" onClick={clearChats}><b>Clear Chat</b> - </button>
				</div>

				{(isChatPage == true) && <div className="navigation-box">
					<button className="navigation-box-button" type="button" onClick={(e) => { createNewChat(); handleSettingChat(currentChatIndex) }}><b>New Chat</b> + </button>
				</div>}



				<div className="navigation-box">
					<button className="navigation-box-button" type="button" onClick={() => { localStorage.removeItem("username"); navigate("/") }}><b>{localStorage.getItem("username")}</b> - Logout</button>
				</div>

			</div>

			<hr />



			{isChatPage && <div className="previous-chats-menu">



				{chats.map((chat, idx) => (
					<div className="previous-chat-box">
						{idx == currentChatIndex ? <button onClick={(e) => handleSettingChat(idx)} style={{ "fontSize": "30px", color: "lime", textDecoration: "underline", fontWeight: "bold" }}>Chat - {idx}</button> :
							<button onClick={(e) => handleSettingChat(idx)} style={{ "fontSize": "30px", color: "grey" }}>Chat - {idx}</button>}

					</div>


				))}


			</div>}

		</div>
	)
}

export default LeftPanel