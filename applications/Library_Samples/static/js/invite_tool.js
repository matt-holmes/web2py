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
	 return $.get( "invite_tool/getInviteeCollection/" + account_id, function( data ) {});
}

Invitee.prototype.item = function(id, first_name, last_name, email) {
	var self = this;
	self.first_name = first_name;
	self.last_name = last_name;
	self.email = email;
}

Account.prototype.item = function(id, name){
	var self = this;
	self.id = id;
	self.name = name;
}

function InviteToolViewModel(){
    var self = this;
    var account = new Account;
	var invitee = new Invitee;
	self.inviteeArray = ko.observableArray([]);
    self.accountsArray = [];

	accountData = account.collection();
    accountData.done(function(data){
    	_.each(data, function(accountModel){
			inviteeData = invitee.collection(accountModel.id);
			inviteeData.done(function(invData){
				_.each(invData, function(inviteeModel){
					console.log(inviteeModel.first_name);
					self.inviteeArray.push(new invitee.item(inviteeModel.id,inviteeModel.first_name,inviteeModel.last_name,inviteeModel.email));
				});
			});
			self.accountsArray.push(new account.item(accountModel.id, accountModel.name));			
		});
    });
	console.log(self.inviteeArray);
}

function InviteeViewModel(){


}

ko.applyBindings(new InviteToolViewModel());
