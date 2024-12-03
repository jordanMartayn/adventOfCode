"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cyanLog = cyanLog;
exports.splitStringListByWhiteSpace = splitStringListByWhiteSpace;
exports.sumOfNumberList = sumOfNumberList;
exports.removeWhiteSpace = removeWhiteSpace;
function cyanLog(msg) {
    console.log("\u001B[36m".concat(msg, "\u001B[0m"));
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
