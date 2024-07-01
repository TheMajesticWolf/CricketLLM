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


	///////////////////////////////////////////////
	// let tmp = [{
	// 	'title': 'Uganda eye bright finish against knocked-out New Zealand',
	// 	'desc': 'Having stumbled to 39 all out against West Indies, Uganda will hope to end their tournament on a high ',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/icc-men-s-t20-world-cup-2024-1411166/new-zealand-vs-uganda-32nd-match-group-c-1415732/match-preview'
	// },
	// {
	// 	'title': "Farooqi: 'Whatever I am doing with the new ball, that is my skill'",
	// 	'desc': "Farooqi has led Afghanistan's charge in the T20 World Cup, moving the ball both ways to have the batters in trouble",
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/t20-world-cup-2024-afghanistan-fazalhaq-farooqi-whatever-i-am-doing-with-the-new-ball-that-is-my-skill-1438652'
	// },
	// {
	// 	'title': "Cummins: Australia would never have manipulated England's exit",
	// 	'desc': 'There is likely to be some rotation of players against Scotland with an eye on giving game time before the Super Eight',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/t20-world-cup-2024-pat-cummins-australia-would-never-have-manipulated-england-s-exit-1438596'
	// },
	// {
	// 	'title': 'Florida weather watch: USA and Pakistan games get boost after rain-free Thursday',
	// 	'desc': 'Lauderhill is scheduled to host three Group A matches in three days, two of them pretty crucial for the hosts USA and Pakistan',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/men-s-t20-world-cup-2024-florida-games-feat-usa-ireland-pakistan-get-a-boost-after-dry-thursday-1438601'
	// },
	// {
	// 	'title': 'Cameron White returns to Melbourne Renegades as new head coach',
	// 	'desc': 'The former Australia allrounder leaves his role as an assistant coach with Sydney Sixers',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/bbl-news-cameron-white-returns-to-melbourne-renegades-as-new-head-coach-1438599'
	// },
	// {
	// 	'title': 'Afghanistan storm into Super Eight; New Zealand knocked out',
	// 	'desc': 'Fazalhaq Farooqi and Naveen-ul-Haq set up the win by helping bundle out PNG for 95',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/icc-men-s-t20-world-cup-2024-1411166/afghanistan-vs-papua-new-guinea-29th-match-group-c-1415729/match-report'
	// },
	// {
	// 	'title': 'Sydney Thunder confident of Warner BBL return',
	// 	'desc': 'General manager Trent Copeland is hopeful the Australia opener will be back for another season',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/sydney-thunder-confident-of-david-warner-bbl-return-1438591'
	// },
	// {
	// 	'title': 'Jos Buttler brushes off criticism as England get World Cup campaign back on track',
	// 	'desc': "'I've been around long enough to know how it works,' captain says, after emphatic win over Oman",
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/t20-world-cup-2024-jos-buttler-brushes-off-criticism-as-england-get-world-cup-campaign-back-on-track-1438586'
	// },
	// {
	// 	'title': "Essex triumph in rain-ruined game at Lord's",
	// 	'desc': 'Middlesex had an unlikely chase of 80 in six overs after Essex reached 129 for 4 in the 13th',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/t20-blast-2024-1410370/middlesex-vs-essex-south-group-1410411/match-report'
	// },
	// {
	// 	'title': 'Shakib has arrived at the T20 World Cup, finally',
	// 	'desc': "Bangladesh's Player of the Match against Netherlands credits the bowling unit for the crucial win",
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/t20-world-cup-2024-ban-vs-ned-shakib-al-hasan-has-arrived-at-the-t20-world-cup-1438577'
	// },
	// {
	// 	'title': "Shakib: 'Happy with the way I contributed, it wasn't an easy wicket'",
	// 	'desc': 'The senior allrounder scored his first T20I fifty in two years to help Bangladesh beat Netherlands',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/t20-world-cup-2024-shakib-al-hasan-it-was-important-for-a-top-four-batter-to-play-through-the-innings-1438563'
	// },
	// {
	// 	'title': 'England rip through outclassed Oman to win in 99 balls',
	// 	'desc': 'Rashid, Archer, Wood lead line with the ball as England chase 48 in 19 balls',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/icc-men-s-t20-world-cup-2024-1411166/england-vs-oman-28th-match-group-b-1415728/match-report'
	// },
	// {
	// 	'title': 'Rainy Florida awaits confident USA and demoralised Ireland',
	// 	'desc': "A flash-flood emergency is likely to wash out the game, in which case USA will qualify for the Super Eight at Ireland and Pakistan's expense",
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/icc-men-s-t20-world-cup-2024-1411166/united-states-of-america-vs-ireland-30th-match-group-a-1415730/match-preview'
	// },
	// {
	// 	'title': 'Bryce sisters power The Blaze to eight wins in a row',
	// 	'desc': "Sunrisers' hopes of semi-final berth are all but over after eight-wicket loss",
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/charlotte-edwards-cup-2024-1410505/sunrisers-vs-the-blaze-30th-match-1410537/match-report'
	// },
	// {
	// 	'title': "Michael Jones: 'If David Warner opens the bowling it'd be pretty funny'",
	// 	'desc': 'Scotland opener finds the humour in run-rate rumpus ahead of Australia showdown',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/t20-world-cup-michael-jones-on-run-rate-furore-if-david-warner-opens-the-bowling-it-d-be-pretty-funny-1438527'
	// },
	// {
	// 	'title': 'South Africa target four-in-four with Nepal preparing for Kingstown party',
	// 	'desc': 'For Nepal, ace legspinner Sandeep Lamichhane is on board and could be in line for his first match of the T20 World Cup',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/icc-men-s-t20-world-cup-2024-1411166/nepal-vs-south-africa-31st-match-group-d-1415731/match-preview'
	// },
	// {
	// 	'title': 'Shakib, Rishad and Mustafizur take Bangladesh one step closer to Super Eight',
	// 	'desc': 'Thanks to this result, Sri Lanka are out of contention to qualify from Group D',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/icc-men-s-t20-world-cup-2024-1411166/bangladesh-vs-netherlands-27th-match-group-d-1415727/match-report'
	// },
	// {
	// 	'title': 'Florida weatherwatch: Last three Group A games set to be affected',
	// 	'desc': 'A tropical disturbance has brought a rare flash flood emergency to southern Florida, including to Broward County, where the matches are scheduled',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/t20-world-cup-2024-florida-weather-usa-vs-ireland-canada-vs-india-ireland-vs-pakistan-could-be-affected-1438506'
	// },
	// {
	// 	'title': 'Cardiff washout dents Western Storm, Thunder prospects',
	// 	'desc': "Match abandoned without a ball bowled to dent teams' qualification prospects",
	// 	'link': 'https://www.espncricinfo.com/cricket-news/series/charlotte-edwards-cup-2024-1410505/western-storm-vs-thunder-29th-match-1410536/match-report'
	// },
	// {
	// 	'title': 'Rocky Flintoff signs first Lancashire contract aged 16',
	// 	'desc': 'Teenage batter following in footsteps of father Andrew, who spent his career at Lancs',
	// 	'link': 'https://www.espncricinfo.com/cricket-news/story/rocky-flintoff-signs-first-lancashire-contract-16-1438497'
	// }]
	// tmp = [{ "return_format": "news", "question": "123", "output": tmp }]
	///////////////////////////////////////////////



	const fetchDataFromServer = async (matchType) => {
		
		let response = await fetch("http://localhost:6969/api/fetch-latest-news")

		let jsonData = await response.json()
		setResponseItems(responseItems => [...responseItems, jsonData["response"]])
		console.log(jsonData)
		setIsInputDisabled(false)
	}

	let clearChats = () => {
		setResponseItems([])
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		setIsInputDisabled(true)

		fetchDataFromServer()
	}
	return (

		<div className="overall-container">


			<LeftPanel clearChats={clearChats}/>

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