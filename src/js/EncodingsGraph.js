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
}

function updateValues() {
    drawBaseLine(baseLine);
    drawSignalLine(signalLine);
}

function updateCode(newCode) {
    code = newCode;
    updateValues();
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
        case "FSK": encodeFunction = FSK; break;
        default: encodeFunction = ASK; break;
    }

    var carrierDirection = 1;
    for (var i = 0; i < code.length; i++) {
        points[i] = encodeFunction(pointWidth, i, parseInt(code[i]), carrierDirection);
        if (points[i].length % 2 == 1)
            carrierDirection *= -1;
    }

    var dataString = "";
    dataString += "M " + points[0][0][0].x + "," + points[0][0][0].y;
    for (var j = 0; j < points.length; j++) { // iterate through bits
        for (var k = 0; k < points[j].length; k++) { // iterate through waves
            // M x0 y0
            // C x0 y1
            //   x1 y1
            //   x1 y0

            // Draw each curve
            dataString += " C " + points[j][k][1].x + "," + points[j][k][1].y + " " + points[j][k][2].x + "," + points[j][k][2].y + " " + points[j][k][3].x + "," + points[j][k][3].y;
        }
    }
    
    line.setAttribute("d", dataString);
}

// eslint-disable-next-line
function ASK(pointWidth, i, bit, m) {
    let p0 = svg.createSVGPoint();
    let p1 = svg.createSVGPoint();
    let p2 = svg.createSVGPoint();
    let p3 = svg.createSVGPoint();
    
    var r = 1.25 * amplitude * m;
    var c = 0.375 * pointWidth;

    p0.x = pointWidth * i;
    p1.x = p0.x + c;
    p3.x = pointWidth * (i + 1);
    p2.x = p3.x - c;

    p0.y = height/2;
    p3.y = height/2;
    p1.y = bit * r + height/2;
    p2.y = bit * r + height/2;

    return [[p0, p1, p2, p3]];
}

// eslint-disable-next-line
function FSK(pointWidth, i, bit, m) {
    var res = [];

    var waves = 1;
    if (bit == 1)
        waves = 4;
    
    for (var w = 0; w < waves; w++) {
        let p0 = svg.createSVGPoint();
        let p1 = svg.createSVGPoint();
        let p2 = svg.createSVGPoint();
        let p3 = svg.createSVGPoint();

        var adjustedPWidth = pointWidth / waves;
        var offX = pointWidth * i;

        var r = 1.25 * amplitude * m;
        var c = 0.375 * adjustedPWidth;

        p0.x = offX + adjustedPWidth * w;
        p1.x = p0.x + c;
        p3.x = offX + adjustedPWidth * (w + 1);
        p2.x = p3.x - c;

        p0.y = height/2;
        p3.y = height/2;
        p1.y = r + height/2;
        p2.y = r + height/2;

        m *= -1;

        res.push([p0, p1, p2, p3]);
    }

    return res;
}

function updateAmplitude(newAmp) {
    amplitude = newAmp;
    updateValues();
}

function updateEncoding(newEncoding) {
    encoding = newEncoding;
    updateValues();
}

export { setUp, updateCode, updateAmplitude, updateEncoding }