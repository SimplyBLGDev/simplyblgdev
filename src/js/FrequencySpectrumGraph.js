var width;
var height;
var leftStop;
var rightStop;
var leftStopText;
// eslint-disable-next-line
var rightStopText;
var line;
var encoding;
var absOff = 0;
var svg;

function setUpFrequencySpectrum(w, h, lStop, rStop, lStopText, rStopText, _line, enc, _svg) {
    width = w;
    height = h;
    leftStop = lStop;
    rightStop = rStop;
    leftStopText = lStopText;
    rightStopText = rStopText;
    line = _line;
    svg = _svg;
    encoding = enc;
    updateFrequencySpectrumsFrequency(1);
}

function updateFrequencySpectrum(newEncoding) {
    encoding = newEncoding;
    drawLine();
}

// eslint-disable-next-line
function updateFrequencySpectrumsFrequency(newFrequency) {
    //absOff = (newFrequency-1) * (width*0.3*0.25);
    updateFrequencySpectrum(encoding);
}

function drawLine() {
    // The relative amplitude of the waves on the diagram
    const WAVES = [0.15, 1, 0.15];
    const FSK_WAVES = [0.1, 1, 0.1, 0.1, 1, 0.1];

    var waveAmplitudes = WAVES;
    var stopPos;
    var bandWidth;

    switch (encoding) {
        case "ASK":
        case "BPSK":
        case "4QAM":
        case "8QAM": stopPos = 0.5; bandWidth = 1; break;
        case "FSK": waveAmplitudes = FSK_WAVES; stopPos = 0.5; bandWidth = 3; break;
    }

    var points = getLinePoints(waveAmplitudes);

    var dataString = "";
    dataString += "M " + points[0][0].x + "," + points[0][0].y;
    for (var k = 0; k < points.length; k++) { // iterate through waves
        // M x0 y0
        // C x0 y1
        //   x1 y1
        //   x1 y0

        // Draw each curve
        dataString += " C " + points[k][1].x + "," + points[k][1].y + " " + points[k][2].x + "," + points[k][2].y + " " + points[k][3].x + "," + points[k][3].y;
    }
    
    line.setAttribute("d", dataString);

    // Complex stuff, transforms 3 into 2 and 6 into 4, which is the correspondence between number of waves and waves occupied (since noise waves are half width)
    var pWidth = width / (Math.floor(waveAmplitudes.length/2)+1);
    
    leftStop.points[0].x = stopPos * pWidth + absOff;
    leftStop.points[1].x = stopPos * pWidth + absOff;
    leftStop.points[0].y = height;
    leftStop.points[1].y = height * 0.5;

    rightStop.points[0].x = (stopPos + bandWidth) * pWidth + absOff;
    rightStop.points[1].x = (stopPos + bandWidth) * pWidth + absOff;
    rightStop.points[0].y = height;
    rightStop.points[1].y = height * 0.5;

    leftStopText.css('top', (leftStop.points[1].y - 20) + 'px');
    leftStopText.css('left', (leftStop.points[1].x - 20) + 'px');

    rightStopText.css('top', (rightStop.points[1].y - 20) + 'px');
    rightStopText.css('left', (rightStop.points[1].x - 20) + 'px');
}

function setFrequencyDigits(left, right) {
    leftStopText.text(left);
    rightStopText.text(right);
}

function getLinePoints(waveAmplitudes) {
    var waves = waveAmplitudes.length;
    var res = [];

    var amp = 1;
    var adjustedPWidth;
    // Complex stuff, transforms 3 into 2 and 6 into 4, which is the correspondence between number of waves and waves occupied (since noise waves are half width)
    var pWidth = width / (Math.floor(waves/2)+1);
    var offX = absOff;

    for (var w = 0; w < waves; w++) {
        if (Math.ceil(waves/2) - (Math.floor(Math.abs(w-((waves-1)/2)))) == 2) { // Distance from either end of the set is 2 (Where the ends of the set are 1)
            adjustedPWidth = pWidth;
        } else {
            adjustedPWidth = pWidth * 0.5; // noise waves are horizontally smaller
        }

        amp = waveAmplitudes[w];

        let p0 = svg.createSVGPoint();
        let p1 = svg.createSVGPoint();
        let p2 = svg.createSVGPoint();
        let p3 = svg.createSVGPoint();

        var r = 1.25 * amp;
        var c = 0.375 * adjustedPWidth;

        p0.x = offX;
        p1.x = p0.x + c;
        offX += adjustedPWidth;
        p3.x = offX;
        p2.x = p3.x - c;

        p0.y = height;
        p3.y = height;
        p1.y = height - r * height;
        p2.y = height - r * height;

        res.push([p0, p1, p2, p3]);
    }

    return res;
}

export { setUpFrequencySpectrum, updateFrequencySpectrum, updateFrequencySpectrumsFrequency, setFrequencyDigits }
