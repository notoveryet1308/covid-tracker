import React, { useState, useContext } from 'react'
import { DataContext } from '../../context/DataProvider'

import './style.css'

export default function Sort({ options = [], handleFilter }) {
	// const { setActiveSort } = useContext(DataContext)
	const [showDropdown, setShowDropdown] = useState(false)
	const [order, setOrder] = useState({ ascend: false, decend: false })
	return (
		<div className='filter-sort'>
			<div
				className='filter-sort__label'
				onClick={() => setShowDropdown(!showDropdown)}>
				<p>Sort by</p>
			</div>
			{showDropdown && (
				<div className='filter-sort__options'>
					{options.map((option) => {
						return (
							<div className='filter-sort__options--option'>
								<p>{option.label}</p>
								<div
									className='filter-sort__order'
									onClick={(e) => {
										setShowDropdown(false)

										if (e.target.className.includes('Ascend')) {
											handleFilter('sort', {
												ascend: true,
												decend: false,
												label: option.label.toLowerCase(),
											})
											setOrder({ ascend: true, decend: false })
										}
										if (e.target.className.includes('Decend')) {
											handleFilter('sort', {
												decend: true,
												ascend: false,
												label: option.label.toLowerCase(),
											})
											setOrder({ ascend: false, decend: true })
										}
									}}>
									<p
										className='filter-sort__order-Ascend'
										style={{ borderColor: order.ascend ? 'green' : '#e1e1e1' }}>
										<i className='fas fa-arrow-up'></i>
									</p>
									<p
										className='filter-sort__order-Decend'
										style={{ borderColor: order.decend ? 'green' : '#e1e1e1' }}>
										<i className='fas fa-arrow-down'></i>
									</p>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
