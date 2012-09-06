## Pages ##

This folder contains modules that handle page requests.
As many sub-directories as desired can be used.

Routes must be mapped to pages in conf/pages.js, otherwise the 
page will not be reachable.

Each page module must expose a "class" property, that is used to 
create a new instance of the page. 
The application framework cares about injecting required resources,
so the page class can optionally define methods like "setDatabaseConnection"
to retrieve required dependencies.

When a page is requested the "handleRequest" function is called on
the page object. Request and response objects are passed as arguments.