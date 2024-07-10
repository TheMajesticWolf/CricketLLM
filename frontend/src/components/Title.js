import React from 'react'

const Title = ({ subtitle }) => {
	return (
		<div className="title">
			<h2>Welcome to <span style={{backgroundColor: "black", borderRadius: "10px"}}>Cricket <span style={{backgroundColor: "#E99E13", borderRadius: "0px 10px 10px 0px", color: 'black'}}>Hub</span></span></h2>
			<h3>{subtitle}</h3>
		</div>
	)
}

export default Title