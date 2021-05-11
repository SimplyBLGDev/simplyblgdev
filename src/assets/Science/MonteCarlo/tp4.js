import { init, simulate, setFromTo, setDays } from "./monteCarlo.js";

var last10Demands = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalLast10Demands = 0;

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

function ejercicioA() {
    demandTable = [
        { value: 0,	maxProb: 0.05 },
        { value: 10,	maxProb: 0.17 },
        { value: 20,	maxProb: 0.35 },
        { value: 30,	maxProb: 0.6 },
        { value: 40,	maxProb: 0.82 },
        { value: 50,	maxProb: 1 }];
    delayTable = [
        { value: 1, maxProb: 0.15 },
        { value: 2, maxProb: 0.35 },
        { value: 3, maxProb: 0.75 },
        { value: 4, maxProb: 1 }];

    storageCost = 30;
    stockoutCost = 40;

    // eslint-disable-next-line
    restockCondition = function(period, stock, nextArrival) {
        return (period - 1) % 7 == 0;
    }
    restockCost = function() { return 280; }
    restockAmount = function() { return 180; }

    stock0 = 20;

    randomFunction = function() { return Math.random(); }

    init(demandTable, delayTable, storageCost, stockoutCost, restockCondition, restockCost, restockAmount, onPeriodSimulated, onPeriodPreRestock, stock0, daysToSimulate, randomFunction);
}

function ejercicioB() {
    last10Demands = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    totalLast10Demands = 0;
    onPeriodPreRestock = onPeriodB

    demandTable = [
        { value: 0,	maxProb: 0.05 },
        { value: 10,	maxProb: 0.17 },
        { value: 20,	maxProb: 0.35 },
        { value: 30,	maxProb: 0.6 },
        { value: 40,	maxProb: 0.82 },
        { value: 50,	maxProb: 1 }];
    delayTable = [
        { value: 1, maxProb: 0.15 },
        { value: 2, maxProb: 0.35 },
        { value: 3, maxProb: 0.75 },
        { value: 4, maxProb: 1 }];

    storageCost = 30;
    stockoutCost = 40;

    // eslint-disable-next-line
    restockCondition = function(period, stock, nextArrival) {
        return (period - 1) % 10 == 0;
    }

    restockCost = restockCostB;
    restockAmount = restockAmountB;

    stock0 = 20;

    randomFunction = function() { return Math.random(); }

    init(demandTable, delayTable, storageCost, stockoutCost, restockCondition, restockCost, restockAmount, onPeriodSimulated, onPeriodPreRestock, stock0, daysToSimulate, randomFunction);
}

// eslint-disable-next-line
function onPeriodB(period, nextArrival, nextArrivalAmount, demand, arrival, stock) {
    last10Demands[period % 10] = demand;
}

function restockAmountB() {
    totalLast10Demands = 0;
    for (var i = 0; i < 10; i++) {
        totalLast10Demands += last10Demands[i];
    }

    return totalLast10Demands;
}

function restockCostB() {
    var table = [
        { value: 200, maxProb: 100 },
        { value: 280, maxProb: 200 },
        { value: 300, maxProb: 9999999 }];

    for (var i = 0; i < table.length; i++) {
        if (totalLast10Demands <= table[i].maxProb)
            return table[i].value;
    }
}

function _setFromTo(from, to) {
    setFromTo(from, to);
}

function _setDays(days) {
    setDays(days);
}

function _simulate() {
    return simulate();
}

export { ejercicioA, ejercicioB, _simulate, _setFromTo, _setDays }
