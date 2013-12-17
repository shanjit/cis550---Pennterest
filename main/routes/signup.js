var recommender = require('../lib/recommend.js');
var auth = require('../lib/login');
var bcrypt = require('bcrypt-nodejs');

exports.showPage = function(req, res){
    res.render('signup', { title: 'Create a new account'});
};

exports.createAccount = function(req, res){
    var fname = req.param('fname');
    var lname = req.param('lname');
    var aff = req.param('aff');
    var email = req.param('user');
    var pass1 = req.param('pass1');
    var pass2 = req.param('pass2');
    if (pass1 != pass2) {
	res.render('signup', { title: 'Create a new account', emsg: "Password fields dont match!"});
    }
    else{
	var hashedpass = bcrypt.hashSync(pass2);
	console.log("hashed pass: " + hashedpass);
	auth.newAccount(fname, lname, aff, email, hashedpass, function(e, o){
	    if (!o){
		//Error in creating user
		//console.log(e);
		console.log(typeof e);
		
		// Hard coded the error for now.
		if (e)
		{
			e = 'Email ID already in use. Please enter a different Email ID';
		}
		res.render('signup', { title: 'Create a new account', emsg: e});
	    }
	    else{
		//Successful account creation
		console.log('new account with userID ' + o);
		res.redirect('/accountMade');
	    }
	});
    }	       
};

