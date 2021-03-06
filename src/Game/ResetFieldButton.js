import React from 'react';
import PropTypes from 'prop-types';

export const ResetFieldButton = ({ resetFunc }) => {
	return <button className="game-control" onClick={resetFunc}>Reset Game Field</button>;
};

ResetFieldButton.propTypes = {
	resetFunc: PropTypes.func.isRequired
};
