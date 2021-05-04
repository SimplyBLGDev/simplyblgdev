var x0 = 0;
var a = 0;
var c = 0;
var m = 0;
var g = 0;
var k = 0;
var n = 20;
var intervals = 20;
var randomFunction = randomJS;

function getResults(values) {
    var intervalLength = 1.0/intervals;
    var results = [];
    var fe = n / intervals;
    var cAcc = 0;

    for (var i = 0; i < intervals; i++) {
      var from = intervalLength*i;
      var to = intervalLength*(i+1);
      var f0 = 0;

      for (var j = 0; j < values.length; j++) {
        if (values[j] >= from && values[j] < to) {
          f0++;
        }
      }

      var c = Math.pow(f0-fe, 2)/fe;
      cAcc += c;

      results.push({
        "from": from,
        "to": to,
        "f0": f0,
        "fe": fe,
        "c": c,
        "cAcc": cAcc
      });
    }

    return results;
}

function generateValues() {
    return randomFunction();
}

function randomJS() {
    var randNumbers = [];

    for (var i = 0; i < n; i++) {
        randNumbers.push(Math.random());
    }

    return randNumbers;
}

function randomLineal() {
    if (a == 0) { a = 1 + 4*k; }
    if (m == 0) { m = Math.pow(2, g); }

    var tableValues = [];
    var lastXi = x0;

    for (var i = 1; i <= n; i++) {
        var r = (lastXi / (m - 1));
        lastXi = (lastXi * a + c) % m;

        tableValues.push(r);
    }

    return tableValues;
}

// Constant values for ji square
function getPDF(intervals) {
    return {
        5: 9.49,
        10: 16.9,
        15: 23.7,
        20: 30.1
    }[intervals];
}

function generate(_method, _x0, _a, _c, _m, _g, _k, _n, _intervals) {
    switch (_method) {
        case "lineal": randomFunction = randomLineal; break;
        default: randomFunction = randomJS; break;
    }

    x0 = _x0;
    a = _a;
    c = _c;
    n = _n;
    m = _m;
    g = _g;
    k = _k;
    intervals = _intervals;

    var sourceValues = generateValues();
    var results = getResults(sourceValues);
    var accumulatedC = results[results.length - 1].cAcc;
    var jiSquare = getPDF(intervals);

    var ret = {
        "results": results,
        "accumulatedC": accumulatedC,
        "jiSquare": jiSquare,
        "accepted": accumulatedC <= jiSquare,
        "sourceValues": sourceValues
    };

    return ret;
}

export { generate }
