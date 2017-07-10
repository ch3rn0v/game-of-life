import React from 'react';
import PropTypes from 'prop-types';

import { ResumePauseButton } from './ResumePauseButton';
import { ResetFieldButton } from './ResetFieldButton';
import { GameSpeedControl } from './GameSpeedControl';

export const GameControls = (props) => {
	return (
		<div>
			<h3 className="game-control-header">Game Controls</h3>
			<ResumePauseButton isRunning={props.isRunning} resumeFunc={props.resumeFunc} pauseFunc={props.pauseFunc} />
			<ResetFieldButton resetFunc={props.resetFunc} />
			<GameSpeedControl changeSpeedFunc={props.changeSpeedFunc} currentSpeed={props.currentSpeed} />
		</div>
	);
};

GameControls.propTypes = {
	isRunning: PropTypes.bool.isRequired,
	resumeFunc: PropTypes.func.isRequired,
	pauseFunc: PropTypes.func.isRequired,
	resetFunc: PropTypes.func.isRequired,
	changeSpeedFunc: PropTypes.func.isRequired,
	currentSpeed: PropTypes.number.isRequired
};
