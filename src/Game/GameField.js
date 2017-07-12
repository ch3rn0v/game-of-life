import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from './Cell';
import { calculateWidthAndHeight } from './lib/gameHelper';

export class GameField extends React.Component {
	constructor(props) {
		super(props);

		// In order to avoid calculating sizes on every render
		// I put the call to calculateWidthAndHeight in constructor.
		const { width, height } = calculateWidthAndHeight(this.props.gameStateArray);

		const cellWidth = 14; // Dimension is set in the Cell component.

		this.state = {
			cssStyles: {
				width: width * cellWidth + 'px',
				height: height * cellWidth + 'px'
			},
			cellWidth: cellWidth
		};
	}

	renderCell = (cell) => {
		return <Cell cell={cell} />;
	};

	render() {
		return (
			<div className="game-field" style={this.state.cssStyles}>
				{this.props.gameStateArray.map((row, i) => {
					return row.map((cellState, j) => {
						return this.renderCell({
							cellState: cellState,
							x: j,
							y: i,
							width: this.state.cellWidth,
							isNewcomer: this.props.newcomersCoords[i][j] === 1 ? true : false,
							isCorpse: this.props.newcomersCoords[i][j] === -1 ? true : false,
							onMouseDown: this.props.onMouseDown,
							onMouseUp: this.props.onMouseUp,
							updateCellState: this.props.updateCellState
						});
					});
				})}
			</div>
		);
	}
}

GameField.propTypes = {
	gameStateArray: PropTypes.array.isRequired,
	newcomersCoords: PropTypes.array.isRequired,
	onMouseDown: PropTypes.func.isRequired,
	onMouseUp: PropTypes.func.isRequired,
	updateCellState: PropTypes.func.isRequired
};
