var svg;
var width = 0;
var height = 0;
var intervals = 5;

function setUp(_svg, _width, _height) {
    svg = _svg;
    width = width;
    height = height;
}

function createSquare(x, y, w, h) {
    var newRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    newRect.setAttributeNS("x", x);
    newRect.setAttributeNS("y", y);
    newRect.setAttributeNS("width", w);
    newRect.setAttributeNS("height", h);

    return newRect;
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
    for (var i = 0; i < values.length; i++) {

    }
}

export { setUp, graph }
