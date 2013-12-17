// custom-db.js
// ========
module.exports = {
  create: function () {
    
  }
};











var oracle = require("oracle");

// Enter connection details
var connectData = { "hostname": "cis550pennterest.cbhrefkoivty.us-east-1.rds.amazonaws.com", "user": "cis550project", "password": "smja-smja", "database": "PENNTR" };

var connectionStatus = "Not Established";
// Configure Express

// Connect to server
function dbConnect()
{
  oracle.connect(connectData, function(err, connection) {

  if ( err ) {
      console.log('Connection Status: ' + connectionStatus);
    } else {
      connectionStatus = 'Established';
      console.log('Connection Status: ' + connectionStatus);
    }

  });

}



