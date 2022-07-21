var mapHighlightingStyles = {
  "regular": {
    "offsetX":4,
    "offsetY":4,
    "stroke": {
      "color":"#3434eb99",
      "width": 2
    },
    "fill": {
      "color":"#3434eb44"
    }
  },
  "selected": {
    "offsetX":4,
    "offsetY":4,
    "stroke": {
      "color":"#eb403477",
      "width": 2
    },
    "fill": {
      "color":"#eb403488"
    }
  },
  "permanent": {
    "offsetX":4,
    "offsetY":4,
    "stroke": {
      "color":"#12121233",
      "width": 2
    },
    "fill": {
      "color":"#1212120e"
    }
  },
  "searchResults": {
    "offsetX":4,
    "offsetY":4,
    "stroke": {
      "color":"#792fe000",
      "width": 2
    },
    "fill": {
      "color":"#792fe077"
    }
  }
}

var setup = false;

var mapIMG;
var normalCanvas;
var selectedCanvas;
var permaCanvas;
var resultsCanvas;

var permaCanvasOn = false;
var permaCanvasAreas;
var selectedCanvasArea;
var resultsCanvasAreas;

var globalOffset = [0, 0];

function SetUpHighlighter(map, _mapIMG, _normalCanvas, _selectedCanvas, _permaCanvas, _resultsCanvas, _permaAreas) {
  mapIMG = _mapIMG;
  scaleImageMap(map);
  normalCanvas = _normalCanvas;
  selectedCanvas = _selectedCanvas;
  permaCanvas = _permaCanvas;
  permaCanvasAreas = _permaAreas;
  resultsCanvas = _resultsCanvas;
  Resized();
  setup = true;
  //window.addEventListener('resize', Resized, false), resized is called from imageMapResizer's for correct order of execution
}

function SelectArea(area) {
  selectedCanvasArea = area;
  ClearCanvas(selectedCanvas);
  DrawArea(selectedCanvas, selectedCanvasArea, mapHighlightingStyles.selected);
}

function SetOffset(newOffset) {
  globalOffset = newOffset;
  Resized();
}

function Resized() {
  if (!setup) { return; }
  ClearCanvas(normalCanvas);
  ClearCanvas(selectedCanvas);
  ClearCanvas(permaCanvas);
  ClearCanvas(resultsCanvas);

  var w = mapIMG.width;
  var h = mapIMG.height;

  normalCanvas.width = w;
  permaCanvas.width = w;
  selectedCanvas.width = w;
  normalCanvas.height = h;
  permaCanvas.height = h;
  selectedCanvas.height = h;
  resultsCanvas.width = w;
  resultsCanvas.height = h;

  if (permaCanvasOn) {
    DrawAllOutlines(permaCanvas, permaCanvasAreas, mapHighlightingStyles.permanent);
  }

  if (selectedCanvasArea != null) {
    DrawArea(selectedCanvas, selectedCanvasArea, mapHighlightingStyles.selected);
  }

  if (resultsCanvasAreas != null) {
    DrawAllOutlines(resultsCanvas, resultsCanvasAreas, mapHighlightingStyles.searchResults);
  }
}

function DrawNormal(area) {
  ClearCanvas(normalCanvas);
  DrawArea(normalCanvas, area, mapHighlightingStyles.regular);
}

function DrawArea(canvas, area, style = mapHighlightingStyles.regular) {
  var off = [style.offsetX, style.offsetY];

  var positions = (area.coords.split(',')).map(x=>+x);
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = style.fill.color
  ctx.lineWidth = style.stroke.width;
  ctx.beginPath();
  ctx.moveTo(positions[0] + off[0], positions[1] + off[1]);
  for (var i = 2; i < positions.length; i+=2) {
    ctx.lineTo(positions[i] + off[0], positions[i+1] + off[1]);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function ClearCanvas(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function ToggleAll(state) {
  permaCanvasOn = state;
  if (permaCanvasOn) {
    DrawAllOutlines(permaCanvas, permaCanvasAreas);
  } else {
    ClearCanvas(permaCanvas);
  }
}

function DrawAllOutlines(canvas, areas, style = mapHighlightingStyles.permanent) {
  areas.forEach(function(area) { DrawArea(canvas, area, style); });
}

function DrawSearch(areas) {
  ClearCanvas(resultsCanvas);
  resultsCanvasAreas = areas;
  DrawAllOutlines(resultsCanvas, resultsCanvasAreas, mapHighlightingStyles.searchResults);
}

function scaleImageMap(map) {
    function resizeMap() {
      function resizeAreaTag(cachedAreaCoords, idx) {
        function scale(coord) {
          var dimension = 1 === (isWidth = 1 - isWidth) ? 'width' : 'height'
          var offset = (dimension === 'width') ? globalOffset[0] : globalOffset[1];
          return (
            padding[dimension] +
            Math.floor((offset + Number(coord)) * scalingFactor[dimension])
          )
        }

        var isWidth = 0
        areas[idx].coords = cachedAreaCoords
          .split(',')
          .map(scale)
          .join(',')
      }

      var scalingFactor = {
        width: image.width / image.naturalWidth,
        height: image.height / image.naturalHeight,
      }

      var padding = {
        width: parseInt(
          window.getComputedStyle(image, null).getPropertyValue('padding-left'),
          10
        ),
        height: parseInt(
          window.getComputedStyle(image, null).getPropertyValue('padding-top'),
          10
        ),
      }

      cachedAreaCoordsArray.forEach(resizeAreaTag)
      Resized(); // Callback for maphighlighting redrawing
    }

    function getCoords(e) {
      //Normalize coord-string to csv format without any space chars
      return e.coords.replace(/ *, */g, ',').replace(/ +/g, ',')
    }

    function debounce() {
      clearTimeout(timer)
      timer = setTimeout(resizeMap, 250)
    }

    function start() {
      if (
        image.width !== image.naturalWidth ||
        image.height !== image.naturalHeight
      ) {
        resizeMap()
      }
    }

    function addEventListeners() {
      image.addEventListener('load', resizeMap, false) //Detect late image loads in IE11
      window.addEventListener('focus', resizeMap, false) //Cope with window being resized whilst on another tab
      window.addEventListener('resize', debounce, false)
      window.addEventListener('readystatechange', resizeMap, false)
      document.addEventListener('fullscreenchange', resizeMap, false)
    }

    function beenHere() {
      return 'function' === typeof map._resize
    }

    function getImg(name) {
      return document.querySelector('img[usemap="' + name + '"]')
    }

    function setup() {
      areas = map.getElementsByTagName('area')
      cachedAreaCoordsArray = Array.prototype.map.call(areas, getCoords)
      image = getImg('#' + map.name) || getImg(map.name)
      map._resize = resizeMap //Bind resize method to HTML map element
    }

    var /*jshint validthis:true */
      areas = null,
      cachedAreaCoordsArray = null,
      image = null,
      timer = null

    if (!beenHere()) {
      setup()
      addEventListeners()
      start()
    } else {
      map._resize() //Already setup, so just resize map
    }
  }

export { SetUpHighlighter, DrawNormal, ToggleAll, SelectArea, DrawSearch, SetOffset }