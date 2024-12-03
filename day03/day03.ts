//Day 3: Mull It Over  (string parsing)
import * as fs from 'fs'
import { removeWhiteSpace, cyanLog, sumOfNumberList } from '../utils/utils';

//methods
const readPuzzleInput = () => {
    try {
        const data = fs.readFileSync('./day03/puzzleInput.txt', 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return "Error"
    }
}

const retrieveUncorruptedData = (corruptData: string) => {
    //my thinking is look through and find where 'mul(' exists and then go to the max pos string length,
    //witch would be mul( 999,999) +8 make sure no white space.

    //after learning about match with regex went with that.
    let possibleData: string[] = corruptData.match(/mul\(\d{1,3}\,\d{1,3}\)/g) || ["you","failed","lol"];
    return possibleData;   
}

const attemptMulOperations = (muls: string[]) => {
    //loop through the string of muls, taking steps to do the mul operation
    let result: number[] = [];
    muls.forEach( (mul:string) => {
        const justNumCommaString:string = mul.slice(4,-1);
        const numbersString: string[] = justNumCommaString.split(/\,/) || ["222","222"];
        const numbers: number[] = numbersString.map( value => Number(value) ) ||[222,222];
        const mathResult: number = numbers[0] * numbers[1]; 
        if ( mathResult === 222*222 ) console.log("Possible Error in Attempt MulOperations")
        result.push(mathResult);
    })
    return result;
}

//exe
cyanLog(`\n\nDay 3: Mull It Over\n\n`);
cyanLog("Reading Corrupt data from file, and removing whitespace.\n");
let corruptData: string = readPuzzleInput();
corruptData = removeWhiteSpace(corruptData);

cyanLog("Getting a list of possible data, via regex:\n");
const possibleData:string[] = retrieveUncorruptedData(corruptData);
console.log(possibleData.slice(0,5));

cyanLog("Attempting to perform the mul operations:\n");
const mulResults = attemptMulOperations(possibleData);
console.log(mulResults.slice(0,5));

cyanLog("Sum of all mul operations\n");
const sumOfAllMuls = sumOfNumberList(mulResults);
console.log(sumOfAllMuls); //Gold Star

//YESgo from start to first don't(),NO continue to do(), YES continue to don't() NO and so on.


