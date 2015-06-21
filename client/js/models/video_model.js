'use strict';

define(['jquery', 'backbone'], function($, Backbone) {
  var Model = Backbone.Model.extend({
    urlRoot: '/api/videos',
    initialize: function() {

    }
  });
  return Model;
})

