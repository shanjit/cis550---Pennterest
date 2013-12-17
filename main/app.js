
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/index');
var signup = require('./routes/signup');
var http = require('http');
var path = require('path');
var search = require('./lib/search');
var pin = require('./lib/pin');
var getBoards = require('./lib/boards');
var getRecs = require('./lib/recommend');
var users = require('./lib/user');

// The search module added.


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//Cookies and sessions
app.use(express.cookieParser());
app.use(express.session({secret: 'smja'}));

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
var conn = new search.SearchConnection({ "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" });

//conn.isConnected();


// Start server 
app.get('/', routes.index);
app.post('/', routes.manualLogin);
app.post('/accountMade', routes.manualLogin);
app.get('/accountMade', routes.accountMade);

//Signup page
app.get('/signup', signup.showPage);
app.post('/signup', signup.createAccount);

app.get('/user/:id', routes.user);
app.get('/pin/:id', routes.pin);
app.get('/board/:id', routes.board);
app.get('/bing/:id', routes.bing);

//Board
app.get('/getBoards/:id', getBoards.getBoards);
app.post('/addBoard/:id', getBoards.newBoard);

//Users
app.get('/getInterests', users.getInterests);
app.get('/checkIfFriends/:id', users.checkIfFriends);
app.post('/addFriend/:id',users.addFriend);
app.post('/removeFriend/:id',users.removeFriend);

//Pins
app.get('/makepin/:id', pin.makePin);
app.post('/pinit/:id', pin.pinIt)
app.get('/addObject/:id',pin.addObject);

//Recs
app.get('/getRecs', getRecs.getRecs);

//Logging user out
app.get('/logout', routes.logout);

//app.get('/*', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
