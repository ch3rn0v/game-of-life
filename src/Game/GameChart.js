import React from 'react';
import PropTypes from 'prop-types';

import { GameChartCursorLabel } from './GameChartCursorLabel';

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
	render() {
		const chartData = this.props.chartData;
		const aliveCellsAreaStyle = { data: { fill: '#990000' } };
		const emptyCellsAreaStyle = { data: { fill: '#84c26e' } };
		const chartStyle = {
			cursor: 'none'
		};

		return (
			<div className="chart" style={chartStyle}>
				<VictoryChart
					theme={VictoryTheme.material}
					width={400}
					height={280}
					containerComponent={
						<VictoryCursorContainer
							dimension="x"
							cursorLabel={(point) => {
								const cursorPickedGeneration = Math.round(point.x);
								const aliveCellsAtCursorPickedGeneration =
									cursorPickedGeneration > 0
										? calculateCellCountByGeneration(chartData, cursorPickedGeneration)
										: chartData[0].aliveAtThisGeneration;
								return {
									text: `Cells now alive: ${aliveCellsAtCursorPickedGeneration}\nat generation: ${cursorPickedGeneration}`,
									cursorPickedGeneration: cursorPickedGeneration
								};
							}}
							cursorLabelComponent={
								<GameChartCursorLabel
									latestGenerationIndex={chartData[chartData.length - 1].generation}
								/>
							}
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
