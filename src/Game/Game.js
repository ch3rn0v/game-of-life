import React from 'react';
import { GameStats } from './GameStats';
import { GameField } from './GameField';

import { createEmptyGameField, processNextGeneration, updateCellStateInArray } from './lib/gameHelper';

// Field's sizes:
const DEFAULT_GAME_FIELD_WIDTH = 60;
const DEFAULT_GAME_FIELD_HEIGTH = 30;

// Time for each generation to be displayed.
//1000 — 1 generation per second. 500 — 2 generations per second, etc.
const DEFAULT_GAME_SPEED = 2500;

export class Game extends React.Component {
	gameInterval = null;

	constructor(props) {
		super(props);

		this.state = {
			gameStateArray: createEmptyGameField(DEFAULT_GAME_FIELD_WIDTH, DEFAULT_GAME_FIELD_HEIGTH),
			generationsCount: 0
		};

		this.gameInterval = setInterval(this.ticker, DEFAULT_GAME_SPEED);
	}

	ticker = () => {
		this.setState({
			gameStateArray: processNextGeneration(this.state.gameStateArray),
			generationsCount: this.state.generationsCount + 1
		});
	};

	updateCellState = (x, y, oldState) => {
		const newCellState = oldState === 0 ? 1 : 0;
		this.setState({
			gameStateArray: updateCellStateInArray(x, y, newCellState, this.state.gameStateArray)
		});
	};

	componentWillUnount() {
		clearInterval(this.gameInterval);
	}

	render() {
		const { gameStateArray, generationsCount } = this.state;

		return (
			<div>
				<GameStats generationsCount={generationsCount} />
				{/*<GameControls /> */}
				<GameField gameStateArray={gameStateArray} updateCellState={this.updateCellState} />
			</div>
		);
	}
}
