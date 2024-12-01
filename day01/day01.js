"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://adventofcode.com/2024/day/1
var day01LocationLists_1 = require("./day01LocationLists");
//Methods
function cyanLog(msg) {
    console.log("\u001B[36m".concat(msg, "\u001B[0m"));
}
function splitStringListByWhiteSpace(list) {
    var idArray = day01LocationLists_1.stringIdLists.split(/\s+/);
    return idArray;
}
function splitCombinedListArrayIntoTwo() {
    for (var x = 0; x < idArray.length; x++) {
        if (x % 2) {
            idList02.push(Number(idArray[x]));
        }
        else {
            idList01.push(Number(idArray[x]));
        }
    }
}
function getDifferenceBetweenLocations(list01, list02, vector) {
    if (vector === void 0) { vector = true; }
    //make sure both arrays are the same length
    if (list01.length != list02.length) {
        console.error("DistDiff lists arn't the same length");
        return null;
    }
    //compare each equiv location id finding the non vector difference between and pushing that to new array;
    var idListsDistDiff = [];
    for (var x = 0; x < list01.length; x++) {
        var distance = 0;
        var vectorDist = list01[x] - list02[x];
        //incase negitive convert positive if we want the dist not the direction of diff (non vector)
        if (vectorDist < 0 && vector === false) {
            distance = vectorDist * -1;
        }
        else
            distance = vectorDist;
        idListsDistDiff.push(distance);
    }
    return idListsDistDiff;
}
function sumOfNumberList(numberList) {
    return numberList.reduceRight(function (tot, val) { return tot + val; });
}
function calculateSimilarities(list01, list02) {
    var simalarityScores = [];
    var numberRepeated = 0;
    var numberNotRepeated = 0;
    list01.forEach(function (id) {
        //take that id, and find the first index of a number near that id in list 2 so we dont need to look through more than needed
        //also we need a way to stop looking after that value without looking for too much
        //ie for id 99294 I want to look at +-5000
        var range = 1000; // 1000 passes each
        var startPos = -1;
        var endPos = -1;
        for (var x = (id - range); x < (id + range); x++) {
            var startIndex = list02.indexOf(x);
            if (startIndex > -1) {
                startPos = startIndex;
                break;
            }
        }
        for (var x = (id + range); x > (id - range); x--) {
            var endIndex = list02.lastIndexOf(x);
            if (endIndex > -1) {
                endPos = endIndex;
                break;
            }
        }
        if (startPos < 0 || endPos < 0) {
            console.log("start/end pos not found for", id, startPos, endPos);
        }
        //using the start and end pos look through list 2 for number of matches
        var matchCount = 0;
        list02.slice(startPos, endPos).forEach(function (list2Id) {
            if (list2Id === id) {
                matchCount++;
            }
        });
        //use matchCout to get a score and push to scores
        if (matchCount > 0) {
            numberRepeated++;
        }
        else
            numberNotRepeated++;
        simalarityScores.push(id * matchCount);
    });
    cyanLog("Locations repeated:");
    console.log(numberRepeated);
    cyanLog("Locations that have no duplicates:");
    console.log(numberNotRepeated);
    return simalarityScores;
}
//Execute
cyanLog("Spliting Into Two Lists\n");
var idArray = splitStringListByWhiteSpace(day01LocationLists_1.stringIdLists);
var idList01 = [];
var idList02 = [];
splitCombinedListArrayIntoTwo();
cyanLog("check idList01 last 5");
console.log(idList01.slice(-5), "End\n");
cyanLog("check idList02 last 5");
console.log(idList02.slice(-5), "End\n");
cyanLog("Sorting the lists from smallest to longest\n");
var idList01Sorted = idList01.sort(function (a, b) { return a - b; });
var idList02Sorted = idList02.sort(function (a, b) { return a - b; });
cyanLog("check first 5 & last 5 of sorted idList01");
console.log(idList01Sorted.slice(0, 5));
console.log(idList01Sorted.slice(-5));
cyanLog("check first 5 & last 5 of sorted idList02");
console.log(idList02Sorted.slice(0, 5));
console.log(idList02Sorted.slice(-5));
cyanLog("Non vector diff between the locations:");
var nonVecterLocationDifferences = getDifferenceBetweenLocations(idList01Sorted, idList02Sorted, false);
console.log(nonVecterLocationDifferences === null || nonVecterLocationDifferences === void 0 ? void 0 : nonVecterLocationDifferences.slice(0, 10));
cyanLog("Vector diff between the locations:");
var vecterLocationDifferences = getDifferenceBetweenLocations(idList01Sorted, idList02Sorted);
console.log(vecterLocationDifferences === null || vecterLocationDifferences === void 0 ? void 0 : vecterLocationDifferences.slice(0, 10));
cyanLog("Total diff Vector:");
if (!vecterLocationDifferences) {
    throw new Error("locationDifference: ".concat(vecterLocationDifferences));
}
var totalDiffVector = sumOfNumberList(vecterLocationDifferences);
console.log(totalDiffVector);
cyanLog("Total diff Non Vector:");
if (!nonVecterLocationDifferences) {
    throw new Error("locationDifference: ".concat(nonVecterLocationDifferences));
}
var totalDiffNonVector = sumOfNumberList(nonVecterLocationDifferences);
console.log(totalDiffNonVector);
//I belive the correct answer for the puzzle is non vector difference.
//that was correct: 1889772
//Calculate a simalarity score by:
//take a number from list 1, count how many times it is in list 2.
//multiply that number by the count,
//take the numbers from the comparison and sum them
cyanLog("\nfinding the similarty per id");
var similarityScores = calculateSimilarities(idList01Sorted, idList02Sorted);
var totalSimilariyScore = sumOfNumberList(similarityScores);
cyanLog('Total Similartiy Score:');
console.log(totalSimilariyScore);
