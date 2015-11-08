function Account(){};
function Invitee(){};

Account.prototype.collection = function() {
	 return $.get( "invite_tool/getAccountCollection", function( data ) {});
}

Account.prototype.item = function(id, name){
	var self = this;
	self.id = id;
	self.name = name;
}

Invitee.prototype.collection = function(account_id) {
	 return $.get( "invite_tool/getAccountCollection", function( data ) {});
}

Account.prototype.item = function(id, name){
	var self = this;
	self.id = id;
	self.name = name;
}

function InviteToolViewModel(){
    var self = this;
    var account = new Account;
    self.accountsArray = ko.observableArray([]);

	jqxhr = account.collection();
    jqxhr.done(function(data){
    	_.each(data, function(model){
			self.accountsArray.push(new account.item(model.id, model.name));
		});
    });
}

ko.applyBindings(new InviteToolViewModel());
