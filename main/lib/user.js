var oracle = require('oracle');
var querystring = require('querystring');
var connString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PENNTR)))';
var connectData = { 'tns': connString, 'user': 'cis550project','password':'smja-smja'};

var getInterests = function(req, res){
    oracle.connect(connectData, function(err, connection) {
	var statement = 'SELECT i.INTEREST FROM INTERESTS i WHERE i.USERID=' + req.session.user.USERID;
	connection.execute(statement, [], function(err, interests) {
	    console.log(statement);
	    if ( err ) {
		res.send(false);
		console.log("The error is in getInterests: "+err);
	    } else {
		connection.close();
		res.send(interests);
	    }
	});
    });
}

var checkIfFriends = function(req, res){
    var params = querystring.parse(req.params.id);
    oracle.connect(connectData, function(err, connection) {
	var statement = 'SELECT * FROM FRIENDS f WHERE f.USERID=' + req.session.user.USERID + 'AND f.EMAILID=\''+params.eid+'\'';
	connection.execute(statement, [], function(err, friend) {
	    console.log(statement);
	    if ( err ) {
		res.send(false);
		console.log("The error is in checkIfFriends: "+err);
	    } else {
		connection.close();
		res.send(friend);
	    }
	});
    });
}

var addFriend = function(req, res){
    var params = querystring.parse(req.params.id);
    oracle.connect(connectData, function(err, connection) {
	var statement = 'INSERT INTO FRIENDS (USERID,EMAILID) VALUES (' + req.session.user.USERID + ',\''+params.eid+'\')';
	connection.execute(statement, [], function(err, friend) {
	    console.log(statement);
	    if ( err ) {
		res.send(false);
		console.log("The error is in addFriend: "+err);
	    } else {
		connection.close();
		res.send(true);
	    }
	});
    });
}

var removeFriend = function(req, res){
    var params = querystring.parse(req.params.id);
    oracle.connect(connectData, function(err, connection) {
	var statement = 'DELETE FROM FRIENDS WHERE USERID=' + req.session.user.USERID + ' AND EMAILID =\''+params.eid+'\'';
	connection.execute(statement, [], function(err, friend) {
	    console.log(statement);
	    if ( err ) {
		res.send(false);
		console.log("The error is in addFriend: "+err);
	    } else {
		connection.close();
		res.send(true);
	    }
	});
    });
}

exports.getInterests = getInterests;
exports.checkIfFriends = checkIfFriends;
exports.addFriend = addFriend;
exports.removeFriend = removeFriend;