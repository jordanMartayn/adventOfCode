"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
//https://adventofcode.com/2024/day/2
var utils_1 = require("../utils/utils");
var puzzleInput_1 = require("./puzzleInput");
//methods
var LookThroughReports = function (reports) {
    var numSafe = 0;
    var numUnSafe = 0;
    for (var x = 0; x < reports.length; x++) {
        var result = determineReportSafty(reports[x]);
        result ? numSafe++ : numUnSafe++;
        //console.log(x,result)
    }
    (0, utils_1.cyanLog)('Number of reports safe:');
    console.log(numSafe);
    (0, utils_1.cyanLog)('Number of reports Unsafe:');
    console.log(numUnSafe);
    (0, utils_1.cyanLog)('Total:');
    console.log(numSafe + numUnSafe);
};
var testExample = function () {
    var arr01 = [7, 6, 4, 2, 1]; //safe - true
    var arr02 = [1, 2, 7, 8, 9]; //Unsafe -false
    var arr03 = [9, 7, 6, 2, 1]; //Unsafe -false
    var arr04 = [1, 3, 2, 4, 5]; //Unsafe -false
    var arr05 = [8, 6, 4, 4, 1]; //Unsafe -false
    var arr06 = [1, 3, 6, 7, 9]; //safe - true
    var res01 = determineReportSafty(arr01);
    console.log('res01:', res01);
    var res02 = determineReportSafty(arr02);
    console.log('res02:', res02);
    var res03 = determineReportSafty(arr03);
    console.log('res03:', res03);
    var res04 = determineReportSafty(arr04);
    console.log('res04:', res04);
    var res05 = determineReportSafty(arr05);
    console.log('res05:', res05);
    var res06 = determineReportSafty(arr06);
    console.log('res06:', res06);
    /*
    const arr07: number[] = [1, 2, 5, 3, 2]
    const arr08: number[] = [13, 10, 15, 8, 7 ]
    
    const res07 = determineReportSafty(arr07);
    console.log('\nres07:',res07)
    const res08 = determineReportSafty(arr08);
    console.log('res08:',res08)
    */
};
var determineReportSafty = function (report) {
    var problemDampenerAvail = true;
    var handler = function (report) {
        var safe = true;
        var step = 0;
        //console.log(`det rep1:${report[1]}, rep0:${report[0]}`)
        //first determine the first step is decreasing or increasing.
        // console.log(report[1],report[0]);
        //console.log(report)
        if (report[1] === report[0]) {
            //console.log('fail on step 1')
            console.log("step 0 fail");
            if (problemDampenerAvail) {
                problemDampenerAvail = false;
                console.log("\n\n", report);
                console.log(report.slice(1));
                var problemDampenerResult = handler(report.slice(1));
                if (problemDampenerResult) {
                    console.log("probDamp step 0 save");
                    safe = true;
                }
            }
            else {
                return false;
            }
        }
        step++;
        var increasing = (report[1] - report[0]) > 0 ? true : false;
        //console.log('det, increasing',increasing, 'report:',report)
        for (var x = 1; x < report.length; x++) {
            //console.log("compairing ",report[x-1],report[x])
            if (report[x] < 0)
                console.log("ERROR");
            //no change
            if (report[x] === report[x - 1]) {
                //console.log(`det, no change fail ${report[x]}, ${report[x-1]}`)
                safe = false;
                break;
            }
            if (increasing) { //1,2,3,2
                //console.log(`increasing, val:${report[x]}, lastVal:${report[x-1]}, larger than 3:${( report[x] - report[x-1])}, outcome:${( report[x] - report[x-1] > 3 || report[x] - report[x-1] < 0)}`)
                if (report[x] - report[x - 1] > 3 || report[x] - report[x - 1] < 0) {
                    //console.log(`increase fail:`,x)
                    safe = false;
                    break;
                }
            }
            else { //decreasing 9,4,2,3
                //console.log(`increasing, val:${report[x]}, lastVal:${report[x-1]}, cur-last:${( report[x] - report[x-1])}, outcome:${( report[x] - report[x-1] < -3 || report[x] - report[x-1] > 0)}`)
                if (report[x] - report[x - 1] < -3 || report[x] - report[x - 1] > 0) {
                    //console.log(`increase fail`,x)
                    safe = false;
                    break;
                }
            }
            step++;
        }
        //if(safe === 'unset') console.log("pass, increasing:",increasing);
        //cyanLog("\n----------")
        if (!safe && problemDampenerAvail) {
            problemDampenerAvail = false;
            //console.log('\nsafe is false, max step:',step);
            var index = step;
            var problemDampenedReport = __spreadArray(__spreadArray([], report.slice(0, index), true), report.slice(index + 1), true);
            var problemDampenerResult = handler(problemDampenedReport);
            //console.log("probDampRes",problemDampenedReport)
            if (problemDampenerResult) {
                console.log("probDamp End Save");
                safe = true;
            }
        }
        return safe;
    };
    return handler(report);
};
var reportsStringToNumbers = function (reports) {
    var reportsNumbers = [];
    reports.forEach(function (report) {
        var splitStringReport = (0, utils_1.splitStringListByWhiteSpace)(report);
        var reportNumber = [];
        splitStringReport.forEach(function (stringNumber) {
            reportNumber.push(Number(stringNumber));
        });
        reportsNumbers.push(reportNumber);
    });
    return reportsNumbers;
};
function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}
//execute
(0, utils_1.cyanLog)('Day 02: Red-Nosed Reports\n');
var reports = puzzleInput_1.reportsInput.split(/\n/g);
(0, utils_1.cyanLog)('Last 3 reports:');
console.log(reports.slice(-3));
(0, utils_1.cyanLog)('convert to numeric arrays for iteration, last 3:');
var reportsIterable = reportsStringToNumbers(reports);
console.log(reportsIterable.slice(-3));
(0, utils_1.cyanLog)('\nLooking through the reports to find how many are safe.');
LookThroughReports(reportsIterable);
//testExample();
/*
for( let x=0;x<5;x++){
    const res = determineReportSafty(reportsIterable[getRandomNumber()])
    cyanLog("result:");
    console.log(res);
}
*/
//WTF 479 was right!!!!!, i think there must have been blank space when submited it, FML!!
