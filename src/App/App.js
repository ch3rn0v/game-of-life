import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Game } from '../Game/Game';
import './App.css';

export class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Header />
				{/*<UserInstructions />*/}
				<Game />
				<Footer />
			</div>
		);
	}
}
