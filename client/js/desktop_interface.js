'use strict';

define([
	'jquery',
	'backbone',
	'react',
	'js/routers/desktop_router',
	'js/screens/player'
], function($, Backbone, React, Router, PlayerScreen) {
	var router = new Router();
	// Need to bound with Router
	// router.on('route')
	// router.off('route')
	var InterfaceComponent = React.createClass({
		getInitialState: function() {
			return {
				currentPage: null
			};
		},
		componentWillMount: function() {
			router.on('route', this._render);
		},
		componentWillUnmount: function() {
			router.off('route', this._render);
		},
		componentDidMount: function() {
			this._render();
		},
		_jsxTemplate: null,
		_render: function() {
			switch (router.current) {
				case 'index':
				case 'channel':
				case 'search':
					this._jsxTemplate = (
						<PlayerScreen options={router.options} func={router.current} />
					);
					break;
				case 'settings':
					break;
				case 'users':
					break;
			}
			if (this.state.currentPage !== router.current) {
				this.setState({
					currentPage: router.current
				});
			}
		},
		render: function() {
			return (
				<div className='container'>
					{this._jsxTemplate}
				</div>
			);
		}
	});

	return InterfaceComponent;
});
