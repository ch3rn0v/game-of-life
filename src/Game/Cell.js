import React from 'react';
import PropTypes from 'prop-types';

export class Cell extends React.Component {
	onMouseDown = (e, x, y, cellState) => {
		e.preventDefault();
		this.props.cell.onMouseDown();
		this.props.cell.updateCellState(x, y, cellState, true);
	};

	onMouseUp = (e) => {
		e.preventDefault();
		this.props.cell.onMouseUp();
	};

	onMouseEnter = (e, x, y, cellState) => {
		e.preventDefault();
		this.props.cell.updateCellState(x, y, cellState, false);
	};

	render() {
		const { cellState, isNewcomer, isCorpse, width, x, y } = this.props.cell;
		const cellIsAliveClass = cellState === 1 ? 'alive' : 'empty';
		const cellIsNewcomerClass = isNewcomer ? 'newcomer' : '';
		const cellIsCorpseClass = isCorpse ? 'corpse' : '';
		const cssStyle = {
			width: width - 2 + 'px', // "-2" because of border with 1px width
			height: width - 2 + 'px',
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
				onMouseDown={(e) => {
					this.onMouseDown(e, x, y, cellState);
				}}
				onMouseUp={(e) => {
					this.onMouseUp(e);
				}}
				onMouseEnter={(e) => {
					this.onMouseEnter(e, x, y, cellState);
				}}
			/>
		);
	}
}

Cell.propTypes = {
	cell: PropTypes.object.isRequired
};
