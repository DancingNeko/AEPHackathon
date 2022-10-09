//let canvas = document.getElementById("draw");


const fileInput = document.getElementById('csv')
let xDatas = [];
let yDatas = [];
let allLoaded = false


class Columns {
    constructor() {
        this.indeces = {
            "windSpeed":127,
            "windDirection":124,
            "expectedPower":29,
            "actualPower":69,
            "expectedPower":29,
            "ambientAirTemp":88,
            "generatorInboardTemp":89,
            "generatorOutboardTemp":90,
            "rotationSpeed":59
        }
        this.valueSet = {
            "windSpeed":[],
            "windDirection":[],
            "actualPower":[],
            "expectedPower":[],
            "ambientAirTemp":[],
            "generatorInboardTemp":[],
            "generatorOutboardTemp":[],
            "rotationSpeed":[]
        }
        this.varNames = ["windSpeed","windDirection","expectedPower","actualPower",
            "expectedPower","ambientAirTemp","generatorInboardTemp",
            "generatorOutboardTemp","rotationSpeed"];
    }
    addValues(values) {
        this.varNames.forEach(varName => {
            this.valueSet[varName].push(values[this.indeces[varName]].slice(2).map(Number));
        });
    }
    getValueSet() {
        return this.valueSet;
    }
    getVarNames() {
        return this.varNames;
    }
}


const column = new Columns();

makeSelection();
function makeSelection() {
    alert(0);

    const xSelect = document.getElementById("xSelect");
    const ySelect = document.getElementById("ySelect");

    let options = column.getVarNames();
    
    for (i=0; i < options.length; i++) {
        let xNode = document.createElement('option');
        xNode.setAttribute('value', options[i]);
        xNode.innerHTML = options[i];

        let yNode = document.createElement('option');
        yNode.setAttribute('value', options[i]);
        yNode.innerHTML = options[i];
        
        xSelect.appendChild(xNode);
        ySelect.appendChild(yNode);
    }
}

const readFile = (file) => {
    const reader = new FileReader();
  reader.onload = () => {
    dataStr = reader.result;
    mat = str2matrix(dataStr);
    flipped = mat[0].map((_, colIndex) => mat.map(row => row[colIndex]));
    column.addValues(flipped);
  }
  reader.readAsBinaryString(file);
}
fileInput.addEventListener('change', readFiles)

let xSelect = document.getElementById("xSelect");
let ySelect = document.getElementById("ySelect");



/**
 * 
 * @param {*} x not telling
 * @param {*} y idk
 */
function showGraph(x,y) {
    xDatas,yDatas;

        xDatas = column.getValueSet()[x];
        // yDatas = column.getValueSet()[y];
        y.forEach((yVal) => {yDatas.push(column.getValueSet()[yVal])});
    plotData(xDatas,yDatas)        
}

function graphGen() {
    let allSelected = [];
    let options = ySelect.getElementsByTagName("option");
    for(i = 0; i < options.length; i++) {
        if(options[i].selected)
            allSelected.push(options[i].value)
    }
    /*options.forEach(option => {
        if (option.selected) {
            allSelected.push(option);
        }
    });*/
    console.log(allSelected)
    showGraph(xSelect.value, allSelected);
}


function readFiles() {
    xDatas = [];
    yDatas = [];

    for (i=0; i < fileInput.files.length; i++) {
        
        readFile(fileInput.files[i]);
        if(i == fileInput.files.length - 1)
            allLoaded = true;
    }

}



function str2matrix(dataStr){
    dataArr = dataStr.split("\n");
    for (i = 0; i < dataArr.length; i++) {
        dataArr[i] = dataArr[i].split(",");
    }
    return dataArr; //[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

function plotData(xData, yData) {
    var data = [];

    for (i = 0; i < xData.length; i++) {
        data.push({
            x: xData[i],
            y: yData[i],
            opacity: 0.5,
            mode: "markers",
            type: "scatter"
        });
    }
    Plotly.newPlot("scatter", data);
}















//function 
/*

>>>>,[>,]<[<]> 0 0 _i_nput
remove commas from input & replace with spaces : 
[
    <++++ ++++ [>-----<-] > ---- 0 0 0 _(i minus comma)_nput
    [[<+>-] ++++ ++++ [<+++++>-] < ++++ >] 0 i _0_ nput
    >
] 0 0 0 inputNoCommas 0 _0_
<<[[<]<]>> 0 0 _i_nputNoCommas
replace new lines with two spaces (erroneously only does one): 
[[
    ---- ---- -- 0 0 _(i minus new line)_nput
    [[<<+>>-] << ++++ ++++ ++ >>] 0 i _0_ nput
    >
]>] 0 inputNoCommasOrNewLines 0 0 0 _0_
*/