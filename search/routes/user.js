
/*
 * GET users listing.
 */

var custom = require('custom');

var connectData = { "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" };
var conn = new custom.SearchConnection({ "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" });

exports.list = function(req, res){
  //res.send("And you sir searched for the key word");

    var func = req.params.id;
    var firstName = req.query.firstName;

    //console.log(firstName);

    if(func=='search')
    {
    	try {
          conn.searchUsers(firstName, function(results) {

          
          
          conn.users = results;
          console.log(typeof results);            
          console.log(typeof conn.users);            

          if(conn.users.length>0)
          {
          res.send("Launch search query for Users on, " + " for " + conn.users[0].FIRSTNAME);
          }

          else
          { 
            res.send("Not found in database");
          }
        
    });

	}

catch(err)
{
	console.log(err.message);
}

finally {
	console.log("finally here");
}

}

    

    else if (func-func == 0)
    {
      res.send("Display userpage if it exists");
    }

    else 

    {
      res.send("Looks like you were searching for something else");
    }



};