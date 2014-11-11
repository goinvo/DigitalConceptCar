//
// JavaScript, using jQuery 1.3.1
//
// Building a digital concept car
// Andrei Micahel Herasimchuk
//
// Involution Studios LLC
//



// da = Digital Appliance, ki = Kiosk, ba = Browser Application
// dc = Desktop Client, ws = Web Site, ma = Mobile Application

// pp = Paper Prototype, cs = Click-Thru Screenshots, ch = Click-Thru HTML
// ih = Interactive HTML + JS, fl = Flash or Silverlight, ai = Air or WPF

var conceptCarData = {
	"ws": { "pp": [1,1,1,0,0,1],"cs": [2,1,2,3,0,2],"ch": [4,4,4,4,2,4],"ih": [4,3,4,4,2,4], "fl": [1,0,1,2,1,1],"ai": [0,0,0,1,0,0] },
	"ba": { "pp": [0,0,1,0,0,1],"cs": [1,1,2,2,0,2],"ch": [2,3,3,3,1,2],"ih": [4,4,4,4,3,4], "fl": [2,2,3,3,2,2],"ai": [1,1,2,2,1,1] },
	"ki": { "pp": [0,0,1,0,0,1],"cs": [1,1,2,2,0,2],"ch": [2,3,3,3,1,2],"ih": [3,4,4,4,3,4], "fl": [2,2,3,3,2,2],"ai": [2,2,3,3,2,2] },
	"ma": { "pp": [0,0,1,0,0,1],"cs": [1,1,2,2,0,1],"ch": [2,2,2,3,0,2],"ih": [2,3,3,3,1,3], "fl": [3,3,3,3,1,3],"ai": [4,3,4,3,1,4] },
	"dc": { "pp": [0,0,0,0,0,1],"cs": [1,1,2,1,0,1],"ch": [1,2,1,2,0,1],"ih": [2,2,2,3,1,2], "fl": [3,3,3,3,1,3],"ai": [4,4,4,4,3,4] },
	"da": { "pp": [0,0,0,0,0,1],"cs": [1,1,2,1,0,1],"ch": [1,2,1,2,0,1],"ih": [1,2,2,3,1,1], "fl": [3,3,3,3,1,3],"ai": [3,4,3,4,2,3] }
};

var xAxis = ["stickiness","speed","iterate","assets","code","stakeholders"];
var yAxis = ["busywork","marginal","acceptable","effective","optimal"];

// Create a default state
var currentState = {product:"ba",method:"ih"};


// DoVarious interactive stuff
$(document).ready(function(){

	drawData();
	drawGraph();

	$("#products li").click(function(e){
		e.preventDefault();	
		setProduct(this.id);
	});	

	$("#methods li").click(function(e){
		e.preventDefault();	
		setMethod(this.id);
	});

	$("#markers img").hover(
		function() {
			$("#hover_"+this.className).fadeIn(300);
		},
		function() {
			$("#hover_"+this.className).fadeOut(150);
		}
	);

	$("#xaxis li").hover(
		function() {
			$("#xaxis div.tip_"+this.className).fadeIn(300);
		},
		function() {
			$("#xaxis div.tip_"+this.className).fadeOut(150);
		}
	);

	$("#colorpicker li").click(function(){
		var newColor = $(this).css("background-color");
		$("body").css("background-color", newColor);
	});

});







function setProduct(productVar) {
	currentState.product = productVar;
	drawData();
};

function setMethod(methodVar) {
	currentState.method = methodVar;
	drawData();
};

function drawData() {

	//Reset everything to clear visual states
	$("#products li").css("background-position", "0px 0px");
	$("#methods li").css("background-position", "0px 0px");
	for (var mainDiv in xAxis) {
		for (var subDiv in yAxis){
			$("div."+xAxis[mainDiv]+" div."+yAxis[subDiv]).css("display", "none");
		};
	};
	$("#tools div").css("display", "none");

	// Draw new state
	$("#"+currentState.product).css("background-position", "0px -100px");
	$("#"+currentState.method).css("background-position", "0px -40px");
	
	$("#tools div."+currentState.method).css("display", "block");
	
	drawGraph();
};

function drawGraph() {
	var markerState = conceptCarData[currentState.product][currentState.method];
	$("#markers img").each(function(index, element){

		// Which marker to move
		var newMarkerLocation	= markerState[index];

		// Create a description from the marker's index
		var whichSection		= xAxis[index];
		var whichDescription	= yAxis[newMarkerLocation];
		var newDescription		= "div."+whichSection+" div."+whichDescription;

		// Convert marker to new pixel value and move it to new location
		newMarkerLocation = 720-(50*newMarkerLocation);
		$(element).animate({"top": newMarkerLocation+"px"}, 1000);

		// Show the correct description that maps to makers new location
		$(newDescription).css("display", "block");

		// Insert the correct hover content and position the hover divs
		$("#hover_"+whichSection).html($(newDescription).html());
		$("#hover_"+whichSection).css("top", newMarkerLocation+25);
	});
};




