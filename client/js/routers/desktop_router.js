'use strict';

define([
  "jquery",
  "backbone"
], function($, Backbon) {
  var DesktopRouter = Backbone.Router.extend({
    initialize: function() {
      // Tells Backbone to start watching for hashchange events
      Backbone.history.start();
    },
    routes: {
      "": "index",
      /*
      "video": "video",
      
      */
    },

    index: function() {
      console.log('test');
      //new View();
    },
    video: function() {
      console.log('videro');
    }
  });
  return DesktopRouter;
});