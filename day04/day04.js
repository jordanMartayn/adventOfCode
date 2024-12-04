"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Day 4: Ceres Search (word search)
var utils_1 = require("../utils/utils");
var puzzleInput_1 = require("./puzzleInput");
var Coord = /** @class */ (function () {
    function Coord(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coord;
}());
var Window = /** @class */ (function () {
    function Window(originChar, box) {
        this.originChar = originChar;
        this.box = box;
    }
    return Window;
}());
//methods
var parseStringTo2dArray = function (string, splitChar) {
    console.log(string.slice(0, 30));
    var oneD = string.split(splitChar);
    var twoD = oneD.map(function (line) {
        return line.split("");
    });
    return twoD;
};
var makeSearchWindow = function (twoD, coord, searchTerm) {
    var _a;
    /*
            0   0   0   0   0
            0   0   0   0   0
            0   0   X   0   0
            0   0   0   0   0
            0   0   0   0   0
        To make a window here in the example using a radius of 3 (char lenth of three)
        we need to look at each coord of x +- (length -1) & y +- (length -1) all the iterations of
        
    */
    var radius = searchTerm.length - 1;
    var box = [];
    console.log(twoD[0]);
    for (var y = coord.y - radius; y <= coord.y + radius; y++) {
        var line = [];
        for (var x = coord.x - radius; x <= coord.x + radius; x++) {
            var char = ((_a = twoD[y]) === null || _a === void 0 ? void 0 : _a[x]) ? twoD[y][x] : "!";
            line.push(char);
        }
        box.push(line);
    }
    var window = new Window(twoD[coord.y][coord.x], box);
    return window;
};
var searchTheWindow = function (window, term) {
    if (window.originChar !== term.slice(0, 1) && window.originChar !== term.slice(-1)) {
        //dont need to proceed as were only looking to search if the origin char is at the start or end of the term.
        console.log(window.originChar, " is not valid search Char for: ", term);
        return;
    }
    console.log("valid search char: ", window.originChar);
};
var logTwoD = function (twoD) {
    console.log(twoD.map(function (row) { return row.join(' '); }).join('\n'));
};
//exe
(0, utils_1.cyanLog)("Day 4: Ceres Search");
(0, utils_1.cyanLog)("Converting String to 2D Array in lowercase easier for me to read");
var wordSearchLc = puzzleInput_1.wordSearch.toLowerCase();
var egMiniSearchLc = puzzleInput_1.egMiniSearch.toLowerCase();
var wordSearch2D = parseStringTo2dArray(wordSearchLc, "\n");
var egMiniSearch2D = parseStringTo2dArray(egMiniSearchLc, "\n");
//const egAlphabet2D = parseStringTo2dArray(egAlphabet, "\n")
console.log("Created a 2D array 140 x 140 ");
(0, utils_1.cyanLog)("Creating a search window:");
var egCoord = new Coord(0, 0);
var egWindow = makeSearchWindow(egMiniSearch2D, egCoord, "xmas");
//const egAlphaWindow = makeSearchWindow( egAlphabet2D, egCoord, "xmas");
logTwoD(egWindow.box);
console.log("\n");
//logTwoD(egAlphaWindow.box);
searchTheWindow(egWindow, "xmas");
