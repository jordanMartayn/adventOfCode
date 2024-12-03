function cyanLog(msg: string) {
    console.log(`\x1b[36m\n${msg}\x1b[0m`)
}

function splitStringListByWhiteSpace(list: string) {
    const idArray = list.split(/\s+/);
    return idArray;
}

function sumOfNumberList( numberList: number[] ) {
    return numberList.reduceRight( (tot,val) => {return tot + val} );
}

function removeWhiteSpace(string: string){
    return string.replace(/\s+/,'');
}

const logGoldStar = (message: string) => {
    const star = '\u2B50'; // Unicode for gold star (⭐)
    const border = `${star.repeat(1)} GOLD STAR LOG ${star.repeat(1)}`;
    const timestamp = new Date().toLocaleString();

    console.log(
        `%c${border}\n%c${message}\n%c${border}`,
        'color: gold; font-weight: bold;',
        'color: gray; font-style: italic;',
        'color: green; font-weight: bold;',
        'color: gold; font-weight: bold;'
    );
};



export {cyanLog, logGoldStar, splitStringListByWhiteSpace, sumOfNumberList, removeWhiteSpace }