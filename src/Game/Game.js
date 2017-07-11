import React from 'react';
import Math from 'mathjs';

import { GameStats } from './GameStats';
import { GameControls } from './GameControls';
import { GameField } from './GameField';

import {
	createEmptyGameField,
	processNextGeneration,
	updateCellStateInArray,
	calculateCurrentStats
} from './lib/gameHelper';

// Field's sizes:
const DEFAULT_GAME_FIELD_WIDTH = 40;
const DEFAULT_GAME_FIELD_HEIGTH = 20;

// Time for each generation to be displayed.
//1000 — 1 generation per second. 50 — 20 generations per second, etc.
const DEFAULT_INTERVAL_TIME = 125;

export class Game extends React.Component {
	gameInterval = null;

	constructor(props) {
		super(props);

		const { initialGameField, newcomers } = createEmptyGameField(
			DEFAULT_GAME_FIELD_WIDTH,
			DEFAULT_GAME_FIELD_HEIGTH
		);

		this.state = {
			isRunning: true,
			gameStateArray: initialGameField,
			newcomersCoords: newcomers,
			generationsCount: 0,
			intervalTime: DEFAULT_INTERVAL_TIME,
			aliveAtThisGeneration: 0,
			emptyAtThisGeneration: 0,
			isMouseDown: false
		};

		this.gameInterval = setInterval(this.ticker, this.state.intervalTime);
	}

	ticker = () => {
		const { aliveAtThisGeneration, emptyAtThisGeneration } = calculateCurrentStats(this.state.gameStateArray);
		const { nextGeneration, newcomers } = processNextGeneration(
			this.state.gameStateArray,
			this.state.newcomersCoords
		);

		this.setState({
			gameStateArray: nextGeneration,
			newcomersCoords: newcomers,
			generationsCount: this.state.generationsCount + 1,
			aliveAtThisGeneration: aliveAtThisGeneration,
			emptyAtThisGeneration: emptyAtThisGeneration
		});
	};

	onGamePause = () => {
		clearInterval(this.gameInterval);
		this.setState({
			isRunning: false
		});
	};

	onGameResume = () => {
		this.setState({
			isRunning: true
		});
		this.gameInterval = setInterval(this.ticker, this.state.intervalTime);
	};

	onGameReset = () => {
		this.onGamePause();
		const { initialGameField, newcomers } = createEmptyGameField(
			DEFAULT_GAME_FIELD_WIDTH,
			DEFAULT_GAME_FIELD_HEIGTH
		);

		this.setState({
			gameStateArray: initialGameField,
			newcomersCoords: newcomers,
			generationsCount: 0,
			aliveAtThisGeneration: 0,
			emptyAtThisGeneration: 0,
			isMouseDown: false
		});
	};

	onGameSpeedChange = (newIntervalTime) => {
		this.setState({
			intervalTime: newIntervalTime
		});
		this.onGamePause();
		if (this.state.isRunning) {
			this.onGameResume();
		}
	};

	onMouseDown = () => {
		this.setState({
			isMouseDown: true
		});
	};

	onMouseUp = () => {
		this.setState({
			isMouseDown: false
		});
	};

	updateCellState = (x, y, oldState, movementBegins) => {
		if (this.state.isMouseDown || movementBegins) {
			const newCellState = oldState === 0 ? 1 : 0;
			this.setState({
				gameStateArray: updateCellStateInArray(x, y, newCellState, this.state.gameStateArray)
			});
		}
	};

	componentWillUnount() {
		clearInterval(this.gameInterval);
	}

	render() {
		const {
			gameStateArray,
			newcomersCoords,
			generationsCount,
			intervalTime,
			aliveAtThisGeneration,
			emptyAtThisGeneration,
			isRunning
		} = this.state;

		// There is always one generation per interval time.
		// So divide one generation by interval time (which is divided by 1000 to convert it from ms to seconds).
		const currentSpeed = Math.round(1000 / intervalTime);

		return (
			<div className="game-wrapper">
				<GameStats
					generationsCount={generationsCount}
					currentSpeed={currentSpeed}
					aliveAtThisGeneration={aliveAtThisGeneration}
					emptyAtThisGeneration={emptyAtThisGeneration}
				/>
				<GameControls
					isRunning={isRunning}
					resumeFunc={this.onGameResume}
					pauseFunc={this.onGamePause}
					resetFunc={this.onGameReset}
					changeSpeedFunc={this.onGameSpeedChange}
					currentSpeed={currentSpeed}
				/>
				<GameField
					gameStateArray={gameStateArray}
					newcomersCoords={newcomersCoords}
					onMouseDown={this.onMouseDown}
					onMouseUp={this.onMouseUp}
					updateCellState={this.updateCellState}
				/>
			</div>
		);
	}
}