
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var custom = require('./custom');



// The search module added.


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Start server 

app.get('/', routes.index);
app.get('/users', user.list);



// Server definitions go here. 

var connectData = { "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" };

var conn = new custom.SearchConnection(connectData);

conn.isConnected();


// Search for pins using their tags. 
app.get('/users/:id', function(req, res) {
    var func = req.params.id;
    var firstName = req.query.firstName;



    if(func='search')
    {
          conn.searchQuery(function(results) {

//          conn.users = results;

          res.send("Launch search query for Users on, " + " for " + results[0].FIRSTNAME);

    });


    }

    
    //res.send("And you sirs color is searched for, " + color);
    //res.render('index', {title: 'entry' });
});


/*app.get('/search/users/:id', function(req, res) {
    var entry = req.params.id;
    var color = req.query.color;
    res.send("Launch search query for users on, " + entry + " for " + color);
    //res.send("And you sirs color is searched for, " + color);
    //res.render('index', {title: 'entry' });
});*/


/* 

To be implemented in the database 

app.get('/search/boards/:id', function(req, res) {
    var entry = req.params.id;
    var color = req.query.color;
    res.send("Launch search query for users on, " + entry + " for " + color);
    //res.send("And you sirs color is searched for, " + color);
    //res.render('index', {title: 'entry' });
});

*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
