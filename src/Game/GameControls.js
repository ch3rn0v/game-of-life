import React from 'react';
import PropTypes from 'prop-types';

import { ResumePauseButton } from './ResumePauseButton';

export class GameControls extends React.Component {
	render() {
		return (
			<div>
				<ResumePauseButton
					isRunning={this.props.isRunning}
					resumeFunc={this.props.resumeFunc}
					pauseFunc={this.props.pauseFunc}
				/>
				{/*Clear*/}
				{/*ChangeSpeed*/}
			</div>
		);
	}
}

GameControls.propTypes = {
	isRunning: PropTypes.bool.isRequired,
	resumeFunc: PropTypes.func.isRequired,
	pauseFunc: PropTypes.func.isRequired
};
