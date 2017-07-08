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

	render() {
		return (
			<div className="game-field" style={this.state.cssStyles}>
				{this.props.gameStateArray.map((row, i) => {
					return row.map((cellState, j) => {
						const isNewcomer = this.props.newcomersCoords[i][j] === 1 ? true : false;
						const isCorpse = this.props.newcomersCoords[i][j] === -1 ? true : false;
						return (
							<Cell
								cellState={cellState}
								x={j}
								y={i}
								isNewcomer={isNewcomer}
								isCorpse={isCorpse}
								width={this.state.cellWidth}
								updateCellState={this.props.updateCellState}
							/>
						);
					});
				})}
			</div>
		);
	}
}

GameField.propTypes = {
	gameStateArray: PropTypes.array.isRequired,
	newcomersCoords: PropTypes.array.isRequired,
	updateCellState: PropTypes.func.isRequired
};
