(function inviteToolPage(){

	function InviteTool(){};
	function Account(){};
	function Invitee(){};
	var pageCollection = null;
	
	Account.prototype.collection = function() {
		return $.get( "getAccountCollection/", function( data ) {});
	}

	Invitee.prototype.collection = function(account_id) {
		return $.get( "getInviteeCollection/" + account_id, function( data ) {});
	}

	Account.prototype.item = function(id, name, children){
		this.id = id;
		this.name = name;
		this.first_name = '';
		this.last_name = '';
		this.email = '';
		this.children = ko.observableArray(children);
		childrenArray = this.children;
		this.addGuest = function(){
			var account = new Account();
			account.save(this);
		}
	}

	Account.prototype.save = function(account){
		var invitee = new Invitee;
		var accountObj = new Account();
		$.post("postInvitee", 
	  		{
	  			account_id: account.id, 
	  			first_name: account.first_name, 
	  			last_name: account.last_name, 
	  			email: account.email
	  		},
	  		
	  		function saveInviteeResult(result){
	  			if(result !== 'False'){
		  			account.children.push(new invitee.item(
		  					result[0].id,
							account.first_name,
							account.last_name,
							account.email
						)
					);
					accountObj.clearForm(account.id, account);
				}
			}
		);
	}

	Account.prototype.clearForm = function(id, account){
		account.first_name = '';
		account.last_name = '';
		account.email = '';
		$('#first_name-' + id).val('');
		$('#last_name-' + id).val('');
		$('#email-' + id).val('');
	}

	Account.prototype.childrenArray = function(accountId){
		var children = [];
		var invitee = new Invitee;
		inviteeData = invitee.collection(accountId);
		inviteeData.done(function processInviteeResponse(invData){
			_.each(invData, function pushInviteesOntoArray(inviteeModel){
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

	Invitee.prototype.item = function(id, first_name, last_name, email) {
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.deleteGuest = function(){
			var invitee = new Invitee();
			invitee.delete(this.id);
		}
	}


	Invitee.prototype.delete = function(id){
		var invitee = new Invitee;
		var self = this;
		$.post("deleteInvitee", 
	  		{id: id},
	  		function(result){
	  			self.removeFromChildrenArray(id);
			}	
		);
		
		self.removeFromChildrenArray = function (id){
			for (i = 0; i < pageCollection().length; i++) { 
				for (var j = 0; j < pageCollection()[i].children().length; j++){
					if(pageCollection()[i].children()[j].id === id){
						pageCollection()[i].children.remove(pageCollection()[i].children()[j]);
					}
				}
			}
		}
		
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
			pageCollection = self.accountsArray;
		});

	}

	inviteTool = new InviteTool;
	ko.applyBindings(new inviteTool.viewModel);
})();

