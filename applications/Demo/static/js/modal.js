function Modal(){}

Modal.prototype.addClickHandler = function() {
	$('.modal').click(function(){
		console.log('asdfasdf');
	});
}

modal = new Modal;
modal.addClickHandler();
