'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'js/models/video_search_model'
], function($, _, Backbone, VideoSearchModel) {
  var DesktopRouter = Backbone.Router.extend({
    initialize: function() {
      // Tells Backbone to start watching for hashchange events
      Backbone.history.start();
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
      console.log('test');
      var search = new VideoSearchModel({q: 'test'});
      search.on('change', function(result) {
        console.log(result);
      });
      search.fetch();
    },

    settings: function() {
      console.log('videro');
    },

    channel: function(channelId, videoId) {

    },
    search: function(query, page) {

    },
    users: function(userId) {

    }
  });
  return DesktopRouter;
});