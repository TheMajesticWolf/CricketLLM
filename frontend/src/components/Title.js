import React from 'react'

const Title = ({ subtitle }) => {
	return (
		<div className="title">
			<h2>Welcome to Chai and Cricket</h2>
			<h3>{subtitle}</h3>
		</div>
	)
}

export default Title