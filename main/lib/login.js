var oracle = require('oracle');
var bcrypt = require('bcrypt-nodejs');
var boards = require('./boards');
var connString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PENNTR)))';
var connectData = { 'tns': connString, 'user': 'cis550project','password':'smja-smja'};


/* establish the database connection */
var db = oracle.connect(connectData, function(err, connection) {
  if ( err ) {
    console.log("Error connecting to oracle: "+err);
  } else {
    console.log("Connection successfull");
  }
});

exports.getByUID = function(uid, callback){
  var sql = "SELECT * FROM USERS WHERE USERID = '" + uid + "'" ;
  oracle.connect(connectData, function(err, connection) {
    if ( err ) {
      console.log("Error connecting to oracle: "+err);
    } else {
      console.log("Connection successfull");
      connection.execute(sql, [], function(err, result) {
        if (err) {
          console.log("The error is in getEmailbyName: "+err);
        } else {

         callback(result);
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
		    //console.log(pword)
		    //console.log(uid)
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

var validatePassword = function(passInput, passDB, callback){
    //placeholder for real hashing function to be added later
    //TODO: add error checking here
    //var real = bcrypt.hashSync(passDB);
    //console.log("real is: " + real);
    var valid = bcrypt.compareSync(passInput, passDB);
    callback(null, valid);
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

//New account
exports.newAccount = function(fname, lname, aff, email, pass, callback){
    //Make new user account
    var newAcc = "INSERT INTO USERS " + 
    "(FIRSTNAME, LASTNAME, EMAILID, PASSWORD, AFFILIATION) "+ 
    "VALUES ('" + fname + "', '" +
     lname + "', '" + email + "', '" + pass + "', '" 
     + aff + "') RETURNING USERID INTO :1";

    console.log(newAcc);
    oracle.connect(connectData, function(err, connection) {
	if ( err ) {
	    console.log("Error connecting to oracle: "+err);
	} else {
	    connection.execute(newAcc, [new oracle.OutParam()], function(err, results) {
		if (err) {
		    console.log("The error is in newAccount: "+err);
		    callback(err, null);
		} 
		else {
		    //account is created, now we need a default board
		    var uid = results.returnParam;
		    boards.defaultBoard(uid,"My first board", function(err, boardID){
			if(err){
			    console.log("Error while making default board: "+err);
			}
			else if(boardID){
			    console.log("Default board with id " + boardID);
			    callback(null, uid);		    
			}
		    });

		}
	    });
	}
    });
}