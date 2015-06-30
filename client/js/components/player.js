'use strict';

define([
	'jquery',
	'react'
], function($, React) {
	var Player = React.createClass({
		getInitialState: function() {
			var currentOne = this.props.url;
			return {
				urls: {
					prev: '',
					current: currentOne,
					next: ''
				}
			};
		},
		componentDidMount: function() {
			var video = React.findDOMNode(this.refs.video);
			video.addEventListener('played', this.onPlayed.bind(this));
		},
		onPlayed: function(evt) {
			console.log('Played end');
		},
		render: function() {
			return (
				<video ref="video" autoPlay='true' src={this.state.current}>
				</video>
			);
		}
	});

	var MainPlayer = React.createClass({
		render: function() {
			return (
				<Player />
			);
		}
	});
	return MainPlayer;
});
