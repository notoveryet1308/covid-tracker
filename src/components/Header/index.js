import Filter from '../Filter'
import { Container } from '../layout'
import './style.css'

export default function Header() {
	return (
		<header className='Main-header'>
			<div className='Main-header__title'>
				<Container>
					<h1>Covid tracker - India</h1>
				</Container>
			</div>
		</header>
	)
}
