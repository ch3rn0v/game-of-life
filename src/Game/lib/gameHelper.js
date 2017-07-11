// Game field initiation functions

export const createEmptyGameField = (width, height) => {
	let emptyGameField = [];
	let newcomers = [];

	// "i" stands for y axis, "j" stands for x axis.
	// Because by default html elements are displayed in a row, not in a column.
	for (var i = 0; i < height; i++) {
		let row = [];
		for (var j = 0; j < width; j++) {
			row.push(0); // Zero stands for an empty or "dead" cell.
		}
		emptyGameField.push(row);
		newcomers.push(row); // Populate this array with initial values of zero.
	}

	// Initial Glider and R-Pentomino figures:
	const gameFieldWithGlider = addGliderToBottomLeft(width, height, emptyGameField);
	const gameFieldWithRPentomino = addRPentomino(width, height, gameFieldWithGlider);

	const initialGameField = gameFieldWithRPentomino;

	return { initialGameField, newcomers };
};

const addGliderToBottomLeft = (width, height, gameFieldArray) => {
	let gameFieldWithGlider = [ ...gameFieldArray ];

	const shiftY = height - 4;
	const shiftX = 2;
	if (width < 5 || height < 5) {
		// Don't want to fit glider in such little space.
		// Return array as it was passed.
		return gameFieldArray;
	} else {
		gameFieldWithGlider[shiftY + 0][shiftX + 1] = 1;
		gameFieldWithGlider[shiftY + 0][shiftX + 2] = 1;
		gameFieldWithGlider[shiftY + 1][shiftX + 0] = 1;
		gameFieldWithGlider[shiftY + 1][shiftX + 2] = 1;
		gameFieldWithGlider[shiftY + 2][shiftX + 2] = 1;

		return gameFieldWithGlider;
	}
};

