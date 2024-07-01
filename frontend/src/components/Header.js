import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
	return (
		
		<nav>
			<div className="navbar-container">
				<ul className="navbar">
					<li className="nav-item"><Link to="/chat">Chat</Link></li>
					<li className="nav-item"><Link>About</Link></li>
					{/* <li className="nav-item"><Link>Contact</Link></li> */}
				</ul>
			</div>
		</nav>

	)
}

export default Header