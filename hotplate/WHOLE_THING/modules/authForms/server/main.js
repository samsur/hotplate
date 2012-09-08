
var util = require('util'),
fs = require('fs'),
hotplate = require('hotplate'),
app = hotplate.app,
routesAnon = require('./routesAnon'),
routesUser = require('./routesUser');


exports.init = function(){
 
  var app = modules.app;

  /* 
   ****************************************************************
   * DATA AJAX CALLS -- ANONYMOUS
   ****************************************************************
  */

  app.post('/anon/recoverAnon',    routesAnon.postRecoverAnon );   // NONDATA
  app.post('/anon/loginAnon',      routesAnon.postLoginAnon);      // NONDATA
  app.get( '/anon/workspacesAnon', routesAnon.getWorkspacesAnon );
  app.get( '/anon/usersAnon'     , routesAnon.getUsersAnon );
  app.post('/anon/workspacesAnon', routesAnon.postWorkspacesAnon );


  // Set parameter functions for middlewares
  app.param('workspaceNamePages', middleware.workspaceNamePages);   // Used by /pages/login/WORKSPACENAME
  app.param('workspaceIdPages',   middleware.workspaceIdPages);     // Used by /pages/ws/WORKSPACEID

  app.param('tokenCall',          middleware.tokenCall);            // Used by API calls
  app.param('workspaceIdCall',    middleware.workspaceIdCall);      // Used by API calls
  app.param('idCall',             middleware.idCall);               // Used by API calls (generic ID)


  /* 
   ****************************************************************
   * PAGES
   ****************************************************************
  */
  app.get('/pages/ws',                        function(req, res, next){ res.redirect('/pages/login'); } );
  app.get('/pages/ws/:workspaceIdPages',      routesPages.ws);
  app.get('/pages/login',                     routesPages.login);
  app.get('/pages/login/:workspaceNamePages', routesPages.login);
  app.get('/pages/register',                  routesPages.register);
  app.get('/pages/pick',                      routesPages.pick);



  /* 
   ****************************************************************
   * DATA AJAX CALLS -- USERS
   ****************************************************************
  */

  app.post('/user/workspacesUser', routesUser.postWorkspacesUser);
  app.post('/user/logoutUser',     routesUser.postLogoutUser);   // NONDATA
}

// FIXME:
// Find a later use for this. Rather than sending this a a huge variable to the client,
// it would make more sense if the code stayed on the client side. I am not sure how
// data will be stored on the client side and how interaction will work. So, leaving it
// for now

exports.dataStores = {
  '/anon/recoverAnon'    : { ops: { post: true } },
  '/anon/loginAnon'      : { ops: { post: true } },
  '/anon/workspacesAnon' : { ops: { post: true, get: true } },
  '/anon/usersAnon'      : { ops: { post: true } },

  '/user/workspacesUser' : { ops: { post: true } },
  '/user/logoutUser'     : { ops: { post: true } },
};



exports.hooks = {};


// Enhance the entry with extra info
exports.hooks.aboutToLog = function( hook, req, log ) {

  console.log("I AM HERE");

  // Set other variables if they are defined (or default to '')
  if( req.application) {
    log.workspaceId   = req.application.workspaceId   ? req.application.workspaceId   : null;
    log.workspaceName = req.application.workspaceName ? req.application.workspaceName : '';
    log.userId        = req.application.userId        ? req.application.userId        : null;
    log.login         = req.application.login         ? req.application.login         : '';
    log.token         = req.application.token         ? req.application.token         : '';
  } else {
    log.workspaceId   = null;
    log.workspaceName = '';
    log.userId        = null;
    log.login         = '';
    log.token         = '';
  }
}


