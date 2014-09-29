//main window
var mainWindow = Ti.UI.createWindow({
	backgroundColor : "006633",
	title: "Bon Appetit",
	navBarHidden:false
});

//////NAVIGATION WINDOW

var navWindow = Ti.UI.iOS.createNavigationWindow({
	window : mainWindow
});

//Main Window button code
//Menu Button
var enter = Ti.UI.createView({
	backgroundColor : "#F0FFFF",
	borderWidth: 2,
	width : 260,
	height : 80,
	bottom : 150,
	left: 30,
	borderRadius : 10,
	opacity: 0
});

var enterBtnLabel = Ti.UI.createLabel({
	text : "Restaurant Menu",
	color : "#000000",
	font : {
		fontSize : "20dp",
		fontFamily : "Helvetica"
	}
});
//Catering Button
var enter2 = Ti.UI.createView({
	backgroundColor : "#F0FFFF",
	borderWidth: 2,
	width : 260,
	height : 80,
	bottom : 40,
	left: 30,
	borderRadius : 10,
	opacity: 0
});

var enterBtnLabel2 = Ti.UI.createLabel({
	text : "Catering",
	color : "#000000",
	font : {
		fontSize : "20dp",
		fontFamily : "Helvetica"
	}
});


// Quick fade animation for main page buttons

var ani = Ti.UI.createAnimation({
	duration: 1000,
	opacity: 1
});

enter.animate(ani);
enter2.animate(ani);

//Window 2 which contains the movie list

var window2 = Ti.UI.createWindow({
	backgroundColor : "#F0FFFF",
	title: "Menu",
	layout: 'vertical'
});

//Search Bar located on Window 2
var search = Titanium.UI.createSearchBar({
    barColor:'#000', 
    showCancel:true,
    height:43,
    top:0,
});

//Table View

var table = Ti.UI.createTableView({
	backgroundColor: "006633",
	search: search,
});

//JSON file
var data = require('myJSON');
console.log(data);

//Data Output for table view

var getData = function() {
	var detailWindow3 = Ti.UI.createWindow({
		backgroundColor : "#F0FFFF",
		name : this.title
	});
	
	var descText3 = Ti.UI.createLabel({
		text : this.desc,
		top: 50,
		left: 20,
		right: 20,
		font : {
			fontSize : "20pd",
			fontFamily : "Arial"
		}
	});

	var priceText3 = Ti.UI.createLabel({
		text : this.price,
		top: 300,
		left: 20,
		font : {
			fontSize : "20pd",
			fontFamily : "Arial"
		}
	});

	
	detailWindow3.add(descText3,priceText3);
	navWindow.openWindow(detailWindow3);
};

//Table View 

var menuDesc = Ti.UI.createTableViewSection({
});

var test = function() {
	//The Loop
	var mySections = [];

	for (var i in data.myJSON) {
	
		console.log(data.myJSON[i]);
		//Make the tableViewSections
		var tableSection = Ti.UI.createTableViewSection({
			headername : data.myJSON[i].headname
		});

		for (var j in data.myJSON[i]["menu"]) {
			var tableRow = Ti.UI.createTableViewRow({
				title: data.myJSON[i].menu[j].title,
				desc : data.myJSON[i].menu[j].desc,
				price: data.myJSON[i].menu[j].price,
				hasDetail : true
			});
			tableRow.addEventListener("click", getData);
			tableSection.add(tableRow);
		}

		mySections.push(tableSection);
	}

	table.setData(mySections);
	window2.add(search,table);
};

test(); 

enter.addEventListener("click", function(p){
	navWindow.openWindow(window2);
});

enter2.addEventListener("click", function(p){
	navWindow.openWindow(window3);
});

//////////////////Catering Information Form////////////////

//window 3 used for catering info input
var window3 = Ti.UI.createWindow({
	backgroundColor: "006633",
	title: "Menu",
});

var restaurant = Ti.UI.createImageView({
	image: "photo.png",
	top: 40,
});

//Form Instructions Message

var instructions = Ti.UI.createLabel({
	text : "At Bon Appetit's we have been serving your catered events for over 30 years. Please fill out the form explaining your special event and a member of our staff will be contacting you shortly.",
	left : 20,
	right: 20,
	color : "#ffffff",
	top: 20,
	font : {
		fontSize : "16dp",
		fontFamily : "Helvetica"
	}
});

var view = Ti.UI.createView();

var firstField = Ti.UI.createTextField({
	hintText: "First name",
	height: 35,
	top: 135,
	left: 20,
	width: 250,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
}); 

var lastField = Ti.UI.createTextField({
	hintText: "Last name",
	height: 35,
	top: 190,
	left: 20,
	width: 250,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var dateField = Ti.UI.createTextField({
	hintText: "Wedding date",
	height: 35,
	top: 245,
	left: 20,
	width: 140,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var emailField = Ti.UI.createTextField({
	hintText: "Email address",
	height: 35,
	top: 300,
	left: 20,
	width: 250,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var phoneField = Ti.UI.createTextField({
	hintText: "Phone number",
	height: 35,
	top: 355,
	left: 20,
	width: 250,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var submit = Ti.UI.createButton({
	title: "Submit",
	color: "ffffff",
	fontSize: "50pd",
	bottom: 30,
	left: 30,
	width: 260,
	height: 50,
	backgroundColor: '00cc00',
	borderRadius: 10,
	borderWidth : 2 
});

view.add(firstField,lastField,dateField,emailField,phoneField);
view.add(submit);
window3.add(view, instructions);

///////////////////window open////////////
var confirmWindow = Ti.UI.createWindow({
	backgroundColor: "000000",
	title: "Bon Appettit",
});

var opts = {
  title: 'Ready to Submit?'
};
  {opts.options = ['Confirm', 'Cancel'];
};




submit.addEventListener('click', function(e){
  var dialog = Ti.UI.createOptionDialog(opts).show();
});


//////////Window Open


enter.add(enterBtnLabel);
enter2.add(enterBtnLabel2);
mainWindow.add(enter,enter2,restaurant);
navWindow.open();
