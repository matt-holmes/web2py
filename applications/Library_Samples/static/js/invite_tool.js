function Accounts(){};

function Account(){};

Accounts.prototype.getAccounts = function() {
	 return $.get( "invite_tool/getAccountCollection", function( data ) {});
}

Account.prototype.getAccount = function(id, name){
	var self = this;
	self.id = id;
	self.name = name;
}

function AccountsViewModel(){
    var self = this;
    var accounts = new Accounts;
    jqxhr = accounts.getAccounts();
    self.accountsArray = ko.observableArray([]);
    var account = new Account;
    jqxhr.done(function(data){
    	_.each(data, function(model){
			self.accountsArray.push(new account.getAccount(model.id, model.name));
		});
    });
}

ko.applyBindings(new AccountsViewModel());
