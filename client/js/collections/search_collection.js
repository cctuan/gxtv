'use strict';

define([
  'jquery',
  'backbone',
  'js/models/video_model'
], function($, Backbone, VideoModel) {

  var SearchCollection = new Backbone.Collection.extend({
    model: VideoModel,
    initialize: function(models, options) {
      this.query = options.query;
    },

    url: function() {
      return '/api/videos/search?q=' + this.query;
    }
  });

});
