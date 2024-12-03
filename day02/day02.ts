//https://adventofcode.com/2024/day/2
import {cyanLog, splitStringListByWhiteSpace} from '../utils/utils'
import {reportsInput} from './puzzleInput'

//methods
const LookThroughReports = (reports: number[][]) => {
    let numSafe: number = 0;
    let numUnSafe: number = 0;

    for (let x = 0; x < reports.length; x++){
        const result = determineReportSafty(reports[x]);
        result ? numSafe++ : numUnSafe++
        console.log(x,result)
    }

    cyanLog('Number of reports safe:');
    console.log(numSafe);
    cyanLog('Number of reports Unsafe:');
    console.log(numUnSafe);
    cyanLog('Total:')
    console.log(numSafe+numUnSafe)
}

const testExample = () => {
    
    const arr01: number[] = [7, 6, 4, 2, 1]; //safe - true
    const arr02: number[] = [1, 2, 7, 8, 9] //Unsafe -false
    const arr03: number[] = [9, 7, 6, 2, 1] //Unsafe -false
    const arr04: number[] = [1, 3, 2, 4, 5] //Unsafe -false
    const arr05: number[] = [8, 6, 4, 4, 1] //Unsafe -false
    const arr06: number[] = [1, 3, 6, 7, 9] //safe - true
    
    const res01 = determineReportSafty(arr01);
    console.log('res01:',res01)
    const res02 = determineReportSafty(arr02);
    console.log('res02:',res02)
    const res03 = determineReportSafty(arr03);
    console.log('res03:',res03)
    const res04 = determineReportSafty(arr04);
    console.log('res04:',res04)
    const res05 = determineReportSafty(arr05);
    console.log('res05:',res05)
    const res06 = determineReportSafty(arr06);
    console.log('res06:',res06)

    /*
    const arr07: number[] = [1, 2, 5, 3, 2] 
    const arr08: number[] = [13, 10, 15, 8, 7 ] 
    
    const res07 = determineReportSafty(arr07);
    console.log('\nres07:',res07)
    const res08 = determineReportSafty(arr08);
    console.log('res08:',res08)
    */
}

const determineReportSafty = (report: number[]) => {
    //console.log(`det rep1:${report[1]}, rep0:${report[0]}`)
    //first determine the first step is decreasing or increasing.
   // console.log(report[1],report[0]);
    //console.log(report)
    if( report[1] === report[0] ) {
        //console.log('fail on step 1')
        return false;
    }
    const increasing: boolean = (report[1] - report[0]) > 0 ? true : false
    //console.log('det, increasing',increasing, 'report:',report)

    let safe: boolean = true;
    for (let x = 1; x<report.length; x++){
        //console.log("compairing ",report[x-1],report[x])
        if(report[x] < 0) console.log("ERROR")
        //no change
        if (report[x] === report[x-1]){
            //console.log(`det, no change fail ${report[x]}, ${report[x-1]}`)
            safe = false;
            break;
        }
        if (increasing) {//1,2,3,2
            //console.log(`increasing, val:${report[x]}, lastVal:${report[x-1]}, larger than 3:${( report[x] - report[x-1])}, outcome:${( report[x] - report[x-1] > 3 || report[x] - report[x-1] < 0)}`)
            if ( report[x] - report[x-1] > 3 || report[x] - report[x-1] < 0 ) {
                //console.log(`increase fail:`,x)
                safe = false;
                break;
            }
        }else {//decreasing 9,4,2,3
            //console.log(`increasing, val:${report[x]}, lastVal:${report[x-1]}, cur-last:${( report[x] - report[x-1])}, outcome:${( report[x] - report[x-1] < -3 || report[x] - report[x-1] > 0)}`)
            if ( report[x] - report[x-1] < -3 || report[x] - report[x-1] > 0) {
                //console.log(`increase fail`,x)
                safe = false;
                break;
            }
        }
        
    }
    //if(safe === 'unset') console.log("pass, increasing:",increasing);
    //cyanLog("\n----------")
    return safe;
}

const reportsStringToNumbers = (reports: string[]) => {
    let reportsNumbers: number[][] = [];
    reports.forEach( (report: string) => {
        const splitStringReport = splitStringListByWhiteSpace(report);
        let reportNumber: number[] = []; 
        splitStringReport.forEach ( (stringNumber: string) => {
            reportNumber.push(Number(stringNumber));
        })
        reportsNumbers.push(reportNumber);
    });
    return reportsNumbers;
}

function getRandomNumber(): number {
    return Math.floor(Math.random() * 1000);
}

//execute
cyanLog('Day 02: Red-Nosed Reports\n')

const reports = reportsInput.split(/\n/g);
cyanLog('Last 3 reports:')
console.log(reports.slice(-3,));
cyanLog('convert to numeric arrays for iteration, last 3:')
const reportsIterable = reportsStringToNumbers(reports);
console.log(reportsIterable.slice(-3,))

cyanLog('\nLooking through the reports to find how many are safe.');
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


