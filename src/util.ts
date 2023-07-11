export function removeCarriageReturns(str: string)
{
    return str.replace(/\r/gm, '');
}

export function reduceSpaceLines(str: string)
{
    return str.replace(/^[ \t]+$/gm, '');
}

export function removeIndent(str: string)
{
    let spaces = str.match(/^[ \t]*(?<!$)/gm);

    if (!spaces)
        return str;

    let indent = Math.min(...spaces.map(match => match.length));

    if (indent === 0)
        return str;
        
    let indentRegexp = new RegExp(`^[ \\t]{${indent}}`, 'gm');

    return str.replace(indentRegexp, '');
}

export function splitToBlocks(str: string)
{
    return str.split(/\n{2,}(?=[^ \n])/gm)
                .map(strBlock => strBlock.trim())
                .filter(strBlock => strBlock !== '');
}

export function skipFirstLine(str: string)
{
    return str.substring(str.indexOf('\n') + 1);
}

// let testStr = fs.readFileSync('test/util/test.txt', 'utf-8');
//     testStr = removeCarriageReturns(testStr);

// console.log(splitToBlocks(testStr));