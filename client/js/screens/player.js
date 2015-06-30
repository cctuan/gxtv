'use strict';
// index , channel , search routes
define([
	'jquery',
	'backbone',
	'react',
	'js/components/search_bar',
	'js/components/player',
	'js/components/channel_list',
	'js/components/tube_list'
], function($, Backbone, React, SearchComponent, PlayerComponent,
	ChannelListComponent, TubeListComponent) {
	var PlayerScreen = React.createClass({
		componentWillMount: function() {

		},
		render: function() {
			var whatFocus = this.props.func;
			return (
				<div>
					<SearchComponent />
					<PlayerComponent />
					<ChannelListComponent />
					<TubeListComponent />
				</div>
			);
		}
	});
	return PlayerScreen;
});
