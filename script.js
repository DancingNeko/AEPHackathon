//let canvas = document.getElementById("draw");


var TurbineData = Papa.parse("Pablo's Import - Menu.csv", {
	download: false,
	step: function(row) {
		console.log("Row:", row.data);
	},
	complete: function() {
		console.log("All done!");
	}
});

class Windmill {
    
}
