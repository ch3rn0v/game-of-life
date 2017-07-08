import React from 'react';
import PropTypes from 'prop-types';

export const ResumePauseButton = ({ isRunning, pauseFunc, resumeFunc }) => {
	const onClickHandler = isRunning ? pauseFunc : resumeFunc;
	const buttonLabel = isRunning ? 'Pause' : 'Resume';

	return <button onClick={onClickHandler}>{buttonLabel}</button>;
};

ResumePauseButton.propTypes = {
	isRunning: PropTypes.bool.isRequired,
	resumeFunc: PropTypes.func.isRequired,
	pauseFunc: PropTypes.func.isRequired
};
