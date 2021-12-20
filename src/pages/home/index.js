import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { DataContext } from '../../context/DataProvider'
import Card from '../../components/Card'
import { STATE_CODE_AND_NAME } from '../../constants'
import { Container } from '../../components/layout'
import Loader from '../../components/Loader'
import NoData from '../../components/NoData'
import Filter from '../../components/Filter'
import { getDateData, getSearchData, sortData } from './function'

export default function Home() {
	const { minData, timeSeriesData } = useContext(DataContext)
	const [districtData, setDistrictData] = useState(null)
	const showDistrictData = (code) => {
		const data = minData[code].districts
		setDistrictData(data)
	}
	const [dataToDisplay, setDataToDisplay] = useState(null)
	const [filterValue, setFilterValue] = useState(null)
	const handleFilter = (id, data) => {
		setFilterValue({ [id]: data })
	}

	useEffect(() => {
		const id = filterValue && Object.keys(filterValue)[0]
		if (timeSeriesData && minData) {
			if (id === 'date') {
				const dateData = getDateData(filterValue[id], timeSeriesData)
				setDataToDisplay(dateData)
			}

			if (id === 'search') {
				const searchData = getSearchData(filterValue[id], minData)
				setDataToDisplay(searchData)
			}
			if (id === 'sort') {
				const sortedData = sortData(filterValue[id], minData)
				setDataToDisplay(sortedData)
			}
		}
	}, [filterValue])

	useEffect(() => {
		setDataToDisplay(minData)
	}, [minData])

	if (!dataToDisplay) {
		return <Loader />
	}

	return (
		<Container>
			<div className='page-filter'>
				<h3>STATES</h3>
				<Filter
					sortOptions={[{ label: 'Confirmed' }]}
					handleFilter={handleFilter}
				/>
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
