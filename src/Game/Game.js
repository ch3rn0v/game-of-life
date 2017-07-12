import React from 'react';
import Math from 'mathjs';

import { GameStats } from './GameStats';
import { GameControls } from './GameControls';
import { GameField } from './GameField';
import { GameChart } from './GameChart';

import {
	createEmptyGameField,
	processNextGeneration,
	updateCellStateInArray,
	calculateCurrentStats,
	CalculateChartData
} from './lib/gameHelper';

// Field's default sizes:
const DEFAULT_GAME_FIELD_WIDTH = 40;
const DEFAULT_GAME_FIELD_HEIGTH = 20;

// Time for each generation to be displayed.
// 1000 — 1 generation per second. 50 — 20 generations per second, etc.
const DEFAULT_INTERVAL_TIME = 100;

export class Game extends React.Component {
	gameInterval = null;

	constructor(props) {
		super(props);

		const { initialGameField, newcomers } = createEmptyGameField(
			DEFAULT_GAME_FIELD_WIDTH,
			DEFAULT_GAME_FIELD_HEIGTH
		);

		const { aliveAtThisGeneration, emptyAtThisGeneration } = calculateCurrentStats(initialGameField);

		this.state = {
			isRunning: true,
			gameStateArray: initialGameField,
			newcomersCoords: newcomers,
			chartData: CalculateChartData(
				[],
				aliveAtThisGeneration,
				DEFAULT_GAME_FIELD_WIDTH * DEFAULT_GAME_FIELD_HEIGTH,
				1
			),
			generationsCount: 1,
			intervalTime: DEFAULT_INTERVAL_TIME,
			aliveAtThisGeneration: aliveAtThisGeneration,
			emptyAtThisGeneration: emptyAtThisGeneration,
			isMouseDown: false
		};

		this.gameInterval = setInterval(this.ticker, this.state.intervalTime);
	}

	ticker = () => {
		// Pause if there is no one alive.
		if (aliveAtThisGeneration === 0) {
			this.onGamePause();
		}

		const { nextGeneration, newcomers } = processNextGeneration(
			this.state.gameStateArray,
			this.state.newcomersCoords
		);
		const { aliveAtThisGeneration, emptyAtThisGeneration } = calculateCurrentStats(nextGeneration);
		const nextGenerationIndex = this.state.generationsCount + 1;
		const nextGenerationChartData = CalculateChartData(
			this.state.chartData,
			aliveAtThisGeneration,
			emptyAtThisGeneration,
			nextGenerationIndex
		);

		this.setState({
			gameStateArray: nextGeneration,
			newcomersCoords: newcomers,
			chartData: nextGenerationChartData,
			generationsCount: nextGenerationIndex,
			aliveAtThisGeneration: aliveAtThisGeneration,
			emptyAtThisGeneration: emptyAtThisGeneration
		});
	};

	onGamePause = () => {
		clearInterval(this.gameInterval);
		this.setState({ isRunning: false });
	};

	onGameResume = () => {
		this.setState({ isRunning: true });
		this.gameInterval = setInterval(this.ticker, this.state.intervalTime);
	};

	onGameReset = () => {
		this.onGamePause();
		const { initialGameField, newcomers } = createEmptyGameField(
			DEFAULT_GAME_FIELD_WIDTH,
			DEFAULT_GAME_FIELD_HEIGTH
		);

		const { aliveAtThisGeneration, emptyAtThisGeneration } = calculateCurrentStats(initialGameField);

		this.setState({
			gameStateArray: initialGameField,
			newcomersCoords: newcomers,
			generationsCount: 1,
			chartData: CalculateChartData(
				[],
				aliveAtThisGeneration,
				DEFAULT_GAME_FIELD_WIDTH * DEFAULT_GAME_FIELD_HEIGTH,
				1
			),
			aliveAtThisGeneration: aliveAtThisGeneration,
			emptyAtThisGeneration: emptyAtThisGeneration,
			isMouseDown: false
		});
	};

	onGameSpeedChange = (newIntervalTime) => {
		this.setState({ intervalTime: newIntervalTime });
		this.onGamePause();
		if (this.state.isRunning) {
			this.onGameResume();
		}
	};

	onMouseDown = () => {
		this.setState({ isMouseDown: true });
	};

	onMouseUp = () => {
		this.setState({ isMouseDown: false });
	};

	updateCellState = (x, y, oldState, cursorMovementBegins) => {
		if (this.state.isMouseDown || cursorMovementBegins) {
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
			chartData,
			generationsCount,
			intervalTime,
			aliveAtThisGeneration,
			emptyAtThisGeneration,
			isRunning
		} = this.state;

		// Divide one generation by interval time (which is divided by 1000 to convert it from ms to seconds).
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
				<div className="field-and-chart-wrapper">
					<GameField
						gameStateArray={gameStateArray}
						newcomersCoords={newcomersCoords}
						onMouseDown={this.onMouseDown}
						onMouseUp={this.onMouseUp}
						updateCellState={this.updateCellState}
					/>
					<GameChart chartData={chartData} />
				</div>
			</div>
		);
	}
}
