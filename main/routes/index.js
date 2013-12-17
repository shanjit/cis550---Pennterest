/*
 * GET home page.
 */
var recommender = require('../lib/recommend.js');
var auth = require('../lib/login');
var oracle = require('oracle');
var connString = '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PENNTR)))';
var connectData = { 'tns': connString, 'user': 'cis550project','password':'smja-smja'};
var _req, _res;

var search = require('../lib/search');

var connectData = { "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" };
var conn = new search.SearchConnection({ "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" });


var acctKey = 'tAtIu6a/MZyScbjoW56+YELagFAoKfTrv6769Fa60MA';
var rootUri = 'https://api.datamarket.azure.com/Bing/Search';
var bing_auth    = new Buffer([ acctKey, acctKey ].join(':')).toString('base64');
var request = require('request').defaults({
  headers : {
    'Authorization' : 'Basic ' + bing_auth
  }
});

exports.accountMade = function(req,res){
    res.render('login', { message: 'created'})
}

exports.index = function(req, res){    
    _req = req;
    _res = res;
    if(req.session.user){
	//recommender.recommend(req.session.user['USERID'], renderHome);
	_res.render('home', { title: 'Project TBD: CIS 550 Project', user: _req.session.user});
    }
    else {
	//render login page
	_res.render('login', { title: 'Project TBD: CIS 550 Project'});
    }

};

var renderHome = function(recs){
    _res.render('home', { title: 'Project TBD: CIS 550 Project', recommendations: recs,user: _req.session.user });
}

exports.manualLogin = function(req, res){
    _req = req;
    _res = res;
    auth.manualLogin(req.param('user'), req.param('pass'), function(e, o){
	if (!o){
	    req.session.user = null;
	    var msg = '';
	    if(e == 'invalid-password'){
		msg = 'Incorrect login details';
	    }
	    else if (e == 'user-not-found'){
		msg = 'Invalid login details';	
	    }
	    
	   // console.log("session is " + req.session.user);
	    res.render('login', { title: 'Project TBD: CIS 550 Project', sess: req.session.user, message: msg});
	}
	else{
	    req.session.user = o;
	    if (req.param('remember-me') == 'true'){
		res.cookie('user', o['EMAILID'], { maxAge: 900000 });
		res.cookie('pass', o['PASSWORD'], { maxAge: 900000 });
	    }
	    //console.log("session is " + req.session.user);
	    console.log("Login successful");
	    //recommender.recommend(req.session.user['USERID'], renderHome);
	    _res.render('home', { title: 'Project TBD: CIS 550 Project', user: _req.session.user });
	}
    });
};

exports.logout = function(req, res){
	_req = req;
	_res = res;

	if (typeof (_req.session.user) =='undefined')
	{
		res.redirect('/');	
	}

	if (_req.session) {
    	_req.session.auth = null;
    	_res.clearCookie('auth');
    	_req.session.destroy(function() {});
    	msg = 'Logged out successfully';
    	res.render('login', { title: 'Project TBD: CIS 550 Project', message: msg});
  	}

};


exports.user = function(req, res){
    _req = req;
    _res = res;
    var func = req.params.id;
    var firstName = req.query.q;

    if (typeof (_req.session.user) =='undefined')
    {
    res.redirect('/');
    }

    if(func=='search')
    {
    	try {
          
          conn.searchUsers(firstName, function(results) {
          conn.users = results;
          res.render('users', { results: results, user: _req.session.user });

    });

	       }

      catch(err)
        {
	         console.log(err.message);
        }

    }

    else if (func-func == 0)
    {
      res.send("Display userpage if it exists");
    }

    else
    {
      // Ideally make a 404 error page.
      res.send("Looks like you were searching for something else");
    }

};

exports.pin = function(req, res){
    var func = req.params.id;
    var tags = req.query.q;
    _req = req;
    _res = res;

    if (typeof (_req.session.user) =='undefined')
    {
      res.redirect('/');  
    }

    
    if(func=='search')
    {
          conn.searchPins(tags, function(results) {
        
          try {
          
          conn.pins = results;
          res.render('pins', { results: results, user: _req.session.user});
          
          }

        catch (err)
        {
            console.log('Search Pin Catch, ' + err.message);
        }

       });
    }

    else if (func-func == 0)
    {	
      res.send("Show the pinned Object - Photo for Photo, Video for video and ");
    }

    else 

    {
      // Show the 404 error page.
	   res.send("Looks like you were searching for something else");
    }


};

exports.bing = function(req, res){
    _req = req;
    _res = res;
    var func = req.params.id;
    var query = req.query.q;

    if (typeof (_req.session.user) =='undefined')
    {
    res.redirect('/');  
    }
    

    if(func=='search')
    {
      var service_op  = "Image";
    request.get({
      url : rootUri + '/' + service_op,
      qs  : {
        $format : 'json',
        Query   : "'" + query + "'", 
      }
    }, function(err, response, body) {
      if (err)
        console.log(err);
      if (response.statusCode !== 200)
        console.log(err);

      var results = JSON.parse(response.body);
      
      res.render('bing', {results: results.d.results, user: _req.session.user});

    } 
    );

}

};


exports.board = function(req, res){
    
    var func = req.params.id;
    var tags = req.query.q;
    _req = req;
    _res = res;

    if (typeof (_req.session.user) =='undefined')
    {
      res.redirect('/');  
    }

    if(func=='search')
    {
          conn.searchPins(tags, function(results) {
        
          try {
        
          conn.boards = results;
          res.render('boards', { results: results, user: _req.session.user});
              }

        catch (err)
        {
          console.log('Search Boards Catch, ' + err.message);
        }
       });


    }

    else if (func-func == 0)
    {
      res.send("Display the board");
    }

    else 

    {
      // Show a 404 error page.
      res.send("Looks like you were searching for something else");
    }


};
