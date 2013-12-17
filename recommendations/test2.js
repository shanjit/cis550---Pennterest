var tester = require('../main/lib/recommend.js');

tester.recommend('b@b.com', function(list){list.forEach(function(rec){console.log(rec);});});