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
var getIndexsByString = function (corruptData, searchString) {
    var indexes = [];
    var searchIndex = 0;
    var searchStop = false;
    var whileLimit = 0;
    while (!searchStop && whileLimit < 1000) {
        whileLimit++;
        var i = corruptData.indexOf(searchString, searchIndex);
        if (i === -1) {
            searchStop = true;
            break;
        }
        indexes.push(i);
        searchIndex = i + 1;
    }
    return indexes;
};
var addTagToIndexes = function (indexes, tagTruth) {
    return indexes.map(function (i) {
        return {
            index: i,
            isDo: tagTruth,
        };
    });
};
var mergeAndSortTagged = function (taggedList1, taggedList2) {
    var mergedList = taggedList1.concat(taggedList2);
    return mergedList.sort(function (a, b) {
        return (a['index'] - b['index']);
    });
};
var removeNonChangingDoDonts = function (mergedAndSortedIndex) {
    var currentDoStatus = true;
    return mergedAndSortedIndex.filter(function (taggedIndex) {
        if (taggedIndex['isDo'] === currentDoStatus) {
            return false;
        }
        currentDoStatus = taggedIndex['isDo'];
        return true;
    });
};
var validCorruptedConditionalData = function (corruptData, indexs) {
    //adding in the start as true
    indexs.unshift({ index: 0, isDo: true });
    //and end as false
    indexs.push({ index: corruptData.length, isDo: false });
    var validDataChunks = [];
    for (var x = 1; x <= indexs.length; x++) {
        if (indexs[x - 1]['isDo']) {
            var validData = corruptData.slice(indexs[x - 1]['index'], indexs[x]['index']);
            if (validData === "")
                continue;
            validDataChunks.push(validData);
        }
    }
    return validDataChunks;
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
(0, utils_1.cyanLog)("Sum of all mul operations\n\n");
var sumOfAllMuls = (0, utils_1.sumOfNumberList)(mulResults);
console.log(sumOfAllMuls);
(0, utils_1.cyanLog)("YAY 1st Star");
(0, utils_1.cyanLog)("Part 2 - do() & don't()\n");
(0, utils_1.cyanLog)("Finding the indexs of do()\n");
var doIndexes = getIndexsByString(corruptData, "do()");
console.log(doIndexes);
(0, utils_1.cyanLog)("Finding the indexs of don't()\n");
var dontIndexes = getIndexsByString(corruptData, "don't()");
console.log(dontIndexes);
(0, utils_1.cyanLog)("Adding do/dont tag to indexs\n");
var doIndexesWTag = addTagToIndexes(doIndexes, true);
var dontIndexesWTag = addTagToIndexes(dontIndexes, false);
console.log(doIndexesWTag.slice(0, 5), "etc", dontIndexesWTag.slice(0, 5), "etc");
(0, utils_1.cyanLog)("Merging do list & dont list, then sorting by index");
var mergedAndSortedIndex = mergeAndSortTagged(doIndexesWTag, dontIndexesWTag);
console.log(mergedAndSortedIndex);
(0, utils_1.cyanLog)("Removing following Indexs that dont flip, ie false(keep),true(keep),true(remove), etc");
var filteredIndexs = removeNonChangingDoDonts(mergedAndSortedIndex);
console.log(filteredIndexs);
(0, utils_1.cyanLog)("Using The Indexes Get Sections of valid corrupted data, third valid chunk:");
var validDataChunks = validCorruptedConditionalData(corruptData, filteredIndexs);
(0, utils_1.cyanLog)("Running the chunks through the mul pipeline; retrieve uncorrupted data, attmept mul opperations, sum of muls, sum of all combined");
var sumOfEachChunk = [];
validDataChunks.forEach(function (chunk) {
    var retrievedData = retrieveUncorruptedData(chunk);
    var mulledData = attemptMulOperations(retrievedData);
    var sumOf = (0, utils_1.sumOfNumberList)(mulledData);
    sumOfEachChunk.push(sumOf);
});
var sumOfAllChunkData = (0, utils_1.sumOfNumberList)(sumOfEachChunk);
console.log(sumOfAllChunkData);
(0, utils_1.logGoldStar)("YAY");
