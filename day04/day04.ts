//Day 4: Ceres Search (word search)
import { cyanLog } from "../utils/utils";
import { egMiniSearch, egAlphabet, wordSearch } from "./puzzleInput";

//type def
type coord = {
    x: number,
    y: number,
}

class Coord {
    constructor(public x: number, public y: number) {}
}

type window = {
    originChar: string,
    box: string[][],
}
class Window {
    constructor(public originChar: string, public box: string[][]) {}
}

//methods
const parseStringTo2dArray = (string:string, splitChar: string) => {
    console.log(string.slice(0,30))
    let oneD:string[] = string.split(splitChar);
    let twoD:string[][] = oneD.map( (line) => {
        return line.split("");
    })
    return twoD
}
const makeSearchWindow = (twoD: string[][], coord: coord, searchTerm: string) => {
    /*
            0   0   0   0   0
            0   0   0   0   0
            0   0   X   0   0
            0   0   0   0   0
            0   0   0   0   0
        To make a window here in the example using a radius of 3 (char lenth of three)
        we need to look at each coord of x +- (length -1) & y +- (length -1) all the iterations of
        
    */
    let radius: number = searchTerm.length - 1;
    let box: string[][] = [];
    console.log(twoD[0])
    for ( let y = coord.y - radius; y <= coord.y + radius; y++) {
        let line: string[] = [];
        for( let x = coord.x - radius; x <= coord.x + radius; x++ ){
            let char: string = twoD[y]?.[x] ? twoD[y][x] : "!"
            line.push(char);
        }
        box.push(line);
    }
    const window = new Window( twoD[coord.y][coord.x], box );

    return window;

}

const searchTheWindow = (window: window, term: string) => {
    if ( window.originChar !== term.slice(0,1) && window.originChar !== term.slice(-1,) ) {
        //dont need to proceed as were only looking to search if the origin char is at the start or end of the term.
        console.log(window.originChar, " is not valid search Char for: ",term);
        return
    }
    console.log("valid search char: ",window.originChar);
    //TODO: working from here need to look for next letter baring in mind backwards and forwards.
}

const logTwoD = (twoD: string[][]) => {
    console.log(twoD.map(row => row.join(' ')).join('\n'));
}

//exe
cyanLog("Day 4: Ceres Search");

cyanLog("Converting String to 2D Array in lowercase easier for me to read");
const wordSearchLc = wordSearch.toLowerCase();
const egMiniSearchLc = egMiniSearch.toLowerCase();

const wordSearch2D = parseStringTo2dArray(wordSearchLc, "\n");
const egMiniSearch2D = parseStringTo2dArray(egMiniSearchLc, "\n")
//const egAlphabet2D = parseStringTo2dArray(egAlphabet, "\n")
console.log("Created a 2D array 140 x 140 ");

cyanLog("Creating a search window:");
const egCoord: coord = new Coord(0,0)
const egWindow = makeSearchWindow( egMiniSearch2D, egCoord, "xmas");
//const egAlphaWindow = makeSearchWindow( egAlphabet2D, egCoord, "xmas");

logTwoD(egWindow.box);
console.log(`\n`)
//logTwoD(egAlphaWindow.box);

searchTheWindow(egWindow, "xmas");
