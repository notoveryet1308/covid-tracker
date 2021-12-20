const minDataURL = 'https://data.covid19india.org/v4/min/data.min.json'
const timeSeriesDataURL =
	'https://data.covid19india.org/v4/min/timeseries.min.json'

const getData = async ({ url }) => {
	let response = await fetch(url, { method: 'GET' })
	response = await response.json()
	return response
}

export const getCovidMinData = async () => {
	return await getData({ url: minDataURL })
}

export const getCovidTimeSeriesData = async () => {
	return await getData({ url: timeSeriesDataURL })
}
