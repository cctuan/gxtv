'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'react'
], function($, _, Backbone, React) {
  var DesktopRouter = Backbone.Router.extend({
    initialize: function() {
      // Tells Backbone to start watching for hashchange events
      Backbone.history.start();
      this.options = {};
    },
    routes: {
      "": "index",
      "settings": "settings",
      "channel": "channel",
      "channel/channel:channelId/v:videoId": "channel",
      "search": "search",
      "search/:query/p:page": "search",
      "users": "users",
      "users/user:userId": "users"
    },

    index: function() {
      this.current = 'index';
      this.options = {};
    },

    settings: function() {
      this.current = 'settings';
      this.options = {};
    },

    channel: function(channelId, videoId) {
      this.current = 'channel';
      this.options = {
        channelId: channelId,
        videoId: videoId
      };
    },
    search: function(query, page) {
      this.current = 'search';
      this.options = {
        query: query,
        page: page
      };
    },
    users: function(userId) {
      this.current = 'user';
      this.options = {
        userId: userId
      };
    }
  });
  return DesktopRouter;
});