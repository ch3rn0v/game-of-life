import React from 'react';
import PropTypes from 'prop-types';

export class Cell extends React.Component {
	onMouseDown = (e) => {
		e.preventDefault();
		this.props.onMouseDown();
		this.props.updateCellState(this.props.x, this.props.y, this.props.cellState, true);
	};

	onMouseUp = (e) => {
		e.preventDefault();
		this.props.onMouseUp();
	};

	onMouseEnter = (e) => {
		e.preventDefault();
		this.props.updateCellState(this.props.x, this.props.y, this.props.cellState, false);
	};

	render() {
		const { cellState, isNewcomer, isCorpse } = this.props;
		const cellIsAliveClass = cellState === 1 ? 'alive' : 'empty';
		const cellIsNewcomerClass = isNewcomer ? 'newcomer' : '';
		const cellIsCorpseClass = isCorpse ? 'corpse' : '';
		const cssStyle = {
			width: this.props.width - 2 + 'px',
			height: this.props.width - 2 + 'px',
			borderWidth: '1px',
			borderStyle: 'solid'
		};
		return (
			<div
				className={'cell ' + cellIsAliveClass + ' ' + cellIsNewcomerClass + ' ' + cellIsCorpseClass}
				style={cssStyle}
				onDragStart={() => {
					return false;
				}}
				onMouseDown={this.onMouseDown}
				onMouseUp={this.onMouseUp}
				onMouseEnter={this.onMouseEnter}
			/>
		);
	}
}

Cell.propTypes = {
	cellState: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	isNewcomer: PropTypes.bool.isRequired,
	isCorpse: PropTypes.bool.isRequired,
	width: PropTypes.number.isRequired,
	onMouseDown: PropTypes.func.isRequired,
	onMouseUp: PropTypes.func.isRequired,
	updateCellState: PropTypes.func.isRequired
};
