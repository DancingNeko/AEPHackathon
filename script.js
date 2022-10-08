//let canvas = document.getElementById("draw");


var TurbineData = Papa.parse("addresses.csv", {
	download: false,
	step: function(row) {
		console.log("Row:", row.data);
	},
	complete: function() {
		console.log("All done!");
	}
});

/**
 * @param a - first parameter
 * @param b - second parameter
 * @returns - nothing ,this is a void method
 * 
 */
function test(a, b) {

console.log(a + b);
}
test(1,2);




