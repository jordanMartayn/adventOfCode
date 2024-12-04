"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logGoldStar = void 0;
exports.cyanLog = cyanLog;
exports.splitStringListByWhiteSpace = splitStringListByWhiteSpace;
exports.sumOfNumberList = sumOfNumberList;
exports.removeWhiteSpace = removeWhiteSpace;
function cyanLog(msg) {
    console.log("\u001B[36m\n".concat(msg, "\u001B[0m"));
}
function splitStringListByWhiteSpace(list) {
    var idArray = list.split(/\s+/);
    return idArray;
}
function sumOfNumberList(numberList) {
    return numberList.reduceRight(function (tot, val) { return tot + val; });
}
function removeWhiteSpace(string) {
    return string.replace(/\s+/, '');
}
var logGoldStar = function (message) {
    var star = '\u2B50'; // Unicode for gold star (⭐)
    var border = "".concat(star.repeat(1), " GOLD STAR LOG ").concat(star.repeat(1));
    var timestamp = new Date().toLocaleString();
    console.log("%c".concat(border, "\n%c").concat(message, "\n%c").concat(border), 'color: gold; font-weight: bold;', 'color: gray; font-style: italic;', 'color: green; font-weight: bold;', 'color: gold; font-weight: bold;');
};
exports.logGoldStar = logGoldStar;
