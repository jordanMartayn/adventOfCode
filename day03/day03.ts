//Day 3: Mull It Over  (string parsing)
import * as fs from 'fs'
import { removeWhiteSpace, cyanLog, sumOfNumberList, logGoldStar } from '../utils/utils';

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

const getIndexsByString = (corruptData: string, searchString: string) => {
    let indexes: number[] = [];
    let searchIndex: number = 0;
    let searchStop: boolean = false;
    let whileLimit: number = 0;

    while (!searchStop && whileLimit < 1000) {
        whileLimit++
        const i: number = corruptData.indexOf(searchString, searchIndex);
        if ( i === -1) {searchStop = true; break; } 
        indexes.push(i);
        searchIndex = i+1;
    }
    return indexes;
}

const addTagToIndexes = (indexes: number[], tagTruth: boolean) => {
    return indexes.map( (i) => {
        return {
            index:i,
            isDo:tagTruth,
        }
    })
}

const mergeAndSortTagged = (taggedList1: object[], taggedList2: object[]) => {
    const mergedList: object[] = taggedList1.concat(taggedList2);
    return mergedList.sort( (a, b) => {
        return (a['index'] - b['index']); 
    })
}

const removeNonChangingDoDonts = (mergedAndSortedIndex: object[]) => {
    let currentDoStatus: boolean = true;
    return mergedAndSortedIndex.filter( (taggedIndex: object) => {
        if ( taggedIndex['isDo'] === currentDoStatus ) {
            return false
        }
        currentDoStatus = taggedIndex['isDo'];
        return true 
    })
}

const validCorruptedConditionalData = ( corruptData: string, indexs: object[]) => {
    //adding in the start as true
    indexs.unshift( {index: 0, isDo: true} );
    //and end as false
    indexs.push( {index: corruptData.length, isDo: false} );

    let validDataChunks: string[] = [];
    for ( let x = 1; x <= indexs.length; x++) {
        if ( indexs[x-1]['isDo'] ) {
            const validData: string = corruptData.slice(indexs[x-1]['index'],indexs[x]['index']);
            if ( validData === "") continue;
            validDataChunks.push(validData);
        }
    }
    return validDataChunks;

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

cyanLog("Sum of all mul operations\n\n");
const sumOfAllMuls = sumOfNumberList(mulResults);
console.log(sumOfAllMuls);
cyanLog("YAY 1st Star");

cyanLog("Part 2 - do() & don't()\n");
cyanLog("Finding the indexs of do()\n");
const doIndexes = getIndexsByString(corruptData, "do()");
console.log(doIndexes);

cyanLog("Finding the indexs of don't()\n");
const dontIndexes = getIndexsByString(corruptData, "don't()");
console.log(dontIndexes);

cyanLog("Adding do/dont tag to indexs\n");
const doIndexesWTag = addTagToIndexes(doIndexes, true);
const dontIndexesWTag = addTagToIndexes(dontIndexes, false);
console.log(doIndexesWTag.slice(0,5),"etc",dontIndexesWTag.slice(0,5),"etc")

cyanLog("Merging do list & dont list, then sorting by index");
const mergedAndSortedIndex = mergeAndSortTagged(doIndexesWTag, dontIndexesWTag);
console.log(mergedAndSortedIndex);

cyanLog("Removing following Indexs that dont flip, ie false(keep),true(keep),true(remove), etc")
const filteredIndexs = removeNonChangingDoDonts(mergedAndSortedIndex);
console.log(filteredIndexs);

cyanLog("Using The Indexes Get Sections of valid corrupted data, third valid chunk:");
const validDataChunks = validCorruptedConditionalData(corruptData, filteredIndexs);

cyanLog("Running the chunks through the mul pipeline; retrieve uncorrupted data, attmept mul opperations, sum of muls, sum of all combined");
let sumOfEachChunk: number[] = [];
validDataChunks.forEach( (chunk: string) => {
    const retrievedData = retrieveUncorruptedData(chunk);
    
    const mulledData = attemptMulOperations(retrievedData);
    
    const sumOf = sumOfNumberList(mulledData);
    
    sumOfEachChunk.push(sumOf);
})
const sumOfAllChunkData = sumOfNumberList(sumOfEachChunk);
console.log(sumOfAllChunkData);

logGoldStar("YAY")
