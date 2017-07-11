import React from 'react';
import PropTypes from 'prop-types';

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
	state = {
		cursorValue: 0
	};

	onCursorValueChange = (newCursorValue) => {
		if (newCursorValue !== undefined && newCursorValue !== null) {
			this.setState({ cursorValue: newCursorValue });
		}
	};

	calculateCellCountByGeneration = (chartData, generation) => {
		const index = chartData.findIndex((dataObject) => {
			return dataObject.generation === generation;
		});
		if (index >= 0) {
			return chartData[index].aliveAtThisGeneration;
		} else {
			return 0;
		}
	};

	render() {
		const chartData = this.props.chartData;
		const aliveCellsAreaStyle = {
			data: { fill: '#990000' }
		};
		const emptyCellsAreaStyle = {
			data: { fill: '#84c26e' }
		};

		const cursorIsInTheLeftHalf = this.state.cursorValue < 0.5 * chartData[chartData.length - 1].generation;

		let cursorLabelShiftX,
			cursorLabelShiftY = 0;

		const cursorPickedGeneration = Math.round(this.state.cursorValue);
		const aliveCellsAtCursorPickedGeneration =
			cursorPickedGeneration > 0
				? this.calculateCellCountByGeneration(chartData, cursorPickedGeneration)
				: chartData[0].aliveAtThisGeneration;

		if (cursorIsInTheLeftHalf) {
			cursorLabelShiftX = 20;
		} else {
			cursorLabelShiftX = -125;
		}

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
							cursorLabelOffset={{
								x: cursorLabelShiftX,
								y: cursorLabelShiftY
							}}
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
