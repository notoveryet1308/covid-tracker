const genData = (key, source) => {
	const data = source[key]
	const recovered = data?.total?.recovered || 0
	const confirmed = data?.total?.confirmed || 0
	const deceased = data?.total?.deceased || 0
	const delta = data?.delta || {}
	const delta7 = data?.delta7 || {}

	return { recovered, confirmed, deceased, delta7, delta }
}

export const processTableData = (dates = {}) => {
	const processedData = []
	const keys = Object.keys(dates)
	for (let i = 0; i < keys.length; i++) {
		const dateKey = keys[i]
		const { recovered, confirmed, deceased, delta7, delta } = genData(
			dateKey,
			dates,
		)
		processedData.push({
			date: dateKey,
			recovered,
			confirmed,
			deceased,
			delta,
			'delta 7': delta7,
		})
	}

	return processedData
}

export const sortTableData = (source = [], sort) => {
	return source.sort((data1, data2) => {
		if (sort.ascend) {
			return data1[sort.label] - data2[sort.label]
		}
		if (sort.decend) {
			return data2[sort.label] - data1[sort.label]
		}
	})
}
export const getFilterDateData = (dates = {}, date) => {
	const { recovered, confirmed, deceased, delta7, delta } = genData(date, dates)

	return [{ date, recovered, confirmed, deceased, delta7, delta }]
}