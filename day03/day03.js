"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Day 3: Mull It Over  (string parsing)
var fs = require("fs");
var utils_1 = require("../utils/utils");
//methods
var readPuzzleInput = function () {
    try {
        var data = fs.readFileSync('./day03/puzzleInput.txt', 'utf8');
        return data;
    }
    catch (err) {
        console.error(err);
        return "Error";
    }
};
var retrieveUncorruptedData = function (corruptData) {
    //my thinking is look through and find where 'mul(' exists and then go to the max pos string length,
    //witch would be mul( 999,999) +8 make sure no white space.
    //after learning about match with regex went with that.
    var possibleData = corruptData.match(/mul\(\d{1,3}\,\d{1,3}\)/g) || ["you", "failed", "lol"];
    return possibleData;
};
var attemptMulOperations = function (muls) {
    //loop through the string of muls, taking steps to do the mul operation
    var result = [];
    muls.forEach(function (mul) {
        var justNumCommaString = mul.slice(4, -1);
        var numbersString = justNumCommaString.split(/\,/) || ["222", "222"];
        var numbers = numbersString.map(function (value) { return Number(value); }) || [222, 222];
        var mathResult = numbers[0] * numbers[1];
        if (mathResult === 222 * 222)
            console.log("Possible Error in Attempt MulOperations");
        result.push(mathResult);
    });
    return result;
};
//exe
(0, utils_1.cyanLog)("\n\nDay 3: Mull It Over\n\n");
(0, utils_1.cyanLog)("Reading Corrupt data from file, and removing whitespace.\n");
var corruptData = readPuzzleInput();
corruptData = (0, utils_1.removeWhiteSpace)(corruptData);
(0, utils_1.cyanLog)("Getting a list of possible data, via regex:\n");
var possibleData = retrieveUncorruptedData(corruptData);
console.log(possibleData.slice(0, 5));
(0, utils_1.cyanLog)("Attempting to perform the mul operations:\n");
var mulResults = attemptMulOperations(possibleData);
console.log(mulResults.slice(0, 5));
(0, utils_1.cyanLog)("Sum of all mul operations\n");
var sumOfAllMuls = (0, utils_1.sumOfNumberList)(mulResults);
console.log(sumOfAllMuls);
