var width;
var height;
var horizontalAxis;
var verticalAxis;
var lineWidth=3;
var lineColor="#51a832";
// eslint-disable-next-line
var pointColor="#32a852";
// eslint-disable-next-line
var pointsSize=5;
// eslint-disable-next-line
var points;
var svg;

function constSetUp(w, h, hAxis, vAxis, svgSrc) {
    svg = svgSrc;
    width = w;
    height = h;
    horizontalAxis = hAxis;
    verticalAxis = vAxis;
    
    drawAxes();
}

function drawAxes() {
    horizontalAxis.style.stroke = lineColor;
    horizontalAxis.style["stroke-width"]=lineWidth + "px";
    horizontalAxis.points[0].x = 0;
    horizontalAxis.points[0].y = height/2;
    horizontalAxis.points[1].x = width;
    horizontalAxis.points[1].y = height/2;
    
    verticalAxis.style.stroke = lineColor;
    verticalAxis.style["stroke-width"]=lineWidth + "px";
    verticalAxis.points[0].x = width/2;
    verticalAxis.points[0].y = 0;
    verticalAxis.points[1].x = width/2;
    verticalAxis.points[1].y = height;
}
// eslint-disable-next-line
function constDrawPoints(bits) {
    // eslint-disable-next-line
    var phase;
    // eslint-disable-next-line
    var amp;
    
    console.log(svg);
    for (var i = 0; i < svg.childNodes.length; i++) {
        if (svg.childNodes[i].nodeName == "circle") {
            svg.removeChild(svg.childNodes[i]);
            i--;
        }
    }

    for (var bit = 0; bit < Math.pow(2, bits); bit++) {
        phase = 0.5;
        amp = 0.5;
        if (bit % 2 == 1)
            phase *= -1;
        
        if ((bit >> 1) % 2 == 1)
            amp *= -1;

        if ((bit >> 2) % 2 == 1)
            amp *= 0.5;

        var newCircle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        newCircle.setAttributeNS(null, 'cx', (amp+1) * (width / 2));
        newCircle.setAttributeNS(null, 'cy', (phase+1) * (height / 2));
        newCircle.setAttributeNS(null, 'r', pointsSize);
        svg.appendChild(newCircle);
    }
}

export { constSetUp, constDrawPoints }
