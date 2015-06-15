'use strict';
var fetchRjsConfig = function() {
  var promise = new Promise(function(resolve) {
    var request = new XMLHttpRequest();
    request.open('GET', 'config/rjs_config.json', true);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        var rjsConfig = JSON.parse(request.responseText);
        resolve(rjsConfig);
      }
    };
    request.send();
  });
  return promise;
};

fetchRjsConfig().then(rjsConfig => {
  requirejs.config(rjsConfig);
  requirejs([
    'jquery',
    'backbone',
    'react',
    'js/test'
  ], function($, Backbone, React, test) {
    console.log(test());
  });
});
