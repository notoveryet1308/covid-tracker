import Header from './components/Header'
import Home from './pages/home'
import { Route, Routes } from 'react-router-dom'
import Detail from './pages/detail'
function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/state/:stateCode/:stateName' element={<Detail />} />
			</Routes>
		</div>
	)
}

export default App
