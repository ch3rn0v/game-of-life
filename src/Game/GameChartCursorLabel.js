import React from 'react';
import { VictoryLabel } from 'victory';

export const GameChartCursorLabel = (props) => {
	let { latestGenerationIndex, x } = props;
	const { cursorPickedGeneration, text } = props.text;

	const placeCursorOnTheRight = cursorPickedGeneration < 0.52 * latestGenerationIndex || latestGenerationIndex < 2;
	placeCursorOnTheRight ? (x += 20) : (x += -125);
	const y = 130; // 130 is set in order to place the label in the middle of the graph.

	return <VictoryLabel {...props} x={x} y={y} text={text} />;
};
