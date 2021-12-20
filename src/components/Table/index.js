import './style.css'

export default function Table({ config = [], data = [] }) {
	console.log({ data })
	return (
		<div className='table'>
			{config.headCols.map((el, index) => (
				<div className='table-cell' key={`${el}-${index}`}>
					<p>{el}</p>
				</div>
			))}
			{data.map((el) => {
				return config.headCols.map((d) => (
					<TableCellGen
						id={d}
						source={el}
						subConfig={['confirmed', 'recovered', 'deceased']}
					/>
				))
			})}
		</div>
	)
}

const TableCellGen = ({ id, source, subConfig = [] }) => {
	const display = source[id]

	if (typeof display !== 'object') {
		return (
			<div className='table-cell'>
				<p>{display}</p>
			</div>
		)
	} else {
		return (
			<div className='table-cell'>
				{subConfig.map((d) => (
					<p>{`${d}: ${display[d] || 0}`}</p>
				))}
			</div>
		)
	}
}
