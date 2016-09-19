/**
 * Convert raw errors into application-readable data
 */

'use strict';

const messages = require('../messages.json');

/**
 * @description Error and successful responses handler
 * @param response
 * @returns {Promise}
 */
module.exports = (response) => {
  
  return new Promise((resolve, reject) => {
    response.then((res)=> {
      if ( res.error || res.response.statusCode !== 200 ) {
        reject(readableError(res.error, res.response));
      } else {
        resolve(res.body);
      }
    });
  });
  
};

/**
 * @description Returns a read-able Error object with relevant information
 * @param responseError
 * @param response
 * @returns {Error}
 */
function readableError(responseError, response) {
  
  let error = new Error();
  
  if ( responseError ) {
    // Connection problem
    error.message = messages.error.connection;
    error.statusCode = 500;
    
  } else {
    error.statusCode = response.statusCode;
    error.message = codeMessage(response.statusCode);
  }
  
  return error;
  
}


/**
 * @description Gets the text for a non-200 http response code
 * @param code
 * @returns {string}
 */
function codeMessage(code) {
  
  return messages.statusCode[code.toString()] || '';
  
}