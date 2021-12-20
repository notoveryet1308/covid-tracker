function debounce(fn, delay) {
	let timer
	return function () {
		const ctx = this
		const args = arguments
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(ctx, [...args])
		}, delay)
	}
}

export { debounce }
