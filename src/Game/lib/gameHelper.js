export const createEmptyGameField = (width, height) => {
	let emptyGameField = [];
	// "i" stands for y axis, "j" stands for x axis.
	// Because by default html elements are displayed in a row, not in a column.
	for (var i = 0; i < height; i++) {
		let row = [];
		for (var j = 0; j < width; j++) {
			row.push(0); // Zero stands for an empty or "dead" cell.
		}
		emptyGameField.push(row);
	}

	// TODO: Extract creating glider figure to a separate function
	// Initial glider figure:
	const shiftY = 25;
	const shiftX = 2;
	emptyGameField[shiftY + 0][shiftX + 1] = 1;
	emptyGameField[shiftY + 0][shiftX + 2] = 1;
	emptyGameField[shiftY + 1][shiftX + 0] = 1;
	emptyGameField[shiftY + 1][shiftX + 2] = 1;
	emptyGameField[shiftY + 2][shiftX + 2] = 1;

	return emptyGameField;
};

export const calculateWidthAndHeight = (twoDimensionArray) => {
	if (twoDimensionArray.length >= 0 && twoDimensionArray[0].length >= 0) {
		return {
			width: twoDimensionArray[0].length,
			height: twoDimensionArray.length
		};
	} else {
		throw new Error('The provided input is not a valid array.');
	}
};

const calculateAliveNeighbours = (x, y, gameFieldArray) => {
	let neighboursCount = 0;

	// If the cell is at the border of the field, we should not count its neighbours. Assume there is nobody.
	let topVerticalShift = 0;
	let bottomVerticalShift = 0;
	let leftHorizontalShift = 0;
	let rightHorizontalShift = 0;

	if (y === 0) {
		topVerticalShift = 1;
	} else if (y === gameFieldArray.length - 1) {
		bottomVerticalShift = -1;
	}
	if (x === 0) {
		leftHorizontalShift = 1;
	} else if (x === gameFieldArray[0].length - 1) {
		rightHorizontalShift = -1;
	}

	// Check every cell around the given one and count the amount of alive ones.
	for (var m = -1 + topVerticalShift; m < 2 + bottomVerticalShift; m++) {
		for (var n = -1 + leftHorizontalShift; n < 2 + rightHorizontalShift; n++) {
			if ((m !== 0 || n !== 0) && gameFieldArray[y + m][x + n] === 1) {
				neighboursCount += 1;
			}
		}
	}

	return neighboursCount;
};

export const processNextGeneration = (prevGeneration) => {
	const { width, height } = calculateWidthAndHeight(prevGeneration);
	let nextGeneration = [];

	for (var i = 0; i < height; i++) {
		let row = [];
		for (var j = 0; j < width; j++) {
			let aliveNeighboursCount = calculateAliveNeighbours(j, i, prevGeneration);
			if (prevGeneration[i][j] === 0 && aliveNeighboursCount === 3) {
				// Any dead cell with exactly three alive neighbours becomes a live cell, as if by reproduction.
				row.push(1);
			} else if (prevGeneration[i][j] === 0 && aliveNeighboursCount !== 3) {
				// Any dead cell with not exactly three alive neighbours becomes a dead cell, as if reproduction was not available.
				row.push(0);
			} else if (prevGeneration[i][j] === 1) {
				if (aliveNeighboursCount < 2) {
					// Any live cell with fewer than two alive neighbours dies, as if caused by underpopulation.
					row.push(0);
				} else if (aliveNeighboursCount <= 3) {
					// Any live cell with two or three alive neighbours lives on to the next generation.
					row.push(1);
				} else {
					// Any live cell with more than three alive neighbours dies, as if by overpopulation.
					row.push(0);
				}
			}
		}
		nextGeneration.push(row);
	}

	return nextGeneration;
};

export const updateCellStateInArray = (x, y, newCellState, oldGameStateArray) => {
	let newGameStateArray = [ ...oldGameStateArray ];
	newGameStateArray[y][x] = newCellState;
	return newGameStateArray;
};

export const calculateCurrentStats = (gameFieldArray) => {
	const { width, height } = calculateWidthAndHeight(gameFieldArray);
	let aliveAtThisGeneration = 0;

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			aliveAtThisGeneration += gameFieldArray[i][j];
		}
	}

	return {
		aliveAtThisGeneration: aliveAtThisGeneration,
		emptyAtThisGeneration: width * height - aliveAtThisGeneration
	};
};
