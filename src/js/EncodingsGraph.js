var width;
var height;
var baseLine;
var signalLine;
var bitLine;
var baseLineWidth=2;
var signalLineWidth=8;
var bitLineWidth=8;
var baseLineColor="blue";
var signalLineColor="red";
var bitLineColor="#6905b5";
var bitLineFill="#6905b566";
var encoding;
var frequency;
var code;
var amplitude;
var highlightRect;
var svg;

var bitLineHeight=60;

function setUp(w, h, bLine, sLine, btLine, bin, enc, freq, hRect, svgSrc) {
    width = w;
    height = h-bitLineHeight-bitLineWidth/2;
    baseLine = bLine;
    signalLine = sLine;
    bitLine = btLine;
    code = bin;
    encoding = enc;
    frequency = freq;
    amplitude = height / 2;
    highlightRect = hRect;
    svg = svgSrc;
}

function updateValues() {
    drawBaseLine(baseLine);
    drawSignalLine(signalLine);
}

function updateCode(newCode) {
    code = newCode;
    updateValues();
    drawbitLine(bitLine);
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

    var encodeFunction;
    var levels=1;
    switch (encoding) {
        case "ASK": encodeFunction = ASK; break;
        case "FSK": encodeFunction = FSK; break;
        case "BPSK": encodeFunction = BPSK; break;
        case "4QAM": encodeFunction = QAM; levels=2; break;
        case "8QAM": encodeFunction = QAM; levels=3; break;
        default: encodeFunction = ASK; break;
    }

    var carrierDirection = 1;

    var superBits = []; // Contains the groups of bits in accordance to the levels of the encoding

    for (var b = 0; b < code.length; b+=levels)
        superBits.push(code.slice(b, b + levels));
    
    var points = new Array(Math.floor(code.length / levels));
    var pointWidth = width/(code.length / levels);

    for (var i = 0; i < superBits.length; i += 1) {
        points[i] = encodeFunction(pointWidth, i, parseInt(superBits[i], 2), carrierDirection, levels);
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

function drawbitLine(line) {
    line.style.stroke = bitLineColor;
    line.style["fill"]=bitLineFill;
    line.style["stroke-width"]=bitLineWidth + "px";
    line.points.clear();

    var lastBit = parseInt(code[0]);
    lastBit = Math.abs(lastBit-1);

    var firstPoint = svg.createSVGPoint();
    firstPoint.x = 0;
    firstPoint.y = height+bitLineHeight;
    line.points.appendItem(firstPoint);

    for (var i = 0; i < code.length; i++) {
        var currentBit = parseInt(code[i]);
        currentBit = Math.abs(currentBit-1);
        var p = svg.createSVGPoint();
        var p2 = svg.createSVGPoint();

        p.x = (width/(code.length))*i;
        p2.x = p.x;
        p.y = height+lastBit*bitLineHeight;
        p2.y = height+currentBit*bitLineHeight
        
        line.points.appendItem(p);
        line.points.appendItem(p2);
        lastBit = currentBit;
    }

    var lastPoint = svg.createSVGPoint();
    lastPoint.x = width;
    lastPoint.y = height+lastBit*bitLineHeight;
    line.points.appendItem(lastPoint);

    lastPoint = svg.createSVGPoint(); // return to 0
    lastPoint.x = width;
    lastPoint.y = height+bitLineHeight;
    line.points.appendItem(lastPoint);
}

// eslint-disable-next-line
function ASK(pointWidth, i, bit, m, levels) {
    var res = [];

    var waves = frequency;
    var amp = 0;
    if (bit == 1)
        amp = amplitude;

    for (var w = 0; w < waves; w++) {
        let p0 = svg.createSVGPoint();
        let p1 = svg.createSVGPoint();
        let p2 = svg.createSVGPoint();
        let p3 = svg.createSVGPoint();

        var adjustedPWidth = pointWidth / waves;
        var offX = pointWidth * i;

        var r = 1.25 * amp * m;
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

// eslint-disable-next-line
function FSK(pointWidth, i, bit, m, levels) {
    var res = [];

    var waves = frequency;
    if (bit == 1)
        waves = frequency*3;
    
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

// eslint-disable-next-line
function BPSK(pointWidth, i, bit, m, levels) {
    var res = [];

    var waves = frequency;
    if (bit == 1)
        m *= -1;
    
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

// eslint-disable-next-line
function QAM(pointWidth, i, bit, m, levels) {
    var res = [];

    var waves = frequency;
    var amp = amplitude;
    if (bit % 2 == 1)
        m *= -1;
    
    if ((bit >> 1) % 2 == 1)
        amp /= levels;

    if ((bit >> 2) % 2 == 1)
        amp /= levels;

    for (var w = 0; w < waves; w++) {
        let p0 = svg.createSVGPoint();
        let p1 = svg.createSVGPoint();
        let p2 = svg.createSVGPoint();
        let p3 = svg.createSVGPoint();

        var adjustedPWidth = pointWidth / waves;
        var offX = pointWidth * i;

        var r = 1.25 * amp * m;
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

function updateFrequency(newFrequency) {
    frequency = newFrequency;
    updateValues();
}

// eslint-disable-next-line
function graphOnMouseHover(x, y) {
    var bitsPerSymbol = 1;
    switch (encoding) {
        case "4QAM": bitsPerSymbol = 2; break;
        case "8QAM": bitsPerSymbol = 3; break;
        default: bitsPerSymbol = 1; break;
    }

    var symbolAreaLength = (bitsPerSymbol * width) / code.length;
    var pointedPosition = Math.floor(x / symbolAreaLength);

    updateHighlightRectangle(
        symbolAreaLength,
        height,
        pointedPosition*symbolAreaLength,
        0
    );

    var highlightedSymbol = parseInt(code.substring(bitsPerSymbol*pointedPosition, bitsPerSymbol*(pointedPosition+1)), 2);

    return highlightedSymbol;
}

function updateHighlightRectangle(width, height, posX, posY) {
    highlightRect.setAttributeNS(null, 'x', posX);
    highlightRect.setAttributeNS(null, 'y', posY);
    highlightRect.setAttributeNS(null, 'width', width);
    highlightRect.setAttributeNS(null, 'height', height+bitLineHeight);
}

export { setUp, updateCode, updateAmplitude, updateEncoding, updateFrequency, graphOnMouseHover }