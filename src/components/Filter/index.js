import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataProvider'
import { debounce } from '../../utils/functions'
import { getSearchData, getDateData } from './function'
import Sort from './sort'

import './style.css'

const debounceSearch = debounce(getSearchData, 500)

export default function Filter({ sortOptions, search = true }) {
	const {
		setSearchData,
		setDateData,
		minData,
		timeSeriesData,
		setActiveSort,
		activeSort,
	} = useContext(DataContext)
	const [searchInput, setSearchInput] = useState('')
	const [dateInput, setDateInput] = useState('')

	const handleSearch = (e) => {
		const value = e.target.value
		setSearchInput(value)
		if (dateInput) {
			setDateData({ isActive: false, data: null })
			setDateInput('')
		}
		if (activeSort.label) {
			console.log('did update')
			setActiveSort({ label: null, ascend: null, decend: null })
		}
	}

	const handleDate = (e) => {
		const date = e.target.value
		setDateInput(date)
		if (searchInput) {
			setSearchData({ isActive: false, data: null })
			setSearchInput('')
		}
		if (activeSort.label) {
			console.log('did update')
			setActiveSort({ label: null, ascend: null, decend: null })
		}
	}

	useEffect(() => {
		minData && debounceSearch(searchInput, minData, setSearchData)
	}, [minData, searchInput])

	useEffect(() => {
		timeSeriesData && getDateData(dateInput, timeSeriesData, setDateData)
	}, [timeSeriesData, dateInput])

	return (
		<div className='filter'>
			{search && (
				<input
					type='text'
					onChange={handleSearch}
					value={searchInput}
					placeholder='search'
				/>
			)}
			<input type='date' id='date' onChange={handleDate} value={dateInput} />
			<Sort options={sortOptions} />
		</div>
	)
}
