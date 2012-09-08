

// Ideally, you can call `sendResponse( res, { ack:'OK' } and the rest is optional );
// However, a new object is created because we should be strict about the format
// of the object sent back to the client
// 
// On the other side, `readResponse()` will make sure that no matter what was sent,
// the response will have at least "ack" and empty objects for the parameters
// that weren't passed.
//
exports.sendResponse = function(res, params){

  var response = {},
  status;
 
  // Safety check, in case nothing was passed
  // (it will still work, it will just send an OK 200)
  params = typeof(params) == 'object' ? params : { };
 
  // Set the status variable
  status = params.status || 200;

  // Set some defaults
  response.ack = params.ack || 'OK';
  
  // Assign default parameters
  if( params.message ) response.message = params.message;
  if( params.errors )  response.errors  = params.errors;
  if( params.data )    esponse.data     = params.data;  
  if( params.emit )    response.emit    = params.emit;

  res.json(response, status);
}


