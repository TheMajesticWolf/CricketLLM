import React from 'react'
import { Link } from 'react-router-dom'


const RenderOutput = ({ frontendList }) => {

	return (

		<>

			{
				frontendList && frontendList.map((object, idx) => (

					<div className="response-item" key={idx}>

						{(object["return_format"] == "string") && <>


							<div className="response-output">
								<p><b><u>User</u></b></p>
								<p>{object["question"]}</p>
							</div>
							<div className="response-output">
								<p><b><u>CricketLLM</u></b></p>
								<p>{object["output"]}</p>

							</div>

						</>
						}


						{(object["return_format"] == "ipl_points_table") && <>

							<div className="response-output">
								<p><b><u>User</u></b></p>
								<p>{object["question"]}</p>
							</div>
							<div className="response-output">
								<p><b><u>CricketLLM</u></b></p>

							</div>

							{/* **************************************************************************** */}
							<div className="points-table-container response-output">

								{object["thumbnail"] && <img src={object["thumbnail"]} alt="" />}


								{
									Object.keys(object["output"]).map((key) => (
										<div className="points-table">


											{/*For title of table*/}
											<h3>{key}</h3>

											<table>
												<thead>
													<tr>
														{object["output"][key][0].map((ele, idx) => (
															<th>{ele}</th>
														))}
													</tr>
												</thead>
												<tbody>
													{object["output"][key].slice(1).map((row, idx) => (
														<tr key={idx}>
															{row.map((col) => (
																<td>{col}</td>
															))}
														</tr>
													))}

												</tbody>
											</table>

										</div>
									))
								}
							</div>



							{/* **************************************************************************** */}
						</>}


						{(object["return_format"] == "help_text") && <>
							<div className="response-output">
								<p><b><u>User</u></b></p>
								<p>{object["question"]}</p>
							</div>
							<div className="response-output">
								<p><b><u>CricketLLM</u></b></p>

							</div>

							<div className="response-output">

								<ul style={{ listStylePosition: "inside", textIndent: "10px" }}>
									<li><strong>IPL Points Table:</strong>
										<ul>
											<li>To fetch the latest IPL points table, simply ask:</li>
											<li>"points table ipl" will return the points table of all the years IPL has been played</li>
										</ul>
									</li>
									<hr />
									<li><strong>Player Profiles:</strong>
										<ul>
											<li>To get a detailed profile of a specific player, ask:</li>
											<li>"player profile of [Player Name]"</li>
											<li>For example, "player profile of virat kohli" will return information about Virat Kohli.</li>
										</ul>
									</li>
									<hr />
									<li><strong>Videos:</strong>
										<ul>
											<li>To get a list of videos of videos on a specifi topic, ask:</li>
											<li>"videos of [topic]"</li>
											<li>For example, "videos of india vs pakistan t20" will return a list of 3 videos.</li>
										</ul>
									</li>
									<hr />
									<li><strong>General Cricket Questions:</strong>
										<ul>
											<li>For any other cricket-related questions, just ask naturally:</li>
											<li>"Who won the last ODI match?"</li>
											<li>"What are the rules of T20 cricket?"</li>
											<li>Our system will try to provide the best possible answer from our database.</li>
										</ul>
									</li>
									<hr />
									<li><strong>Examples of Commands You Can Use:</strong>
										<ul>
											<li>"help"</li>
											<li>"points table ipl"</li>
											<li>"player profile of virat kohli"</li>
											<li>"videos of ms dhoni"</li>
											<li>"What is the length of pitch"</li>
											<li>"Who has the most centuries in Test cricket?"</li>
										</ul>
									</li>
									<hr />
								</ul>

							</div>
						</>}


						{(object["return_format"] == "videos_of_player") && <>
							<div className="response-output">
								<p><b><u>User</u></b></p>
								<p>{object["question"]}</p>
							</div>
							<div className="response-output">
								<p><b><u>CricketLLM</u></b></p>

							</div>

							<div className="response-output">
								{Object.keys(object["output"]).map((key, idx) => (
									<div className="video-box" style={{ textAlign: "center" }}>
										{/* <img src={object["output"][key]["thumbnails"]} alt="" /> */}
										<iframe width="500" height="280" src={object["output"][key]["embed_link"]} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
										<p><Link to={object["output"][key]["link"]}>{object["output"][key]["title"]}</Link></p>
									</div>
								))}
							</div>
						</>}

						{(object["return_format"] == "news") && <>

							<div className="response-output">
								<p><b><u>User</u></b></p>
								<p>{object["question"]}</p>
							</div>

							<div className="response-output">
								{
									Object.keys(object["output"]).map((key, idx) => (
										<>
											<h3>{object["output"][key]["title"]}</h3>
											<p>{object["output"][key]["desc"]}</p>
											<a href={object["output"][key]["link"]} style={{ color: "antiquewhite" }}>Link to full news</a>
											<hr />
										</>

									))
								}
							</div>
						</>}




					</div>




				))
			}


		</>

	)







}

export default RenderOutput