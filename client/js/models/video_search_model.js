'use strict';

define([
  'jquery',
  'backbone'
], function($, Backbone) {
  var ResultModel = Backbone.Model.extend({
    defaults: {
      url: '',
      title: ''
    }
  });

  var ResultsCollection = Backbone.Collection.extend({
    model: ResultModel,
    initialize: function() {

    }
  });

  var VideoSearch = Backbone.Model.extend({
    url: '/api/videos/search',

    initialize: function() {
      this.results = new ResultsCollection(this.get("q"));
      console.log(this.results);
    }
  });
  return VideoSearch;
});

