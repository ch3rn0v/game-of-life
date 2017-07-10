import React from 'react';
import PropTypes from 'prop-types';

export const GameStats = ({ generationsCount, aliveAtThisGeneration, emptyAtThisGeneration, currentSpeed }) => {
	return (
		<div>
			<h3>This round statistics</h3>
			<p>Generations count: {generationsCount}. Generations per second: {currentSpeed}</p>
			<p>Currently alive cells: {aliveAtThisGeneration}.</p>
			<p>Currently empty cells: {emptyAtThisGeneration}.</p>
		</div>
	);
};

GameStats.propTypes = {
	generationsCount: PropTypes.number.isRequired,
	currentSpeed: PropTypes.number.isRequired,
	aliveAtThisGeneration: PropTypes.number.isRequired,
	emptyAtThisGeneration: PropTypes.number.isRequired
};
