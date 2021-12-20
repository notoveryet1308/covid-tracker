import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../components/layout'
import Filter from '../../components/Filter'
import { DataContext } from '../../context/DataProvider'
import './style.css'
import Table from '../../components/Table'
import Loader from '../../components/Loader'

const processTableData = (dates = {}) => {
	const processedData = []
	const keys = Object.keys(dates)
	keys.length > 0 &&
		keys.forEach((el) => {
			const date = el
			const data = dates[el]
			const recovered = data?.total?.recovered || 0
			const confirmed = data?.total?.confirmed || 0
			const deceased = data?.total?.deceased || 0
			const delta = data?.delta || {}
			const delta7 = data?.delta7 || {}

			processedData.push({
				date,
				recovered,
				confirmed,
				deceased,
				delta,
				'delta 7': delta7,
			})
		})

	return processedData
}
const config = {
	headCols: ['date', 'confirmed', 'recovered', 'deceased', 'delta', 'delta 7'],
}
export default function Detail() {
	const { stateName, stateCode } = useParams()
	const { timeSeriesData } = useContext(DataContext)



	if (!timeSeriesData) {
		return <Loader />
	}
	return (
		<Container>
			<div className='detail'>
				<div className='page-filter'>
					<h3>{stateName.split('-').join(' ')}</h3>
					{/* <Filter
						search={false}
						sortOptions={[{ label: 'Confirmed' }]}
						
					/> */}
				</div>
				<main className='detail__main'>
					<Table
						config={config}
						data={processTableData(timeSeriesData[stateCode]['dates'])}
					/>
				</main>
			</div>
		</Container>
	)
}

// AN
// :
// {dates: {…}}

// dates
// :
// {2020-03-26: {…}, 2020-03-27: {…}, 2020-03-28: {…},…}

// 2020-03-26
// :
// {delta: {…}, delta7: {…}, total: {…}}

// {date: "", recovered, confirmed, deceased, delta, delta7}
