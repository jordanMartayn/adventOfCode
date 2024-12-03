function cyanLog(msg: string) {
    console.log(`\x1b[36m${msg}\x1b[0m`)
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

export {cyanLog, splitStringListByWhiteSpace, sumOfNumberList, removeWhiteSpace }