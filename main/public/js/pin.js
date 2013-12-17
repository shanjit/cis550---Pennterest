var _oid, _sid, _i;

var koPinModel = function() {
    var self = this;
    self.boards = ko.observableArray();
    self.selectedBoard = ko.observable();
    self.objectType = ko.observable();
    self.url = ko.observable();
    self.recommendations = ko.observableArray();
    self.loading = ko.observable(false);

    self.pinit = function(i, url) {
        _i=i();
        _oid = self.recommendations()[_i].OBJECTID;
        _sid = self.recommendations()[_i].SOURCEID;
	self.url(url);
        self.initDialog();
    }

    self.pinitFromSearch = function(oid,sid,url){
        _oid = oid;
        _sid = sid;
	self.url(url);
        self.initDialog();
    }

    self.initDialog = function(){
        self.boards.removeAll();
        $.get('/getBoards/'+'oid='+_oid+'&sid='+_sid,{},function(boards){
            if(!boards.length){
                self.showDialog('#noBoard');
                return;
            }
            _.each(boards, function(board){
                self.boards.push(board);
            });
            self.boards.sort(function(a,b){return a['BOARDNAME']-b['BOARDNAME'];});
            self.showDialog('#dialog');
        });
    }

    self.showDialog = function(id){
        $(id).dialog({
            modal: true
        }).dialog('open');
    }

    self.sendPinSearch = function(){
        if(!self.selectedBoard()) return;
        $.post('/pinit/'+'oid='+_oid+'&sid='+_sid+'&bid='+self.selectedBoard()['BOARDID'], function(data){
            if(data){
                self.selectedBoard(null);
                $('#dialog').dialog('close');
            }
        });
    }
    self.sendPin = function(){
        if(!self.selectedBoard()) return;
        $.post('/pinit/'+'oid='+_oid+'&sid='+_sid+'&bid='+self.selectedBoard().BOARDID, function(data){
            if(data){
                self.selectedBoard(null);
                if(_i != -1) self.recommendations.splice(_i, 1);
                $('#dialog').dialog('close');
            }
        });
    }
    self.getNewRecs = function(){
        self.loading(true);
        self.recommendations.removeAll();
        $.get("/getRecs",{},function(recs){
            _.each(recs, function(rec){
                self.recommendations.push(rec);
            });
            self.loading(false);
        });
    }
    self.initAddObject = function(){
	self.boards.removeAll();
	self.showDialog('#addObject');
    }
    self.addObject = function(){
	var input = $('#objectInput').val();
	var tags = $('#tagInput').val().split(',');
	var cleanTags = new Array();
	if(!(self.objectType() && input)) return;
        var request = '/addObject/type='+self.objectType()+'&url='+encodeURIComponent(input);
	_.each(tags, function(tag){
	    request += '&tags='+$.trim(tag);
	});
        $.get(request, function(data){
            if(data){
                $('#addObject').dialog('close');
		_oid = data['OBJECTID'];
		_sid = data['SOURCEID'];
		_i = -1;
		self.initDialog(data['URL']);
            }
        });
    }    
    self.initAddBoard=function(){
	self.showDialog('#addBoard');
    }

    self.addBoard = function(){
	var bName = $('#boardName').val();
	if(!bName) return;
        var request = '/addBoard/name='+encodeURIComponent(bName);
        $.post(request, function(data){
	    $('#addBoard').dialog('close');
            if(data){
                $('#addBoard').dialog('close');
		$('#addBoardDone').dialog({modal: true}).dialog('open');
            }
	    else{
		alert('Sorry you can\'t make that board right now');
	    }
        });
    }
}
var apply = function(){
    var pinModel = new koPinModel();
    var userModel = new koUserModel();
    if($('#home').length){
        ko.applyBindings(pinModel, $('#home')[0]);
        pinModel.getNewRecs();
    }
    if($('#users').length){
	ko.applyBindings(userModel, $('#users')[0]);
    }
    else ko.applyBindings(pinModel, $('#searchPins')[0]);
};

$(window).load(apply);