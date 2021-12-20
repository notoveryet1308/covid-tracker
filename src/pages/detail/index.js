import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../../components/layout'
import Filter from '../../components/Filter'
import { DataContext } from '../../context/DataProvider'
import './style.css'
import Table from '../../components/Table'
import Loader from '../../components/Loader'
import {processTableData, getFilterDateData, sortTableData} from './function'
 

const config = {
	headCols: ['date', 'confirmed', 'recovered', 'deceased', 'delta', 'delta 7'],
}
export default function Detail() {
	const { stateName, stateCode } = useParams()
	const { timeSeriesData } = useContext(DataContext)
	const [dataToDisplay, setDataToDisplay] = useState(null)
	const [filterValue, setFilterValue] = useState(null)
	const handleFilter = (id, data) => {
		setFilterValue({ [id]: data })
	}

	useEffect(() => {
		const id = filterValue && Object.keys(filterValue)[0]
		if (id === 'date') {
			const filteredData = getFilterDateData(
				timeSeriesData[stateCode]['dates'],
				filterValue[id],
			)
			setDataToDisplay(filteredData)
		}
		if (id === 'sort') {
			const source = processTableData(timeSeriesData[stateCode]['dates'])
			const sortedData = sortTableData(source, filterValue[id])
			setDataToDisplay(sortedData)
		}
	}, [filterValue])

	useEffect(() => {
		if (timeSeriesData) {
			setDataToDisplay(processTableData(timeSeriesData[stateCode]['dates']))
		}
	}, [stateCode, timeSeriesData])

	if (!timeSeriesData) {
		return <Loader />
	}
	return (
		<Container>
			<div className='detail'>
				<div className='page-filter'>
					<h3>{stateName.split('-').join(' ')}</h3>
					<Filter
						search={false}
						sortOptions={[{ label: 'Confirmed' }]}
						handleFilter={handleFilter}
					/>
				</div>
				<main className='detail__main'>
					{dataToDisplay && <Table config={config} data={dataToDisplay} />}
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
