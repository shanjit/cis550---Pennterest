var oracle = require('oracle');
var querystring = require('querystring');
var connString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PENNTR)))';
var connectData = { 'tns': connString, 'user': 'cis550project','password':'smja-smja'};
var boards1 = 'SELECT * FROM BOARDS b WHERE USERID=';
var boards2 = ' AND NOT EXISTS(SELECT * FROM PINS p WHERE p.BOARDID=b.BOARDID AND p.USERID=';
var boards3 =  ' AND p.OBJECTID =';
var boards4 = ' AND p.SOURCEID = \'';


var getBoards = function(req, res){
    var params = querystring.parse(req.params.id);
    oracle.connect(connectData, function(err, connection) {
	var statement = boards1 + req.session.user.USERID;
	if(params.oid) statement += boards2 + req.session.user.USERID + boards3 + params.oid + boards4 + params.sid + '\')';
	connection.execute(statement, [], function(err, boards) {
	    console.log(statement);
	    if ( err ) {
		res.send(false);
		console.log("The error is in getBoards: "+err);
	    } else {
		console.log(boards);
		connection.close();
		res.send(boards);
	    }
	});
    });
}

var defaultBoard = function(userID, boardName, callback){
     var newBrd = "INSERT INTO BOARDS " + 
	"(USERID, BOARDNAME) "+ 
	"VALUES (" + userID + ", '" + boardName
	+ "') RETURNING BOARDID INTO :1";

    console.log(newBrd);
    oracle.connect(connectData, function(err, connection) {
	connection.execute(newBrd, [new oracle.OutParam()], function(err, results) {
	    if (err) {
		console.log("Error creating newBoard: "+err);
		callback(err, null);
	    } 
	    else {
		var bid = results.returnParam;
		callback(null, bid);		    
	    }
	});
    });
}

var newBoard = function(req, res){
    var userID = req.session.user.USERID;
    var params = querystring.parse(req.params.id);
    var newBrd = "INSERT INTO BOARDS " + 
	"(USERID, BOARDNAME) "+ 
	"VALUES (" + userID + ", '" + params.name
	+ "')";

    console.log(newBrd);
    oracle.connect(connectData, function(err, connection) {
	connection.execute(newBrd, [], function(err, results) {
	    if (err) {
		console.log("Error creating newBoard: "+err);
		res.send(false);
	    } 
	    else {
		res.send(true);
	    }
	});
    });
    
}


exports.getBoards = getBoards;
exports.defaultBoard = defaultBoard;
exports.newBoard = newBoard;

