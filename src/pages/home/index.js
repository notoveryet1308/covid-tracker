import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { DataContext } from '../../context/DataProvider'
import Card from '../../components/Card'
import { STATE_CODE_AND_NAME } from '../../constants'
import { Container } from '../../components/layout'
import Loader from '../../components/Loader'
import NoData from '../../components/NoData'
import Filter from '../../components/Filter'

export default function Home() {
	const { minData, searchData, dateData, sortedData, activeSort } =
		useContext(DataContext)
	const [districtData, setDistrictData] = useState(null)
	const showDistrictData = (code) => {
		const data = minData[code].districts
		setDistrictData(data)
	}
	const [dataToDisplay, setDataToDisplay] = useState(null)

	useEffect(() => {
		console.log({ len: Object.keys(sortedData).length })
		if (activeSort.label && Object.keys(sortedData).length > 0) {
			setDataToDisplay(sortedData)
		} else if (searchData.isActive) {
			setDataToDisplay(searchData.data || {})
		} else if (dateData.isActive) {
			setDataToDisplay(dateData.data || {})
		} else {
			setDataToDisplay(minData)
		}
	}, [
		minData,
		searchData.data,
		dateData.data,
		searchData.isActive,
		dateData.isActive,
		activeSort.label,
		sortedData,
	])

	if (!dataToDisplay) {
		return <Loader />
	}

	return (
		<Container>
			<div className='page-filter'>
				<h3>STATES</h3>
				<Filter sortOptions={[{ label: 'Confirmed' }]} />
			</div>
			{dataToDisplay && Object.keys(dataToDisplay).length <= 0 && <NoData />}
			{districtData && (
				<button
					className='clearDistrictData'
					onClick={() => setDistrictData(null)}>
					Back
				</button>
			)}
			<div className='home'>
				{!districtData
					? Object.keys(dataToDisplay).map((key) => {
							const stateData = dataToDisplay[key]
							return (
								<Card
									key={key}
									stateName={STATE_CODE_AND_NAME[key]}
									data={stateData}
									isSateCard={true}
									showDistrictData={() => showDistrictData(key)}
									stateCode={key}
								/>
							)
					  })
					: Object.keys(districtData).map((key) => {
							return (
								<Card
									key={key}
									districtName={key}
									data={districtData[key]}
									isDistrictCard={true}
								/>
							)
					  })}
			</div>
		</Container>
	)
}
