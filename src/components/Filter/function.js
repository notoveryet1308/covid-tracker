import { STATE_KEY_AND_NAME, STATE_CODE_AND_NAME } from '../../constants'

export const getSearchData = (lookUpValue, source, updateValueHook) => {
	lookUpValue = lookUpValue.split(' ').join('').toLowerCase()
	let state
	state = STATE_KEY_AND_NAME.find((el) => {
		if (el.name.split(' ').join('').toLocaleLowerCase() === lookUpValue) {
			return el
		}
		return null
	})

	let searchData = []
	if (state && !localStorage.getItem(`search-${state.key}-data`)) {
		searchData = { [state.key]: source[state.key] }
		localStorage.setItem(`search-${state.key}-data`, JSON.stringify(searchData))
	} else if (state && localStorage.getItem(`search-${state.key}-data`)) {
		searchData = JSON.parse(localStorage.getItem(`search-${state.key}-data`))
	}

	if (lookUpValue && state) {
		updateValueHook({ isActive: true, data: searchData })
	} else if (lookUpValue && !state) {
		updateValueHook({ isActive: true, data: null })
	} else if (!lookUpValue) {
		updateValueHook({ isActive: false, data: null })
	}
}

export const getDateData = (lookUpDate, source = {}, updateValueHook) => {
	const sourceKeys = Object.keys(source)

	const dateData =
		JSON.parse(localStorage.getItem(`date-${lookUpDate}-data`)) || {}

	lookUpDate &&
		!localStorage.getItem(`date-${lookUpDate}-data`) &&
		sourceKeys.forEach((key) => {
			const data = source[key]['dates'][lookUpDate]

			if (data) {
				dateData[key] = data
			}
		})

	if (dateData.length > 0 && !localStorage.getItem(`date-${lookUpDate}-data`)) {
		localStorage.setItem(`date-${lookUpDate}-data`, JSON.stringify(dateData))
	}

	if (lookUpDate && Object.keys(dateData).length > 0) {
		updateValueHook({ isActive: true, data: dateData })
	} else if (lookUpDate && Object.keys(dateData).length <= 0) {
		updateValueHook({ isActive: true, data: null })
	} else if (!lookUpDate) {
		updateValueHook({ isActive: false, data: null })
	}
}
