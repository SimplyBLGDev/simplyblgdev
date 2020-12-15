var width;
var height;
var baseLine;
var signalLine;
var baseLineWidth=2;
var signalLineWidth=8;
var baseLineColor="black";
var signalLineColor="red";
var encoding;
var code;
var amplitude;
var svg;

function setUp(w, h, bLine, sLine, bin, enc, svgSrc) {
    width = w;
    height = h;
    baseLine = bLine;
    signalLine = sLine;
    code = bin;
    encoding = enc;
    amplitude = height / 2;
    svg = svgSrc;
    console.log(svg);
}

function updateValues() {
    drawBaseLine(baseLine);
    drawSignalLine(signalLine);
    amplitude = height / 3;
}

function updateCode(newCode) {
    code = newCode;
}

function drawBaseLine(line) {
    line.style.stroke = baseLineColor;
    line.style["stroke-width"]=baseLineWidth + "px";
    line.points[0].x = 0;
    line.points[0].y = height/2;
    line.points[1].x = width;
    line.points[1].y = height/2;
}

function drawSignalLine(line) {
    line.stroke = signalLineColor;
    line.style["stroke-width"]=signalLineWidth;
    line.style.fill = "none";

    var pointWidth = width/(code.length);
    var points = new Array(code.length);

    var encodeFunction;
    switch (encoding) {
        case "ASK": encodeFunction = ASK; break;
        default: encodeFunction = ASK; break;
    }

    for (var i = 0; i < code.length; i++) {
        points[i] = encodeFunction(pointWidth, i, parseInt(code[i]));
    }

    var dataString = "";
    for (var j = 0; j < points.length; j++) {
        var x0 = points[j].x - (pointWidth/2);
        var y0 = points[j].y - amplitude;
        var x1 = points[j].x + (pointWidth/2);
        var y1 = points[j].y;
        // M x0 y0
        // C x0 y1
        //   x1 y1
        //   x1 y0
        dataString += "M " + x0 + "," + y0 + " C " + x0 + "," + y1 + " " + x1 + "," + y1 + " " + x1 + "," + y0;
    }
    
    line.setAttribute("d", dataString);
}

function ASK(pointWidth, i, bit) {
    let p = svg.createSVGPoint();
    
    p.x = pointWidth * i;
    p.y = (bit-0.5) * 2 * amplitude + height/2;

    return p;
}

export { setUp, updateValues, updateCode }