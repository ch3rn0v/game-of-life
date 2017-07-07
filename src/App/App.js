import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Header />
				{/*{<Game />}*/}
				<Footer />
			</div>
		);
	}
}

export default App;
