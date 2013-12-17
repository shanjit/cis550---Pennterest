var numToSend = 5;
var oracle = require('oracle');
var connString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PENNTR)))';
var connectData = { 'tns': connString, 'user': 'cis550project','password':'smja-smja'};
var commonInterests1 = 'SELECT o.* '
    +'FROM USERS u, INTERESTS i, OBJECTS o, OBJECTTAGS ot '
    +'WHERE o.OBJECTID = ot.OBJECTID AND o.SOURCEID = ot.SOURCEID AND i.USERID = u.USERID AND UPPER(ot.TAG)=UPPER(i.interest) AND u.USERID='
var commonInterests2 = ' AND NOT EXISTS(SELECT * FROM PINS p2 WHERE p2.USERID = u.USERID AND p2.OBJECTID = ot.OBJECTID)';
var friendPins1 = 'SELECT o.OBJECTID, o.SOURCEID, o.URL, o.CACHED, o.OBJECTTYPE '
    +'FROM USERS u, Users u2, FRIENDS f, PINS p, Objects o '
    +'WHERE p.OBJECTID = o.OBJECTID AND o.SOURCEID = p.SOURCEID AND u.USERID = f.USERID AND p.USERID = u2.USERID AND u2.EMAILID = f.EMAILID AND ROWNUM<='
    + (numToSend*10) + ' AND u.USERID =';
var friendPins2 = ' AND NOT EXISTS(SELECT * FROM PINS p2 WHERE p2.USERID = u.USERID AND p2.OBJECTID = p.OBJECTID) '
    +'GROUP BY o.OBJECTID, o.SOURCEID, o.URL, o.CACHED, o.OBJECTTYPE ORDER BY COUNT(*)';
var topPins1 = 'SELECT o.OBJECTID, o.SOURCEID, o.URL, o.CACHED, o.OBJECTTYPE FROM PINS p, OBJECTS o WHERE ROWNUM<=';
var topPins2 = ' AND o.OBJECTID = p.OBJECTID AND o.SOURCEID = p.SOURCEID AND NOT EXISTS(SELECT * FROM PINS p2, USERS u WHERE p2.USERID = u.USERID AND p2.OBJECTID = p.OBJECTID AND u.USERID=';
var topPins3 = ') GROUP BY o.OBJECTID, o.SOURCEID, o.URL, o.CACHED, o.OBJECTTYPE ORDER BY COUNT(*)';
var pinTags1 = 'SELECT o2.* '
    +'FROM USERS u, OBJECTS o1, OBJECTS o2, PINS p, OBJECTTAGS ot1, OBJECTTAGS ot2 '
    +'WHERE o1.OBJECTID = ot1.OBJECTID AND o1.SOURCEID = ot1.SOURCEID AND p.OBJECTID = o1.OBJECTID AND p.SOURCEID = o1.SOURCEID AND p.USERID = u.USERID AND UPPER(ot1.TAG)=UPPER(ot2.TAG) AND ot2.SOURCEID=o2.SOURCEID AND ot2.OBJECTID=o2.OBJECTID AND u.USERID='
var pinTags2 = ' AND NOT EXISTS(SELECT * FROM PINS p2 WHERE p2.USERID = u.USERID AND p2.OBJECTID = ot2.OBJECTID)';



var findCommonInterests = function(req,res){
    var userID = req.session.user.USERID;
    oracle.connect(connectData, function(err, connection) {
	connection.execute(commonInterests1 + userID + commonInterests2, [], function(err, commonInterests) {
	    if ( err ) {
		console.log(commonInterests1 + userID + commonInterests2);
		console.log("The error is in findCommonInterests: "+err);
	    } else {
		findFromTags(connection, userID, commonInterests, res);
	    }
	});
    });
}

var findFromTags = function(connection, userID, commonInterests, res){
    oracle.connect(connectData, function(err, connection) {
	connection.execute(pinTags1 + userID + pinTags2, [], function(err, tagInterests) {
	    if ( err ) {
		console.log(pinTags1 + userID + pinTags2);
		console.log("The error is in fromtags: "+err);
	    } else {
		var list = uniqueArray(commonInterests.concat(tagInterests));
		findTopFriendPins(connection, userID, list, res);
	    }
	});
    });
}

var findTopFriendPins = function(connection, userID, commonInterests, res){
    connection.execute(friendPins1 + userID + friendPins2, [], function(err, friendPins) {
	if ( err ) {
	    console.log(friendPins1 + userID + friendPins2);
	    console.log("The error is in findTopFriends: "+err);
	} else {
	    var allRecs = uniqueArray(commonInterests.concat(friendPins));
	    // If we're we don't have enough interest or friend-based recommendations to make so we'll resort to just the most pinned ones
	    if (allRecs.length<numToSend) resortToTopPins(connection, userID, allRecs, res);
	    else makeList(connection, allRecs, res);
	}
    });
}

var resortToTopPins = function(connection, userID, allRecs, res){
    connection.execute(topPins1 + (numToSend * 10) + topPins2 + userID + topPins3, [], function(err, topPins) {
	if ( err ) {
	    console.log("The error is in findToPins: "+err);
	} else {
	    makeList(connection, topPins, res);
	}
    });
}

var makeList =function(connection, allRecs, res){
    var retVal = new Array();
    var sendSize = Math.min(numToSend, allRecs.length);
    for(var i=0; i<numToSend; i++){
	var rand = parseInt(Math.random() * allRecs.length, 10);
	var entry = allRecs[rand];
	retVal[i] = entry;
	allRecs.splice(rand,1);
    }
    connection.close();
    res.send(retVal);
};


var uniqueArray = function(list){
    var onlyUnique =function(value, index, self) {
	for(var i=0; i<numToSend; i++){
	    if(self[i]['OBJECTID'] == value['OBJECTID']) return i === index;
	}
    }
    return list.filter(onlyUnique);
};

exports.getRecs = findCommonInterests;