import React from 'react';

export class Footer extends React.Component {
	render() {
		return (
			<div className="footer">
				<p>MIT License.</p>
				<p>
					Source code available at{' '}
					<a href="https://github.com/ch3rn0v/game-of-life" target="_blank" rel="noopener noreferrer">
						https://github.com/ch3rn0v/game-of-life
					</a>
				</p>
			</div>
		);
	}
}
