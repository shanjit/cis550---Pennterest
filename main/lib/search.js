// search.js
// ========

var oracle = require('oracle');
var cache = require('./cache');
var async = require('async');

function SearchConnection (connectData)
{
  this.connectData = connectData;
  this.users;
  this.pins;
  this.boards;
}

SearchConnection.prototype.isConnected = function() {

  oracle.connect(this.connectData, function(err, connection) {

  if ( err ) {
      //console.log('Connection Status: ' + connectionStatus);
      console.log('Connection not established');
    } else {
      //connectionStatus = 'Established';
      //console.log('Connection Status: ' + connectionStatus);
      console.log('Connection established');
    }

    console.log("Close connection: checkConnection");
    connection.close;

  });

}

SearchConnection.prototype.searchUsers = function(firstName, callback) {

  oracle.connect(this.connectData, function(err, connection) {

  if ( err ) {
      console.log('Connection problem: SearchQuery');
    } else {
      //console.log('Connection Okay: SearchQuery');
    }

    connection.execute("SELECT * FROM USERS where lower(firstName) like lower( " + "'" + firstName + "') || '%' or lower(lastName) like lower(" + "'" +   firstName + "') || '%'",[], function(err, results) {

    // Note that results is an array of objects returned from the database

    if ( err ) {
      

    } else {

    }

    callback(results);
  
  
  });

  });

}


SearchConnection.prototype.searchPins = function(tag, callback) {


  oracle.connect(this.connectData, function(err, connection) {


  connection.execute("SELECT DISTINCT ot.objectID, ot.tag, o.url, ot.SOURCEID, o.cached, u.firstName, u.lastName, u.userID, b.boardName, b.boardID FROM OBJECTTAGS ot, OBJECTS o, PINS p, USERS U, BOARDS b where ot.objectID = o.objectID AND p.objectID = ot.objectID AND u.userID = p.userID AND b.userID = u.userID AND lower(tag) like " + "lower('" + tag + "') || '%'",[], function(err, results) {

    // Note that results is an array of objects returned from the database

    // console.log(results);
    var cacheIter = function(pin, cb) {
      if (pin['CACHED'] == 1) {
        cache.get(pin['OBJECTID'], pin['URL'], function(cachedUrl) {
          pin['URL'] = cachedUrl;
          cb();
        });
      } else {
        cb();
      }
    }

    // check if object is cached and update the object url as necessary
    async.each(results, cacheIter, function(err) {
      callback(results);
    });
  
  });

  });


}


SearchConnection.prototype.searchBoards = function(tag, callback) {


  oracle.connect(this.connectData, function(err, connection) {

  connection.execute("SELECT * FROM OBJECTTAGS where tag = " + "'" + tag + "'",[], function(err, results) {

    // Note that results is an array of objects returned from the database
  
    callback(results);
  
  });

  });


}

exports.SearchConnection = SearchConnection;
