(function vanillaInviteToolWrapper() {
	
	const accounts = () => {
		function getAccounts(){
			let httpRequest = new XMLHttpRequest();
			httpRequest.onreadystatechange = (data) => {
				if (httpRequest.readyState === 4 && httpRequest.status === 200) {
					buildAccounts(JSON.parse(httpRequest.responseText));
				}		
			};
			httpRequest.open('GET', "getAccountCollection/");
			httpRequest.send();
		};
		
		return {
			getAccounts: getAccounts
		};
	}
	
	const invitees = () => {
		function getInvitees(){
			let httpRequest = new XMLHttpRequest();
			httpRequest.onreadystatechange = (data) => {
				if (httpRequest.readyState === 4 && httpRequest.status === 200) {
					console.log(httpRequest.responseText);
				}		
			};
			httpRequest.open('GET', "getInviteeCollection/");
			httpRequest.send();
		};
		return {
			getInvitees: getInvitees
		};
	}
	
	const buildAccounts = (accountData) => {
		let container = document.getElementById("page-container");
		accountData.forEach((account) => {
			let accountTemplate	= document.createElement('p');
			accountTemplate.innerHTML = account.name;
			container.appendChild(accountTemplate);
		});
	}	
	
	
	const pageView = () => {
		let accountCollection = accounts()
		accountCollection.getAccounts();
		
	}	
	
	pageView();
	//let y = invitees()
	//y.getInvitees();
})();


