import React from 'react';
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
		const aliveCellsAreaStyle = {
			data: { fill: '#990000' }
		};
		const emptyCellsAreaStyle = {
			data: { fill: '#84c26e' }
		};

		return (
			<div className="chart">
				<VictoryChart
					theme={VictoryTheme.material}
					width={400}
					height={280}
					containerComponent={
						<VictoryCursorContainer
							cursorLabel={(point) =>
								`Cells count: ${Math.round(point.y)}\nat generation: ${Math.round(point.x)}`}
							cursorLabelOffset={{
								x: 5,
								y: -25
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
