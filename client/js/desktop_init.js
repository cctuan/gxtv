'use strict';

fetchRjsConfig().then(rjsConfig => {
  requirejs.config(rjsConfig);
  requirejs([
    'jquery',
    'backbone',
    'react',
    'js/desktop_interface',
    'js/test'
  ], function($, Backbone, React, DesktopInterface) {
  	React.render(
  		<DesktopInterface />,
  		document.body
  	);
  });
});

