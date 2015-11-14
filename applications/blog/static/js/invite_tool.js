function InviteTool(){};
function Account(){};
function Invitee(){};

Account.prototype.collection = function() {
	return $.get( "getAccountCollection/", function( data ) {});
}

Invitee.prototype.collection = function(account_id) {
	return $.get( "getInviteeCollection/" + account_id, function( data ) {});
}

Account.prototype.item = function(id, name, children){
	this.id = id;
	this.name = name;
	this.children = ko.observableArray(children);
}

Invitee.prototype.item = function(id, first_name, last_name, email) {
	this.first_name = first_name;
	this.last_name = last_name;
	this.email = email;
}

Account.prototype.childrenArray = function(accountId){
	var children = [];
	var invitee = new Invitee;
	inviteeData = invitee.collection(accountId);
	inviteeData.done(function(invData){
		_.each(invData, function(inviteeModel){
			children.push(
				new invitee.item(
					inviteeModel.id,
					inviteeModel.first_name,
					inviteeModel.last_name,
					inviteeModel.email
				)
			);
		});
	});
	return children;
}

InviteTool.prototype.viewModel = function(){
    var self = this;
    var account = new Account;
	self.accountsArray = ko.observableArray([]).extend({ rateLimit: 500 });
	accountData = account.collection();
    accountData.done(function(data){
    	_.each(data, function(accountModel){
			self.accountsArray.push(
				new account.item(
					accountModel.id, 
					accountModel.name, 
					account.childrenArray(accountModel.id)
				)
			);				
		});
    });
     
}

inviteTool = new InviteTool;
ko.applyBindings(new inviteTool.viewModel);


