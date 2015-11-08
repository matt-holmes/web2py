function AppViewModel() {
    this.firstName = ko.observable("Matt");
    this.lastName = ko.observable("Holmes");
    
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);

	this.capitalizeLastName = function() {
        var currentVal = this.lastName();        // Read the current value
        this.lastName(currentVal.toUpperCase()); // Write back a modified value
    };
}
// Activates knockout.js
//ko.applyBindings(new AppViewModel());



function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);

	self.formattedPrice = ko.computed(function() {
		var price = self.meal().price;
		return price ? "$" + price.toFixed(2) : "None";
	});
}

function ReservationsViewModel(){
    var self = this;

    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 50.29 },
        { mealName: "Ultimate (Rhino)", price: 500 },
    ];

    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Matt", self.availableMeals[2]),
    ]);  
	
	self.addSeat = function() {
		self.seats.push(new SeatReservation('', self.availableMeals[1]));
	}  
	self.removeSeat = function(seat) {
		self.seats.remove(seat);
	}

	self.totalSurcharge = ko.computed(function() {
		var total = 0;
		for (var i = 0; i < self.seats().length; i++) {
			total += self.seats()[i].meal().price;
		}
		return total;
	});
}


ko.applyBindings(new ReservationsViewModel());

function WebmailViewModel() {
	var self = this;
	self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
	self.chosenFolderId = ko.observable();
	self.chosenFolderData = ko.observable();
	
	self.goToFolder = function(folder) { 
		self.chosenFolderId(folder); 
		$.get('/mail', { folder: folder }, self.chosenFolderData);
	};

};

//ko.applyBindings(new WebmailViewModel());




