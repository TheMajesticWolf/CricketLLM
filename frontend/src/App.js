import Header from './components/Header';
import HomePage from './components/HomePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import IPLPointsTable from './components/IPLPointsTable';
import PlayerProfiles from './components/PlayerProfiles';
import './components/style.css'
import LatestNews from './components/LatestNews';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
	return (
		
		<Router>

			{/* <Header /> */}



			<Routes>

				<Route path="/" element={<LoginPage />}/>
				<Route path="/signup" element={<SignupPage />}/>
				<Route element={<PrivateRoutes />}>
					<Route path="/chat" element={<HomePage />}/>
					<Route path="/points-table" element={<IPLPointsTable />}/>
					<Route path="/player-profiles" element={<PlayerProfiles />}/>
					<Route path="/latest-news" element={<LatestNews />}/>

				</Route>

			</Routes>

		</Router>



		);
}

export default App;
