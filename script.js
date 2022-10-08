//let canvas = document.getElementById("draw");



const fileInput = document.getElementById('csv')
const readFile = () => {
  const reader = new FileReader()
  reader.onload = () => {
    var xDatas = [];
    var yDatas = [];
    alert(fileInput.files.length)
    for(i = 0; i < fileInput.files.length; i++){
        reader.readAsBinaryString(fileInput.files[i]);
        dataStr = reader.result;
        mat = str2matrix(dataStr[i]);
        flipped = mat[0].map((_, colIndex) => mat.map(row => row[colIndex]));
        var windSpeed = flipped[127].slice(2).map(Number);
        var windDirection = flipped[124].slice(2).map(Number);
        var expectedPower = flipped[29].slice(2).map(Number);
        var actualPower = flipped[69].slice(2).map(Number);
        //const airDensity = flipped[4].slice(2).map(Number);
        var ambientAirTemp = flipped[88].slice(2).map(Number);
        var generatorInboardTemp = flipped[89].slice(2).map(Number);
        var generatorOutboardTemp = flipped[90].slice(2).map(Number);
        var rotationSpeed = flipped[59].slice(2).map(Number);
        //const driveTrainAcceleration = flipped[27].slice(2).map(Number);
        //const rotorSpeed = flipped[83].slice(2).map(Number);
        //var offset = [];
        //for (i = 0; i < expectedPower.length; i++) {
        //    offset.push((expectedPower[i] - actualPower[i])/ expectedPower[i]);
        //}
        xDatas.push(rotationSpeed);
        yDatas.push(actualPower);
    }
    plotData(xDatas,yDatas);
    
    document.getElementById("out").innerHTML = "done";
  }
  // start reading the file. When it is done, calls the onload event defined above.
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
    diameter = 127;
    hubHeight = 90;
    rotorArea = Math.PI * Math.pow((diameter / 2),2);

    constructor() {
        
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


function plotData(xData, yData) {
    var line;
    var data = [];
    for (i = 0; i < xData.length; i++) {
        line = {
            x: xData[i],
            y: yData[i],
            opacity: 0.5,
            mode: "markers",
            type: "scatter"
        };
        data.push(line);
    }
    Plotly.newPlot("scatter", data);
}

