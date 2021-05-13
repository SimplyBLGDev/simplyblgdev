/*
Tables:
value   maxProb
[Sorted from lowest to highest maxProb]
*/
var saveRowFrom = 0;
var saveRowTo = 0;

var demandTable;
var delayTable;

var storageCost;
var stockoutCost;

var restockCondition;
var restockCost;
var restockAmount;
var onPeriodSimulated = function() {};
var onPeriodPreRestock = function() {};

var stock0;

var daysToSimulate;

var randomFunction;

function init(_demandTable, _delayTable, _storageCost, _stockoutCost, _restockCondition, _restockCost, _restockAmount, _onPeriodSimulated, _onPeriodPreRestock, _stock0, _daysToSimulate, _randomFunction) {
    demandTable = _demandTable;
    delayTable = _delayTable;
    storageCost = _storageCost;
    stockoutCost = _stockoutCost;
    restockCondition = _restockCondition;
    restockCost = _restockCost;
    restockAmount = _restockAmount;
    onPeriodSimulated = _onPeriodSimulated;
    onPeriodPreRestock = _onPeriodPreRestock;
    stock0 = _stock0;
    daysToSimulate = _daysToSimulate;
    randomFunction = _randomFunction;
}

function getValueFromTable(table, rand) {
    for (var i = 0; i < table.length; i++) {
        if (rand <= table[i].maxProb)
            return table[i].value;
    }

    return -1;
}

function simulatePeriod(previousPeriodRow, stats) {
    var period = previousPeriodRow.period + 1;
    var nextArrival = previousPeriodRow.nextArrival - 1;

    var rndDemand = randomFunction();
    var rndDelay = randomFunction();

    var demand = getValueFromTable(demandTable, rndDemand);
    var arrival = previousPeriodRow.nextArrival == 1 ? previousPeriodRow.nextArrivalAmount : 0;

    var stock = previousPeriodRow.stock + arrival - demand;

    var _stockoutCost = -Math.min(stockoutCost * stock, 0);

    stock = Math.max(stock, 0);
    var _storageCost = storageCost * stock;
    var orderCost = 0;
    var nextArrivalAmount = previousPeriodRow.nextArrivalAmount;
    onPeriodPreRestock(period, nextArrival, nextArrivalAmount, demand, arrival, stock);

    if (restockCondition(period, stock, nextArrival)) {
        nextArrival = getValueFromTable(delayTable, rndDelay);
        nextArrivalAmount = restockAmount();
        orderCost = restockCost();
    }
    var periodCost = _storageCost + _stockoutCost + orderCost;

    var newRow = {
        "period":               period,
        "rndDemand":            rndDemand,
        "rndDelay":             rndDelay,
        "stock":                stock,
        "demand":               demand,
        "nextArrival":          nextArrival,
        "arrival":              arrival,
        "stockoutCost":         _stockoutCost,
        "orderCost":            orderCost,
        "storageCost":          _storageCost,
        "periodCost":           periodCost,
        "nextArrivalAmount":    nextArrivalAmount
    };

    stats.totalCost += periodCost;
    stats.totalDemand += demand;

    onPeriodSimulated(newRow, stats);

    return newRow;
}

// eslint-disable-next-line
function simulate() {
    var _calcRows = [{}, {}]
    _calcRows[0] = {
        "period":               0,
        "rndDemand":            0,
        "rndDelay":             0,
        "stock":                stock0,
        "demand":               0,
        "nextArrival":          0,
        "arrival":              0,
        "stockoutCost":         0,
        "orderCost":            0,
        "storageCost":          0,
        "periodCost":           0,
        "nextArrivalAmount":    0
    };
    var stats = {
        "totalCost": 0,
        "totalDemand": 0,
        "average": 0
    };
    var savedRows = [];

    for (var period = 1; period <= daysToSimulate; period++) {
        _calcRows[period % 2] = simulatePeriod(_calcRows[(period - 1) % 2], stats);
        if (period <= saveRowTo && period >= saveRowFrom) {
            savedRows.push(_calcRows[period % 2]);
        }
    }

    stats.average = stats.totalCost / daysToSimulate;

    return { "stats": stats, "savedRows": savedRows };
}

function setFromTo(from, to) {
    saveRowFrom = from;
    saveRowTo = to;
}

function setDays(days) {
    daysToSimulate = days;
}

export { init, simulate, setFromTo, setDays }
