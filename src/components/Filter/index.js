import React, { useState } from 'react'
import { debounce } from '../../utils/functions'

import Sort from './sort'

import './style.css'

const debounceSearch = debounce((handleFn, id, data) => {
	handleFn(id, data)
}, 500)

export default function Filter({ sortOptions, search = true, handleFilter }) {
	const [searchInput, setSearchInput] = useState('')
	const [dateInput, setDateInput] = useState('')

	const handleSearch = (e) => {
		const value = e.target.value
		setSearchInput(value)
		debounceSearch(handleFilter, e.target.id, value)
	}

	const handleDate = (e) => {
		const date = e.target.value
		setDateInput(date)
		handleFilter(e.target.id, date)
	}

	return (
		<div className='filter'>
			{search && (
				<input
					id='search'
					type='text'
					onChange={handleSearch}
					value={searchInput}
					placeholder='search'
				/>
			)}
			<input type='date' id='date' onChange={handleDate} value={dateInput} />
			<Sort options={sortOptions} handleFilter={handleFilter} />
		</div>
	)
}
