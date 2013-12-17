var oracle = require('oracle');
var connString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PENNTR)))';
var connectData = { 'tns': connString, 'user': 'cis550project','password':'smja-smja'};
var objectCommand = "INSERT INTO OBJECTS (SOURCEID, URL, CACHED, OBJECTTYPE) VALUES('Group TBD','";
var pinCommand = 'INSERT INTO PINS (USERID, OBJECTID, SOURCEID, BOARDID) VALUES (';
var tagCommand = 'INSERT INTO OBJECTTAGS (OBJECTID, SOURCEID, TAG) VALUES (';
var querystring = require('querystring');

var makePin = function(req, res){
    var params = querystring.parse(req.params.id);
    getBoardsForUser(req.session.user.USERID, params, function(boards, objects){
	res.render('pinit', {object : objects[0], boards: boards});
    });
}

var getBoardsForUser = function(userID, params, callback){
    oracle.connect(connectData, function(err, connection) {
	connection.execute("SELECT b.* FROM BOARDS b where b.USERID="+userID, [], function(err, boards) {
	    if ( err ) {
		console.log("SELECT * FROM BOARDS b where b.USERID="+userID);
		console.log("The error is in getBoardsForUser: "+err);
	    } else {
		getObject(boards, params, connection, callback);
	    }
	});
    });
}

var getObject = function(boards, params, connection, callback){
    connection.execute("SELECT o.* FROM OBJECTS o where o.OBJECTID="+params.oid+" AND o.SOURCEID='"+params.sid+"'", [], function(err, objects) {
	if ( err ) {
	    console.log("SELECT o.* FROM OBJECTS o where o.OBJECTID="+params.oid+" AND o.SOURCEID="+params.sid);
	    console.log("The error is in getObject: "+err);
	} else {
	    connection.close();
	    callback(boards, objects);
	}
    });
}

var pin = function(objectID, sourceID, userID, boardID, callback){
    oracle.connect(connectData, function(err, connection) {
	connection.execute(pin1+userID+","+objectID+","+sourceID+","+boardID+")", [], function(err, commonInterests) {
	    if ( err ) {
		console.log(pin1+userID+","+objectID+","+sourceID+","+boardID+")");
		console.log("The error is in pin: "+err);
	    } else {
		callback();
	    }
	});
    });
}

var pinIt = function(req, res){
    oracle.connect(connectData, function(err, connection) {
	var params = querystring.parse(req.params.id);
	var command = pinCommand+req.session.user.USERID+","+params.oid+",'"+params.sid+"',"+params.bid+")";
	connection.execute(command, [], function() {
	    console.log(command);
	    if ( err ) {
		console.log(pinCommand+req.session.user.USERID+","+params.oid+",'"+params.sid+"',"+params.bid+")");
		console.log("The error is in pinIt: "+err);
	    } else {
		res.send(true);
	    }
	});
    });
}

var addObject = function(req, res){
    oracle.connect(connectData, function(err, connection) {
	var params = querystring.parse(req.params.id);
	var command = objectCommand+params.url+"',0,'"+params.type+"')";
	connection.execute(command, [], function(results) {
	    if ( err ) {
		console.log("The error is in addObject line 77: "+err);
		console.log(command);
	    } else {
		connection.execute("SELECT * FROM OBJECTS WHERE URL=\'"+params.url+"\'", [], function(err, results) {
		    if ( err ) {
			console.log("SELECT * FROM OBJECTS WHERE URL=\'"+params.url+"\'");
			console.log("The error is in addObject: "+err);
		    } else {
			addTag(connection, results[0], res, params.tags);
		    }
		});
	    }
	});
    });
}

var addTag = function(connection, object, res, tags){
    if(!tags.length) sendObject(connection, object, res);
    var tag = tags.shift();
    var command = tagCommand + object.OBJECTID+", '"+object.SOURCEID+"', '"+tag+"')";
    connection.execute(command, [], function(err, results) {
	if ( err ) {
	    console.log(command);
	    console.log("The error is in addTag: "+err);
	} else {
	    addTag(connection, object, res, tags);
	}
    });
} 

var sendObject = function(connection, object, res){
    connection.close();
    res.send(object);
}

exports.makePin = makePin;
exports.pinIt = pinIt;
exports.addObject = addObject;