import React from 'react';
import PropTypes from 'prop-types';

import { calculateCellCountByGeneration } from './lib/gameHelper';
import {
	VictoryChart,
	VictoryCursorContainer,
	VictoryAxis,
	VictoryLabel,
	VictoryStack,
	VictoryArea,
	VictoryTheme
} from 'victory';

export class GameChart extends React.Component {
	state = { cursorValue: 0 };

	onCursorValueChange = (newCursorValue) => {
		if (newCursorValue !== undefined && newCursorValue !== null) {
			this.setState({ cursorValue: newCursorValue });
		}
	};

	calculateCellCountByGeneration = (chartData, generation) => {
		return calculateCellCountByGeneration(chartData, generation);
	};

	render() {
		const chartData = this.props.chartData;
		const aliveCellsAreaStyle = { data: { fill: '#990000' } };
		const emptyCellsAreaStyle = { data: { fill: '#84c26e' } };

		let cursorLabelShiftX = 0;
		const cursorIsInTheLeftHalf = this.state.cursorValue < 0.7 * chartData[chartData.length - 1].generation;
		const lessThanTwoGenerationsDataIsGiven = chartData.length < 2;
		cursorIsInTheLeftHalf || lessThanTwoGenerationsDataIsGiven
			? (cursorLabelShiftX = 20)
			: (cursorLabelShiftX = -125);

		const cursorPickedGeneration = Math.round(this.state.cursorValue);
		const aliveCellsAtCursorPickedGeneration =
			cursorPickedGeneration > 0
				? this.calculateCellCountByGeneration(chartData, cursorPickedGeneration)
				: chartData[0].aliveAtThisGeneration;

		return (
			<div className="chart">
				<VictoryChart
					theme={VictoryTheme.material}
					width={400}
					height={280}
					containerComponent={
						<VictoryCursorContainer
							dimension="x"
							cursorLabel={(point) =>
								`Cells now alive: ${aliveCellsAtCursorPickedGeneration}\nat generation: ${cursorPickedGeneration}`}
							cursorLabelOffset={{ x: cursorLabelShiftX, y: 0 }}
							onChange={(newCursorValue) => {
								this.onCursorValueChange(newCursorValue);
							}}
						/>
					}
				>
					<VictoryAxis
						label
						axisLabelComponent={<VictoryLabel text="Generation index" dy={19} />}
						tickFormat={(x) => {
							if (x % 1 === 0) {
								return `${x}`;
							}
						}}
						crossAxis={false}
					/>
					<VictoryAxis
						label
						axisLabelComponent={<VictoryLabel text="Cells amount" dy={-31} />}
						tickFormat={(y) => {
							if (y % 1 === 0) {
								return `${y}`;
							}
						}}
						dependentAxis
						scale="sqrt"
						crossAxis={false}
					/>
					<VictoryStack>
						<VictoryArea
							data={chartData}
							x="generation"
							y="aliveAtThisGeneration"
							style={aliveCellsAreaStyle}
						/>
						<VictoryArea
							data={chartData}
							x="generation"
							y="emptyAtThisGeneration"
							style={emptyCellsAreaStyle}
						/>
					</VictoryStack>
				</VictoryChart>
			</div>
		);
	}
}

GameChart.propTypes = {
	chartData: PropTypes.array.isRequired
};
