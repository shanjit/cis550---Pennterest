
/*
 * GET users listing.
 */

var custom = require('custom');

var connectData = { "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" };
var conn = new custom.SearchConnection({ "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" });

exports.user = function(req, res){
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
          //res.send("Launch search query for Users on, " + " for " + conn.users[0].FIRSTNAME);
          res.render('users', { results: results });
          }

          else
          { 
            //res.send("Not found in database");
            //console.log("length is" + results.length);
            res.render('users', { results: results, length: results.length });
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


exports.pin = function(req, res){
  //res.send("And you sir searched for the key word");

        
    var func = req.params.id;
    var tags = req.query.tags;

    if(func=='search')
    {
          conn.searchPins(tags, function(results) {
        
          try {
        
          conn.pins = results;
          console.log(typeof results);            
        
          if(conn.pins.length>0)
          {

          for(var length = 0; length < conn.pins.length;length++)
            {
          //res.send("Launch search query for Users on, " + " for " + conn.pins[1].OBJECTID);
          res.render('pins', { results: results, length: results.length });
            }

          }

          else
          { 
            //res.send("Not found in database");
            res.render('pins', { results: results, length: results.length });
          }
        
          }

        catch (err)
        {
            console.log('in catch' + err.message);
        }

        finally {
          //res.send('Handling errors since 1991');
        }
        
      
       });


    }

    else if (func-func == 0)
    {
      res.send("Show the pinned page");
    }

    else 

    {
      res.send("Looks like you were searching for something else");
    }


};

exports.board = function(req, res){
  //res.send("And you sir searched for the key word");

        
    var func = req.params.id;
    var tags = req.query.tags;

    if(func=='search')
    {
          conn.searchPins(tags, function(results) {
        
          try {
        
          conn.boards = results;
          
        
          if(conn.pins.length>0)
          {

          for(var length = 0; length < conn.boards.length;length++)
            {
          //res.send("Launch search query for Pin on, " + " for " + conn.pins[1].OBJECTID);
            res.render('boards', { results: results, length: results.length });
            }

          }

          else
          { 
            //res.send("Not found in database");
            res.render('boards', { results: results, length: results.length });
          }
        
          }

        catch (err)
        {

          console.log('in catch' + err.message);
        }

        finally {
          res.send('Handling errors since 1991');
        }
        
      
       });


    }

    else if (func-func == 0)
    {
      res.send("Looks like you were searching for something else");
    }

    else 

    {
      res.send("Looks like you were searching for something else");
    }


};
