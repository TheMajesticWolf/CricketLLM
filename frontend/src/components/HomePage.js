import React, { useState, useEffect, useRef } from 'react'
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RenderOutput from './RenderOutput';
import Title from './Title';
import { useNavigate } from 'react-router';

const HomePage = () => {

	const [userQuestion, setUserQuestion] = useState("")
	const [isInputDisabled, setIsInputDisabled] = useState(false)

	const [singleResponseItem, setSingleResponseItem] = useState("")

	const navigate = useNavigate()

	const dummy = useRef(null)
	const scrollToBottom = () => {
		dummy.current?.scrollIntoView({ behavior: "smooth" });
	}


	let CHATS = [
		[
			{
				"output": "Virat Kohli (; born 5 November 1988) is an Indian international cricketer and the former captain of the Indian national cricket team. He is a right-handed batsman and an occasional medium-fast bowler\n\nVirat Kohli and K. L\n\nKohli has been deemed one of the most commercially viable athletes, with often ranked among the highest-paid globally.\nEarly life.\nVirat Kohli was born on 5 November 1988 in Delhi into a Punjabi Hindu family. His father, Prem Nath Kohli, worked as a criminal lawyer, and his mother, Saroj Kohli, served as a housewife\n\nVirat Kohli's senior career began when he made his debut in List A cricket, playing against Services in the Ranji One-Day Trophy, but he did not have the opportunity to bat during the match. On the international stage, he has been representing India since he was included in the ODl squad for the tour of Sri Lanka\n\nIn 2016, a sport biopic \"\" based on his life was released.\nThe third recipient, is Virat Kohli. He is considered the best batsman of the current generation\n\n",
				"question": "Who is virat kohli",
				"return_format": "string"
			},
			{
				"output": "Cummins is widely regarded as an all-time great fast bowler in Test cricket and one of the finest fast bowlers of his generation. He is also known for being a handy lower-order batsman\n\nPatrick James Cummins (born 8 May 1993) is an Australian international cricketer who captains the Australia men's national cricket team in Test and One Day International cricket. He is also the current captain of Sunrisers Hyderabad in the 2024 Indian Premier League\n\nIn 2023, he was awarded the Sir Garfield Sobers Trophy by the ICC.\nEarly life.\nCummins grew up in Mount Riverview in the Blue Mountains west of Sydney with his two brothers and two sisters. He attended St Paul's Grammar School\n\nSunrisers finished the league stage at 2nd position on points table with 8 wins in 14 matches played. The team ultimately finished the tournament as runners-up after losing in final against Kolkata Knight Riders.\nPersonal life.\nCummins attended the University of Technology, Sydney under its Elite Athlete Program, graduating in 2017 with a Bachelor of Business.\nIn February 2020 Cummins got engaged to his longtime girlfriend Becky Boston; the couple have a son\n\nHe stayed with Knight Riders for IPL 2021 and played for them again in IPL 2022 after taking a huge pay cut by selling for. In an interview, Cummins said he is 'absolutely pumped' to return to Knight Riders.\nCummins played in 37 IPL matches from 2014 to 2021, taking 38 wickets\n\n",
				"question": "Who is pat cummins",
				"return_format": "string"
			},
			{
				"output": "Sakshi Dhoni, the wife of M.S Dhoni, was her classmate in that school. She completed her schooling at Army School, Bangalore\n\nM.S. Dhoni was portrayed by Sushant Singh Rajput.\nIn Sachin Tendulkar's biopic documentary \" the match is also a significant part of the story plot.\n\nMS Dhoni scored 183 * in 2005 against the Sri Lankans. India won the 7 match series 6-1 .\n\nFollowing the retirement of test skipper Anil Kumble, MS Dhoni had been elevated to the post of the captain and Sehwag to that of the vice-captain. By doing so, they have allowed and relieved the out of form Yuvraj to regain his lost form.\n\nHe then went on to score a further 45 against the Mumbai Indians, before being ruled out of the remainder of the tournament with a wrist injury.\nThe Supergiant management axed MS Dhoni as captain and named Smith as captain for the 2017 season. In RPS's first game against Mumbai Indians, Smith led his team to victory in style, scoring 84* and was rewarded with the Man of The Match award\n\n",
				"question": "Who is ms dhoni?",
				"return_format": "string"
			}
		],
		[
			{
				"output": "Lionel Messi is an Argentine professional footballer who plays as a forward for Inter Miami and the Argentina national team.\n\nMessi is widely considered one of the greatest players of all time. He has won six Ballon d'Or awards, the most by any player.\n\nMessi started his career at Barcelona and spent 17 years there before moving to Paris Saint-Germain in 2021. He joined Inter Miami in 2023.\n\n",
				"question": "Who is Lionel Messi?",
				"return_format": "string"
			},
			{
				"output": "Elon Musk is a business magnate and investor. He is the founder of SpaceX, Tesla Inc., and several other companies.\n\nMusk is known for his ambitious goals, including colonizing Mars and advancing sustainable energy solutions.\n\nIn 2021, Musk became the world's richest person, surpassing Jeff Bezos.\n\n",
				"question": "Who is Elon Musk?",
				"return_format": "string"
			},
			{
				"output": "Albert Einstein was a theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.\n\nEinstein was awarded the Nobel Prize in Physics in 1921 for his discovery of the photoelectric effect.\n\nHis famous equation, E=mc², describes the relationship between energy and mass.\n\n",
				"question": "Who is Albert Einstein?",
				"return_format": "string"
			}
		],
		[
			{
				"output": "Serena Williams is an American professional tennis player and former world No. 1 in women's single tennis.\n\nWilliams has won 23 Grand Slam singles titles, the most by any player in the Open Era.\n\nShe is known for her powerful serve and aggressive playing style.\n\n",
				"question": "Who is Serena Williams?",
				"return_format": "string"
			},
			{
				"output": "Bill Gates is an American business magnate, software developer, and philanthropist. He is the co-founder of Microsoft Corporation.\n\nGates has been one of the world's wealthiest people for several decades. He is also known for his philanthropic work through the Bill & Melinda Gates Foundation.\n\n",
				"question": "Who is Bill Gates?",
				"return_format": "string"
			},
			{
				"output": "J.K. Rowling is a British author, best known for writing the Harry Potter fantasy series.\n\nThe Harry Potter books have sold more than 500 million copies worldwide, making them the best-selling book series in history.\n\nRowling has also written under the pseudonym Robert Galbraith.\n\n",
				"question": "Who is J.K. Rowling?",
				"return_format": "string"
			}
		],
		[
			{
				"output": "Redditor123: I can’t believe how good the new Spider-Man game is! Anyone else loving it?",
				"question": "What do you think about the new Spider-Man game?",
				"return_format": "string"
			},
			{
				"output": "4chanAnon: lol, who cares about Spider-Man when you can play Cyberpunk? It’s got bugs, but it’s still epic.",
				"question": "Which game do you prefer, Spider-Man or Cyberpunk?",
				"return_format": "string"
			},
			{
				"output": "Redditor456: Just finished reading 'Dune' and it’s a masterpiece. Highly recommend it to all sci-fi fans.",
				"question": "What’s your opinion on the book 'Dune'?",
				"return_format": "string"
			}
		],
		[
			{
				"output": "4chanUser: LMAO, did you see that meme about the dog and the cat? Funniest thing ever!",
				"question": "Have you seen the latest meme about the dog and the cat?",
				"return_format": "string"
			},
			{
				"output": "Redditor789: I’m thinking of building my own PC. Any tips for a first-timer?",
				"question": "What are some tips for building a PC?",
				"return_format": "string"
			},
			{
				"output": "4chanGuru: Forget building, just buy a pre-built. Saves time and hassle.",
				"question": "Is it better to build a PC or buy a pre-built one?",
				"return_format": "string"
			}
		],
		[
			{
				"output": "Redditor001: The latest season of 'The Witcher' is out! Henry Cavill is awesome as Geralt.",
				"question": "What do you think of the latest season of 'The Witcher'?",
				"return_format": "string"
			},
			{
				"output": "4chanCritic: Bruh, Netflix ruined 'The Witcher'. The books are way better.",
				"question": "Is the Netflix adaptation of 'The Witcher' any good?",
				"return_format": "string"
			},
			{
				"output": "Redditor002: Tried the new vegan burger at Burger King. Surprisingly good!",
				"question": "Have you tried the new vegan burger at Burger King?",
				"return_format": "string"
			}
		]
	]

	
	
	
	// let CHATS = [[]]

	// useEffect(() => {
	// 	let response
	// 	let jsonData
	// 	let tmp1 = [];
	// 	let tmp2 = [];

	// 	let fetchDataFromServer = async () => {
	// 		response = await fetch("http://localhost:6969/api/fetch-chats");
	// 		jsonData = await response.json()
	// 		console.log(jsonData)
			
	// 		jsonData = jsonData["response"]


	// 		jsonData.forEach((obj, idx) => {
	// 			tmp1.push(obj["chats"])
	// 			tmp2.push(obj["_id"])
	// 		})
	// 		setChats(tmp1)
	// 		setChatIds(tmp2)
	// 	}

	// 	fetchDataFromServer();
	// }, [])

	// CHATS= [[]]

	let [chats, setChats] = useState(CHATS)
	let [chatIds, setChatIds] = useState([])

	const [currentChatIndex, setCurrentChatIndex] = useState(0)

	const [responseItems, setResponseItems] = useState(CHATS[currentChatIndex])

	useEffect(() => {
		scrollToBottom();
	}, [responseItems])
	// }, [userQuestion, responseItems])


	const sendDataToServer = async () => {



		let url

		let query

		// if (/.*points.*table.*ipl/i.test(userQuestion)) {
		// 	url = "http://localhost:6969/api/fetch-ipl-points-table"
		// 	query = userQuestion
		// }

		// else if (/.*points.*table.*t20/i.test(userQuestion)) {
		// 	url = "http://localhost:6969/api/fetch-t20-points-table"
		// 	query = userQuestion
		// }

		// if (/.*profile of.*/i.test(userQuestion)) {

		// 	url = "http://localhost:6969/api/get-player-profile"
		// 	query = userQuestion.split("profile of")[1].trim()
		// }

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

			url = "http://localhost:6969/api/get-videos-of-player"
			query = userQuestion + " only english cricket " + dateObj.toLocaleString('default', { month: 'long' }) + ", " + dateObj.getFullYear()
			// query = `virat kohli english videos ${dateObj.toLocaleString('default', { month: 'long' }) + ", " + dateObj.getFullYear()}`
		}

		else {
			url = "http://localhost:6969/conversation-response"
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
		
		let updatedCHATS = [...chats]
		console.log(currentChatIndex)
		updatedCHATS[currentChatIndex] = [...updatedCHATS[currentChatIndex], jsonData["response"]]
		// console.log(updatedCHATS[currentChatIndex])
		setChats(updatedCHATS)
		
		setResponseItems(updatedCHATS[currentChatIndex])
		
		// TODO: Save chats incrementally
		
		// response = await fetch(`http://localhost:6969/api/save-chat/${chatIds[currentChatIndex]}`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify({
		// 		"newChatObj": jsonData["response"]
		// 	})
		// })





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


		// setResponseItems(responseItems => [...responseItems, { "question": userQuestion, "output": userQuestion.toUpperCase() }])




	}

	let createNewChat = () => {
		let updatedCHATS = [...chats, []]
		console.log("Before: ", updatedCHATS, updatedCHATS.length, currentChatIndex)
		setChats(prevChats => {
			const updatedCHATS = [...prevChats, []];
			setCurrentChatIndex(updatedCHATS.length - 1);  // Set to new chat index
			setResponseItems([]);
			return updatedCHATS;
		});
		console.log("After: ", updatedCHATS, updatedCHATS.length, currentChatIndex)
	}

	let clearChats = () => {

		let tmp = [...chats]
		let updatedCHATS = []

		tmp.forEach((obj, idx) => {
			if(idx != currentChatIndex) {
				updatedCHATS.push(obj)
			}
		})
		setCurrentChatIndex(prev => prev - 1)
		setChats(updatedCHATS)
		setResponseItems(updatedCHATS[currentChatIndex])



		
		// let updatedCHATS = [...chats]
		// updatedCHATS[currentChatIndex] = []
		// setChats(updatedCHATS)
		// setResponseItems(updatedCHATS[currentChatIndex])

	}


	return (

		<div className="overall-container">


			<LeftPanel chats={chats} setChats={setChats} setCurrentChatIndex={setCurrentChatIndex} currentChatIndex={currentChatIndex} clearChats={clearChats} responseItems={responseItems} setResponseItems={setResponseItems} createNewChat={createNewChat} isChatPage={true} />
			{/* <LeftPanel clearChats={clearChats} setResponseItems={setResponseItems}/> */}


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