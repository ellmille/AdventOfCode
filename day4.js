//High-Entropy Passphrases -- http://adventofcode.com/2017/day/4

//A new system policy has been put in place that requires all accounts to use a passphrase instead of passwords.
//A passphrase consists of a series of words (lowercase letters) separated by spaces.

//A valid passphrase must contain no duplicate words.

//ex: aa bb cc dd ee is valid.
//ex: aa bb cc dd aa is not valid - the word aa appears more than once.
//ex: aa bb cc dd aaa is valid - aa and aaa count as different words.
const fs = require('fs');
const readLine = require('readline');
const stream = require('stream');

//const inputFile = process.argv[2];
const input = fs.createReadStream("day4Input.txt");
const lineReader = readLine.createInterface(input);

var inputArray = [];

lineReader.on('line', function (line) {
    inputArray.push(line);
});

lineReader.on('close', function () {
    console.log(stepOne(inputArray));
    //console.log(stepTwo(inputArray));
})

function stepOne(input){
    let sum = 0; //amount of valid passphrases
    for (let i = 0; i < input.length; i++) {
        //split by space tabs are empty
        let rowArray = input[i].split(" ");
        //compare array to itself
        sum += findInvalidPhrase(rowArray);
    }
    return sum;
}

function findInvalidPhrase(rowArray){
    for (let i = 0; i < rowArray.length; i++) {
        let compare = compareToArray(rowArray[i], i, rowArray);
        if (compare) {
            return 1;
        }
    }
    return 0;
}

function compareToArray(n, arrayPlace, rowArray) {
    for (let i = 0; i < rowArray.length; i++) {
        if (i !== arrayPlace) {
            if (n === rowArray[i]) {
                return true;
            }
        }
    }
    return false;
}