import React, { useState } from 'react'
import './style.css'
import { NavLink, useNavigate } from 'react-router-dom'

const stateOrder = ['total', 'delta', 'delta7']
const districtOrder = ['total', 'delta', 'delta7']

export default function Index({
	isSateCard = false,
	isDistrictCard = false,
	stateName = 'unknown',
	districtName = 'unknown',
	data,
	showDistrictData,
	stateCode,
}) {
	const navigate = useNavigate()
	let to = stateName.split(' ').join('-')
	// to = to.
	const order = isSateCard ? stateOrder : districtOrder
	const [currentData, setCurrentData] = useState({
		index: 0,
		data: data[order[0]],
	})

	const handleData = (value) => {
		const currentId = currentData.index + value
		setCurrentData({ index: currentId, data: data[order[currentId]] })
	}
	return (
		<div
			className='Card'
			onClick={(e) => {
				e.stopPropagation()
				isSateCard &&	navigate(`/state/${stateCode}/${to}`)
			}}>
			<div className='Card__info'>
				{isSateCard && (
					<>
						<h3>{stateName}</h3>
						<button
							className='Card__info--districtBtn'
							onClick={(e) => {
								e.stopPropagation()
								showDistrictData()
							}}>
							District
						</button>
					</>
				)}
				{isDistrictCard && <h3>{districtName}</h3>}
			</div>
			<div className='Card__data'>
				<h3>{order[currentData.index]}</h3>
				{data[order[currentData.index]] && (
					<>
						<h4>Confirmed: {data[order[currentData.index]].confirmed}</h4>
						<h4>Recovered: {data[order[currentData.index]].recovered}</h4>
						<h4>Deceased: {data[order[currentData.index]].deceased}</h4>
					</>
				)}
				{currentData.index > 0 && (
					<div
						className='goLeft side-btn'
						onClick={(e) => {
							e.stopPropagation()
							handleData(-1)
						}}>
						<i className='fas fa-angle-left'></i>
					</div>
				)}
				{currentData.index < 2 && (
					<div
						className='goRight side-btn'
						onClick={(e) => {
							e.stopPropagation()
							handleData(1)
						}}>
						<i className='fas fa-angle-right'></i>
					</div>
				)}
			</div>
		</div>
	)
}