const addRPentomino = (width, height, gameFieldArray) => {
	let gameFieldWithRPentomino = [ ...gameFieldArray ];

	const shiftY = 4;
	const shiftX = 3;
	if (width < 7 || height < 8) {
		// Don't want to fit R-Pentomino in such little space.
		// Return array as it was passed.
		return gameFieldArray;
	} else {
		gameFieldWithRPentomino[shiftY + 1][shiftX + 0] = 1;
		gameFieldWithRPentomino[shiftY + 0][shiftX + 1] = 1;
		gameFieldWithRPentomino[shiftY + 0][shiftX + 2] = 1;
		gameFieldWithRPentomino[shiftY + 1][shiftX + 1] = 1;
		gameFieldWithRPentomino[shiftY + 2][shiftX + 1] = 1;

		return gameFieldWithRPentomino;
	}
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

// Game mechanics functions (process next generation, change cell's state)

const calculateNeighbourCoordinateDeltas = (x, y, gameFieldArray) => {
	/* Neighbours' coordinates delta (relative to y, x of the cell)
	[ -1, -1 ], [ -1, 0 ],  [ -1, 1 ],
	[ 0,  -1 ],             [  0, 1 ],
	[ 1,  -1 ], [  1, 0 ],  [  1, 1 ]

	Below we take it as initial value.
	Then check if the cell is on the edge.
	If so, we replace the 'out of range' coordinates with coordinates of the opposite edge cells.
	As if we are not on a plane, but rather on a torus' surface.
	*/

	let neighbourCoordinateDeltas = [
		[ y - 1, x - 1 ],
		[ y - 1, x ],
		[ y - 1, x + 1 ],
		[ y, x - 1 ],
		[ y, x + 1 ],
		[ y + 1, x - 1 ],
		[ y + 1, x ],
		[ y + 1, x + 1 ]
	];

	// If the cell is at the edge, we take cells from the opposite edge as its neighbours
	const maxYValue = gameFieldArray.length - 1;
	const maxXValue = gameFieldArray[0].length - 1;

	if (y === 0) {
		neighbourCoordinateDeltas = [
			[ maxYValue, x - 1 ],
			[ maxYValue, x ],
			[ maxYValue, x + 1 ],
			...neighbourCoordinateDeltas.slice(3)
		];
	} else if (y === maxYValue) {
		neighbourCoordinateDeltas = [ ...neighbourCoordinateDeltas.slice(0, 5), [ 0, x - 1 ], [ 0, x ], [ 0, x + 1 ] ];
	}
	if (x === 0) {
		neighbourCoordinateDeltas = [
			[ neighbourCoordinateDeltas[0][0], maxXValue ],
			...neighbourCoordinateDeltas.slice(1, 3),
			[ neighbourCoordinateDeltas[3][0], maxXValue ],
			...neighbourCoordinateDeltas.slice(4, 5),
			[ neighbourCoordinateDeltas[5][0], maxXValue ],
			...neighbourCoordinateDeltas.slice(6)
		];
	} else if (x === maxXValue) {
		neighbourCoordinateDeltas = [
			...neighbourCoordinateDeltas.slice(0, 2),
			[ neighbourCoordinateDeltas[2][0], 0 ],
			...neighbourCoordinateDeltas.slice(3, 4),
			[ neighbourCoordinateDeltas[4][0], 0 ],
			...neighbourCoordinateDeltas.slice(5, 7),
			[ neighbourCoordinateDeltas[7][0], 0 ]
		];
	}

	return neighbourCoordinateDeltas;
};

const calculateAliveNeighbours = (x, y, gameFieldArray) => {
	let neighboursCount = 0;
	let neighbourCoordinateDeltas = calculateNeighbourCoordinateDeltas(x, y, gameFieldArray);

	neighboursCount = neighbourCoordinateDeltas.reduce((sum, [ neighbourY, neighbourX ]) => {
		return sum + gameFieldArray[neighbourY][neighbourX];
	}, 0);

	return neighboursCount;
};

export const processNextGeneration = (prevGeneration, prevNewcomers) => {
	const { width, height } = calculateWidthAndHeight(prevGeneration);
	let nextGeneration = [];
	let newcomers = []; // '-1' — cell died. '0' — cell was not affected (either survived or remained dead) . '1' — cell was born.

	for (var i = 0; i < height; i++) {
		let row = [];
		let newcomersRow = [];
		for (var j = 0; j < width; j++) {
			let aliveNeighboursCount = calculateAliveNeighbours(j, i, prevGeneration);
			if (prevGeneration[i][j] === 0 && aliveNeighboursCount === 3) {
				// Any dead cell with exactly three alive neighbours becomes a live cell, as if by reproduction.
				row.push(1);
				newcomersRow.push(1);
			} else if (prevGeneration[i][j] === 0 && aliveNeighboursCount !== 3) {
				// Any dead cell with not exactly three alive neighbours becomes a dead cell, as if reproduction was not available.
				row.push(0);
				newcomersRow.push(0);
			} else if (prevGeneration[i][j] === 1) {
				if (aliveNeighboursCount < 2) {
					// Any live cell with fewer than two alive neighbours dies, as if caused by underpopulation.
					row.push(0);
					newcomersRow.push(-1);
				} else if (aliveNeighboursCount <= 3) {
					// Any live cell with two or three alive neighbours lives on to the next generation.
					row.push(1);
					newcomersRow.push(0);
				} else {
					// Any live cell with more than three alive neighbours dies, as if by overpopulation.
					row.push(0);
					newcomersRow.push(-1);
				}
			}
		}
		nextGeneration.push(row);
		newcomers.push(newcomersRow);
	}

	return { nextGeneration, newcomers };
};

export const updateCellStateInArray = (x, y, newCellState, oldGameStateArray) => {
	let newGameStateArray = [ ...oldGameStateArray ];
	newGameStateArray[y][x] = newCellState;
	return newGameStateArray;
};

// Game stats functions

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

export const CalculateChartData = (gameStateArray, generationIndex) => {
	return {
		...calculateCurrentStats(gameStateArray),
		generation: generationIndex
	};
};
