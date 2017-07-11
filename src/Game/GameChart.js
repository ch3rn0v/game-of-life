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
		cursorValue: { x: 0, y: 0 }
	};

	onCursorValueChange = (newCursorValue) => {
		if (newCursorValue !== undefined && newCursorValue !== null) {
			this.setState({ cursorValue: newCursorValue });
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

		const cursorIsInTheBotHalf =
			this.state.cursorValue.y <
			0.5 *
				(chartData[chartData.length - 1].aliveAtThisGeneration +
					chartData[chartData.length - 1].emptyAtThisGeneration);
		const cursorIsInTheLeftHalf = this.state.cursorValue.x < 0.6 * chartData[chartData.length - 1].generation;

		let cursorLabelShiftX,
			cursorLabelShiftY = 0;

		if (cursorIsInTheLeftHalf) {
			cursorLabelShiftX = 5;
		} else {
			cursorLabelShiftX = -110;
		}

		if (cursorIsInTheBotHalf) {
			cursorLabelShiftY = -25;
		} else {
			cursorLabelShiftY = 20;
			if (cursorIsInTheLeftHalf) {
				cursorLabelShiftX += 10;
			}
		}

		return (
			<div className="chart">
				<VictoryChart
					theme={VictoryTheme.material}
					width={400}
					height={280}
					containerComponent={
						<VictoryCursorContainer
							cursorLabel={(point) =>
								`Cells count is: ${Math.round(point.y)}\nat generation: ${Math.round(point.x)}`}
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
