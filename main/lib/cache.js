// cache.js

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var request = require('request');

AWS.config.loadFromPath('./config/s3_config.json');

var BUCKET_NAME = 'cis550_project';
var BUCKET_URL = 'https://s3.amazonaws.com/' + BUCKET_NAME;

var s3bucket = new AWS.S3({params: {Bucket: BUCKET_NAME}});

var getFileExtension = function(url) {
 var urlTokens = url.split('.');
 return urlTokens[urlTokens.length - 1];
}

var fetchFile = function(url, next) {
  request(url, { encoding: null }, function(err, res, body) {
    if (err) {
      next(err);
    } else {
      next(err, body)
    } 
  });
}

var uploadToS3 = function(objectId, url, data, next) {
  s3bucket.createBucket(function() {
    var key = objectId + '.' + getFileExtension(url);
    var toUpload = { Key: key, Body: data };
    s3bucket.putObject(toUpload, function(err, res) {
      if (err) {
        console.log("Error uploading data: ", err);
        next(err);
      } else {
        next();
      }
    });
  });
}

exports.put = function(objectId, url, next) {
  fetchFile(url, function(err, data) {
    if (err) {
      next(err);
    } else {
      uploadToS3(objectId, url, data, function(err, res) {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    }
  });
}

exports.get = function(objectId, url, next) {
  var url = BUCKET_URL + '/' + objectId + '.' + getFileExtension(url);
  next(url);
}
