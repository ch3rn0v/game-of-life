import React from 'react';
import PropTypes from 'prop-types';

export class GameStats extends React.Component {
	render() {
		const { aliveAtThisGeneration, emptyAtThisGeneration } = this.props;
		const generationsPerSecond = this.props.currentSpeed;
		return (
			<div>
				<h3>This round statistics</h3>
				<p>Generations count: {this.props.generationsCount}. Generations per second: {generationsPerSecond}</p>
				<p>Currently alive cells: {aliveAtThisGeneration}.</p>
				<p>Currently empty cells: {emptyAtThisGeneration}.</p>
			</div>
		);
	}
}

GameStats.propTypes = {
	generationsCount: PropTypes.number.isRequired,
	currentSpeed: PropTypes.number.isRequired,
	aliveAtThisGeneration: PropTypes.number.isRequired,
	emptyAtThisGeneration: PropTypes.number.isRequired
};
