import React from 'react';

export const UserInstructions = () => {
	return (
		<div className="user-instructions">
			<h3>Introduction</h3>
			<p>
				Hello and welcome to Game Of Life! In this game you can watch how some cells die and others survive to
				produce new generations.<br />
				Please feel free to study the mechanics at the{' '}
				<a
					href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
					target="_blank"
					rel="noopener noreferrer"
				>
					Wikipedia page of Game of Life
				</a>.
			</p>
			<p>
				If you want to create or remove cells you can either click on a cell to change its state, or hold alt
				and hover your mouse over some cells. Good luck!
			</p>
		</div>
	);
};
