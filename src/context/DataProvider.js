import { createContext, useState, useEffect } from 'react'
import { getCovidMinData, getCovidTimeSeriesData } from '../API'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
	const [minData, setMinData] = useState(null)
	const [timeSeriesData, setTimeSeriesData] = useState(null)
	const [searchData, setSearchData] = useState({ isActive: false, data: null })
	const [dateData, setDateData] = useState({ isActive: false, data: null })
	const [activeSort, setActiveSort] = useState({
		label: null,
		ascend: false,
		decend: false,
	})
	const [sortedData, setSortedData] = useState({})

	useEffect(() => {
		const helper = async () => {
			const minData = await getCovidMinData()
			const timeSeriesData = await getCovidTimeSeriesData()
			return { minData, timeSeriesData }
		}

		helper().then((response) => {
			let { minData, timeSeriesData } = response
			setMinData(minData)
			setTimeSeriesData(timeSeriesData)
		})
	}, [])

	useEffect(() => {
		if (minData && activeSort.label) {
			const keys = Object.keys(minData)
			const sorting = keys.sort((a, b) => {
				const data1 = minData[a]
				const data2 = minData[b]
				if (activeSort.ascend) {
					return data1.total[activeSort.label] - data2.total[activeSort.label]
				}
				if (activeSort.decend) {
					return data2.total[activeSort.label] - data1.total[activeSort.label]
				}
			})

			const sorted = {}
			sorting.forEach((el) => {
				const key = el.toString()
				sorted[key] = minData[key]
			})

			setSortedData(sorted)
		}
	}, [activeSort.label, activeSort.ascend, activeSort.decend])

	return (
		<DataContext.Provider
			value={{
				minData,
				timeSeriesData,
				searchData,
				setSearchData,
				dateData,
				setDateData,
				setActiveSort,
				sortedData,
				activeSort
			}}>
			{children}
		</DataContext.Provider>
	)
}
