import React from 'react';
import PropTypes from 'prop-types';

export const GameSpeedControl = ({ changeSpeedFunc, currentSpeed }) => {
	const onInputChange = (e) => {
		const newValue = parseInt(e.target.value, 10);
		if (typeof newValue === 'number' && newValue > 0 && newValue <= 20) {
			const generationsPerSecond = newValue;
			const newIntervalTime = 1000 / generationsPerSecond;
			changeSpeedFunc(newIntervalTime);
		} else {
			e.preventDefault();
		}
	};

	return (
		<p className="game-control">
			Generations per second:{' '}
			<input
				type="number"
				onChange={onInputChange}
				onKeyUp={onInputChange}
				value={currentSpeed}
				min="1"
				max="20"
			/>
		</p>
	);
};

GameSpeedControl.propTypes = {
	changeSpeedFunc: PropTypes.func.isRequired,
	currentSpeed: PropTypes.number.isRequired
};
