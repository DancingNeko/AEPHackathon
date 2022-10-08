//let canvas = document.getElementById("draw");

var dataStr;

const fileInput = document.getElementById('csv')
const readFile = () => {
  const reader = new FileReader()
  reader.onload = () => {
    //document.getElementById('out').innerHTML = reader.result
    dataStr = reader.result;
    mat = str2matrix(dataStr)
    flipped = mat[0].map((_, colIndex) => mat.map(row => row[colIndex]));
    const xPoints = flipped[128].slice(2).map(Number);
    const yPoints = flipped[30].slice(2).map(Number);
    plotData(xPoints,yPoints);
    document.getElementById("out").innerHTML = "done";
  }
  // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
}
fileInput.addEventListener('change', readFile)


function str2matrix(dataStr){
    dataArr = dataStr.split("\n");
    for (i = 0; i < dataArr.length; i++) {
        dataArr[i] = dataArr[i].split(",");
    }
    return dataArr; //[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

class Windmill {
    constructor(diameter) {
        rotorArea = Math.PI * Math.pow((diameter / 2),2);
    }
    get rotorArea () {
        return rotorArea;
    }
    getPower (airDensity, windSpeed) {
        return 1/2 * this.calcVelocity(airDensity, windSpeed) * windSpeed * windSpeed;
    }
    calcVelocity(airDensity, windSpeed) {
        return rotorArea * airDensity * windSpeed;
    }
    
}

function plotData(xPoints, yPoints) {
    // Create an XY Plotter
    let myPlotter = new XYPlotter("draw");

    numPoints = xPoints.length;
    // Plot the Points
    myPlotter.plotPoints(numPoints, xPoints, yPoints, "blue");

    // Plotter Object
    function XYPlotter(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.xMin = 0;
        this.yMin = 0;
        this.xMax = this.canvas.width;
        this.yMax = this.canvas.height;

        // Plot Points Function
        this.plotPoints = function(n, xArr, yArr, color, radius = 3) {
            yMaxVal = 0;
            yArr.forEach(val => {
                yMaxVal = val > yMaxVal? val : yMaxVal;
            });
            xMaxVal = 0;
            xArr.forEach(val => {
                xMaxVal = val > xMaxVal? val : xMaxVal;
            });
            alert(xMaxVal);

            

            for (let i = 0; i < n; i++) {
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.ellipse(xArr[i] * this.xMax / xMaxVal, yArr[i] * this.yMax / yMaxVal, radius, radius, 0, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

    } 
}// End Plotter Object
    
