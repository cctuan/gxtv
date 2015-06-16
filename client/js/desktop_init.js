'use strict';

fetchRjsConfig().then(rjsConfig => {
  requirejs.config(rjsConfig);
  requirejs([
    'jquery',
    'backbone',
    'js/routers/desktop_router',
    'js/test'
  ], function($, Backbone, DesktopRouter) {
    new DesktopRouter(); 
  });
});

