//https://adventofcode.com/2024/day/1
import {stringIdLists} from "./day01LocationLists"

//Methods
function cyanLog(msg: string) {
    console.log(`\x1b[36m${msg}\x1b[0m`)
}

function splitStringListByWhiteSpace(list: string) {
    const idArray = stringIdLists.split(/\s+/);
    return idArray;
}

function splitCombinedListArrayIntoTwo() {
    for (let x = 0; x < idArray.length; x++ ) {
        if ( x % 2) {
            idList02.push( Number(idArray[x]) );
            
        }
        else {
            idList01.push( Number(idArray[x]) );
        }
    }
}

function getDifferenceBetweenLocations(list01: number[] ,list02: number[], vector: boolean = true) {
    //make sure both arrays are the same length
    if ( list01.length != list02.length ) { console.error("DistDiff lists arn't the same length"); return null; }

    //compare each equiv location id finding the non vector difference between and pushing that to new array;
    let idListsDistDiff: number[] = [];
    for ( let x = 0; x < list01.length; x++) {    
        let distance: number = 0;     
        const vectorDist: number = list01[x] - list02[x];
        //incase negitive convert positive if we want the dist not the direction of diff (non vector)
        if ( vectorDist < 0 && vector === false ) {
            distance = vectorDist * -1;
        }
        else distance = vectorDist;

        idListsDistDiff.push(distance);
    }
    return idListsDistDiff;
}

function sumOfNumberList( numberList: number[] ) {
    return numberList.reduceRight( (tot,val) => {return tot + val} );
}

function calculateSimilarities( list01: number[], list02: number[] ) {
    let simalarityScores: number[] = [];
    let numberRepeated = 0;
    let numberNotRepeated = 0;

    list01.forEach ( (id) => {
    //take that id, and find the first index of a number near that id in list 2 so we dont need to look through more than needed
    //also we need a way to stop looking after that value without looking for too much
    //ie for id 99294 I want to look at +-5000
        const range = 1000; // 1000 passes each
        let startPos = -1;
        let endPos = -1;
        for ( let x = (id - range); x < (id + range); x++) {
            const startIndex = list02.indexOf(x);
            if (startIndex > -1) {
                startPos = startIndex;
                break;
            }
        }
        for ( let x = (id + range); x > (id - range); x--) {
            const endIndex = list02.lastIndexOf(x);
            if (endIndex > -1) {
                endPos = endIndex;
                break;
            }
        }
        if ( startPos < 0 || endPos < 0){
            console.log("start/end pos not found for",id,startPos,endPos)
        }

        //using the start and end pos look through list 2 for number of matches
        let matchCount = 0;
        list02.slice(startPos, endPos).forEach( (list2Id) => {
            if ( list2Id === id ) {
                matchCount++;
            }
        })

        //use matchCout to get a score and push to scores
        if ( matchCount > 0) { numberRepeated++ } else numberNotRepeated++ 
        simalarityScores.push(id * matchCount);
    })
    cyanLog(`Locations repeated:`);
    console.log(numberRepeated);
    cyanLog(`Locations that have no duplicates:`);
    console.log(numberNotRepeated);
    return simalarityScores;
}

//Execute
cyanLog("Spliting Into Two Lists\n");
const idArray = splitStringListByWhiteSpace(stringIdLists)

let idList01: number[] = [];
let idList02: number[] = [];
splitCombinedListArrayIntoTwo();

cyanLog("check idList01 last 5");
console.log(idList01.slice(-5,),"End\n");
cyanLog("check idList02 last 5");
console.log(idList02.slice(-5,),"End\n");

cyanLog("Sorting the lists from smallest to longest\n");
const idList01Sorted = idList01.sort( (a,b) => {return a - b} );
const idList02Sorted = idList02.sort( (a,b) => {return a - b} );
cyanLog("check first 5 & last 5 of sorted idList01");
console.log(idList01Sorted.slice(0,5))
console.log(idList01Sorted.slice(-5,))
cyanLog("check first 5 & last 5 of sorted idList02");
console.log(idList02Sorted.slice(0,5))
console.log(idList02Sorted.slice(-5,))

cyanLog("Non vector diff between the locations:")
const nonVecterLocationDifferences = getDifferenceBetweenLocations( idList01Sorted, idList02Sorted, false);
console.log(nonVecterLocationDifferences?.slice(0,10));

cyanLog("Vector diff between the locations:")
const vecterLocationDifferences = getDifferenceBetweenLocations( idList01Sorted, idList02Sorted);
console.log(vecterLocationDifferences?.slice(0,10));

cyanLog("Total diff Vector:")
if (!vecterLocationDifferences) {
    throw new Error (`locationDifference: ${vecterLocationDifferences}`);
}
const totalDiffVector = sumOfNumberList(vecterLocationDifferences!);
console.log(totalDiffVector);

cyanLog("Total diff Non Vector:")
if (!nonVecterLocationDifferences) {
    throw new Error (`locationDifference: ${nonVecterLocationDifferences}`);
}
const totalDiffNonVector = sumOfNumberList(nonVecterLocationDifferences!);
console.log(totalDiffNonVector);

//I belive the correct answer for the puzzle is non vector difference.
//that was correct: 1889772

//Calculate a simalarity score by:
//take a number from list 1, count how many times it is in list 2.
//multiply that number by the count,
//take the numbers from the comparison and sum them
cyanLog("\nfinding the similarty per id")
const similarityScores = calculateSimilarities( idList01Sorted, idList02Sorted );
const totalSimilariyScore = sumOfNumberList(similarityScores);
cyanLog('Total Similartiy Score:');
console.log(totalSimilariyScore);
//Correct 23228917 Day 1 complete.

