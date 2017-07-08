import React from 'react';
import PropTypes from 'prop-types';

import { ResumePauseButton } from './ResumePauseButton';
import { ResetFieldButton } from './ResetFieldButton';

export class GameControls extends React.Component {
	render() {
		return (
			<div>
				<h3>Game Controls</h3>
				<ResumePauseButton
					isRunning={this.props.isRunning}
					resumeFunc={this.props.resumeFunc}
					pauseFunc={this.props.pauseFunc}
				/>
				<ResetFieldButton resetFunc={this.props.resetFunc} />
				{/*ChangeSpeed*/}
			</div>
		);
	}
}

GameControls.propTypes = {
	isRunning: PropTypes.bool.isRequired,
	resumeFunc: PropTypes.func.isRequired,
	pauseFunc: PropTypes.func.isRequired,
	resetFunc: PropTypes.func.isRequired
};
