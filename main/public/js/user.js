var koUserModel = function() {
    var self = this;
    self.boardsText = ko.observable();
    self.interestsText = ko.observable();
    self.friend = ko.observable(true);
    self.loading = ko.observable(false);
    self.seeUser = function(userID, emailID){
	self.boardsText('');
	$.get('/getBoards/allBoards',{},function(boards){
	    var temp = '';
            _.each(boards, function(board){
		temp += temp ? ', '+board['BOARDNAME'] : board['BOARDNAME'];
            });
	    self.boardsText(temp);
	    $.get('/getInterests',{},function(interests){
		var temp = '';
		_.each(interests, function(interest){
		    temp += temp ? ', ' + interest['INTEREST'] : ' and their interests are: ' + interest['INTEREST'];
		});
		self.interestsText(temp);
		$.get('/checkIfFriends/eid='+emailID,{},function(friendship){
		    self.friend(friendship.length > 0);
		    self.showDialog('#user'+userID);
		});
            });
        });
    }
    self.followUser = function(emailID){
	self.loading(true);
	$.post('/addFriend/eid='+emailID,{},function(friendship){
	    self.loading(false);
	    self.friend(true);
	});
    }
    self.unfollowUser = function(emailID){
	self.loading(true);
	$.post('/removeFriend/eid='+emailID,{},function(friendship){
	    self.loading(false);
	    self.friend(false);
	});
    }
    self.showDialog = function(id){
        $(id).dialog({
            modal: true
        }).dialog('open');
    }
}