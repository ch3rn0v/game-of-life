import React from 'react';
import PropTypes from 'prop-types';

export class Cell extends React.Component {
	updateCellState = (e) => {
		if ((e.type === 'mouseenter' && e.altKey) || (e.type === 'click' && e.button === 0)) {
			this.props.updateCellState(this.props.x, this.props.y, this.props.cellState);
		}
	};

	render() {
		const cellState = this.props.cellState;
		const cellClassName = cellState === 1 ? 'alive' : 'dead';
		const cssStyle = {
			width: this.props.width - 2 + 'px',
			height: this.props.width - 2 + 'px',
			border: '1px solid #ffffff'
		};
		return (
			<div
				className={'cell ' + cellClassName}
				style={cssStyle}
				onMouseEnter={this.updateCellState}
				onClick={this.updateCellState}
			/>
		);
	}
}

Cell.propTypes = {
	cellState: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	updateCellState: PropTypes.func.isRequired
};
