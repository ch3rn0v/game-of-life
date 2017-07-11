import React from 'react';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';

export class GameChart extends React.Component {
	render() {
		const chartData = this.props.chartData;
		return (
			<p>
				{JSON.stringify(chartData)}
			</p>
		);
	}
}
