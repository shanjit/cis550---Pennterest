
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var show = require('./routes/show');
var http = require('http');
var path = require('path');
var custom = require('custom');


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

// Server definitions go here. 

var connectData = { "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" };
var conn = new custom.SearchConnection({ "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" });

//conn.isConnected();


// Start server 

app.get('/', routes.index);
app.get('/user/:id', show.user);
app.get('/pin/:id', show.pin);
app.get('/board/:id', show.board);

//app.get('/*', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
