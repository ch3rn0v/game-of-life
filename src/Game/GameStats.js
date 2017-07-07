import React from 'react';
import PropTypes from 'prop-types';

export class GameStats extends React.Component {
	render() {
		return <p>Generations count: {this.props.generationsCount}</p>;
	}
}

GameStats.propTypes = {
	generationsCount: PropTypes.number.isRequired
};
