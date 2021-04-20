var svg;
var width = 0;
var height = 0;
var floor = 20; // In pixels
var hPadding = 20; // In pixels
var barBorderRadius = "8px";

function setUp(_svg, _width, _height) {
    svg = _svg;
    width = _width - hPadding*2;
    height = _height - floor;
}

function createSquare(x, y, w, h, _class) {
    var newRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    newRect.setAttribute('x', x);
    newRect.setAttribute('y', y);
    newRect.setAttribute('width', w);
    newRect.setAttribute('height', h);
    newRect.setAttribute('rx', barBorderRadius);
    newRect.setAttribute('ry', barBorderRadius);
    newRect.classList.add(_class);

    return newRect;
}

function createText(x, y, text, _class) {
    var newT = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    newT.setAttribute('x', x);
    newT.setAttribute('y', y);
    newT.innerHTML = text;
    newT.classList.add(_class);

    return newT;
}

function clearPreviousChildren() {
    for (var i = 0; i < svg.childNodes.length; i++) {
        if (svg.childNodes[i].nodeName == "rect" || svg.childNodes[i].nodeName == "text") {
            svg.removeChild(svg.childNodes[i]);
            i--;
        }
    }
}

/* {
   values: [
       {
           from: ,
           to: ,
           f0: ,
           fe:
       }
   ] 
} */
function graph(values) {
    clearPreviousChildren();

    var maxFrequency = 0;
    for (var j = 0; j < values.length; j++) {
        if (values[j].f0 > maxFrequency)
            maxFrequency = values[j].f0;
        if (values[j].fe > maxFrequency)
            maxFrequency = values[j].fe;
    }

    for (var i = 0; i < values.length; i++) {
        var x = width * (i / values.length) + hPadding;
        var y = height * (1.0 - (values[i].f0 / maxFrequency));
        var w = Math.floor(width / values.length) - 1;
        var h = height - y;
        var c0 = createSquare(Math.round(x), Math.round(y), Math.round(w), Math.round(h), 'f0-bar');

        // Fe bar
        y = height * (1.0 - (values[i].fe / maxFrequency));
        h = height - y;
        var ce = createSquare(Math.round(x), Math.round(y), Math.round(w), Math.round(h), 'fe-bar');

        x = width * ((i + 1) / values.length) - 14; // -14 px in an attempt to align it, hardcoded because can't calculate thw width or center the element
        y = height + floor; // Below regular floor and into real height of the SVG
        var text = createText(x, y, values[i].to, 'intervalText');

        svg.appendChild(c0);
        svg.appendChild(ce);
        svg.appendChild(text);
    }
}

export { setUp, graph }
