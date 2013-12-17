var crypto = require('crypto');
var oracle = require('oracle');
var connString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PENNTR)))';
var connectData = { 'tns': connString, 'user': 'cis550project','password':'smja-smja'};

var moment = require('moment');


/* establish the database connection */
var db = oracle.connect(connectData, function(err, connection) {
        if ( err ) {
            console.log("Error connecting to oracle: "+err);
        } else {
            console.log("Connection successfull");
        }
});

exports.getEmailByName = function(name, callback){
    var mail = "SELECT EMAILID FROM USERS WHERE FIRSTNAME = '" + name + "'" ;
    console.log(mail);
    oracle.connect(connectData, function(err, connection) {
        if ( err ) {
            console.log("Error connecting to oracle: "+err);
        } else {
            console.log("Connection successfull");
	    connection.execute(mail, [], function(err, email) {
		if (err) {
		    console.log("The error is in getEmailbyName: "+err);
		} else {
		    for(var i=0; i < email.length; i++){
			console.log(email[i]);
		    }
		    callback(email);
		}
	    });
        }
    });
}

//Login validation methods
exports.autoLogin = function(user, pass, callback){
    var login = "SELECT * FROM USERS WHERE EMAILID = '" + user + 
	"' AND PASSWORD = '" + pass + "'" ;
    console.log(login);
    oracle.connect(connectData, function(err, connection) {
        if ( err ) {
            console.log("Error connecting to oracle: "+err);
        } else {
	    connection.execute(login, [], function(err, user) {
		if (err) {
		    console.log("The error is in autologin: "+err);
		} else {
		    //return result set
		    callback(user[0]);
		}
	    });
        }
    });
}

exports.manualLogin = function(user, pass, callback){
    var info = "SELECT * FROM USERS WHERE EMAILID = '" + user + "'" ;
    console.log(info);

    oracle.connect(connectData, function(err, connection) {
        if (err) {
            console.log("Error connecting to oracle: " + err);
        } else {
	    //first check username
	    connection.execute(info, [], function(err, results) {
		if (err) {
		    console.log("The error is in manuallogin: "+err);
		}
		if(results[0]){
		    //validate password
		    console.log("found..")
		    var pword = results[0]['PASSWORD'];
		    var uid = results[0]['USERID'];		    
		    console.log(pword)
		    console.log(uid)
		    validatePassword(pass, pword, function(err, res) {
			if (res){
			    callback(null, results[0]);
			}        
			else{
			    callback('invalid-password');
			}
		    });		    
		}
		else{
		    //invalid username
		    console.log("not found..");
		    callback('user-not-found');
		}
	    });
	}
    });
}

var validatePassword = function(plainPass, hashedPass, callback){
    //placeholder for real hashing function to be added later
    callback(null, hashedPass === plainPass);
}

//User profile info
exports.getInterests = function(userID, callback){
    var interests = "SELECT INTEREST FROM INTERESTS WHERE USERID = " + userID;
    console.log(interests);
    oracle.connect(connectData, function(err, connection) {
        if ( err ) {
            console.log("Error connecting to oracle: "+err);
        } else {
	    connection.execute(interests, [], function(err, results) {
		if (err) {
		    console.log("The error is in getInterests: "+err);
		    callback(null);
		} 
		else {
		    console.log("Interest results: " + results);
		    callback(results);
		}
	    });
        }
    });
}

