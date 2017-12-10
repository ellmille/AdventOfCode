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
const _ = require('underscore');

//const inputFile = process.argv[2];
const input = fs.createReadStream("input/day4Input.txt");
const lineReader = readLine.createInterface(input);

var inputArray = [];

lineReader.on('line', function (line) {
    inputArray.push(line);
});

lineReader.on('close', function () {
    console.log("input array = "+inputArray.length);
    console.log("Step One: "+findValidPassPhrases(inputArray, 1)); //325
    console.log("Step Two: "+findValidPassPhrases(inputArray, 2)); //119
})

//truns line into an array of words
function findValidPassPhrases(input, step){
    let sum = 0; //amount of valid passphrases
    for (let i = 0; i < input.length; i++) {
        //split by space tabs are empty
        let rowArray = input[i].split(" ");
        //compare array to itself
        if(step == 1){
            sum += findRepeatsInPhrase(rowArray);
        }
        if(step == 2){
           sum += findRepeatsInPhrase(sortArray(rowArray));
        }
    }
    return sum;
}

function findRepeatsInPhrase(rowArray){
    for (let i = 0; i < rowArray.length; i++) {
        //copy array
        let compareArray = rowArray.slice();
        //create array without the object we're looking for
        let compare = _.without(compareArray, compareArray[i]);
        //compare lengths (if we are missing more than 1 object, we have dupes)
        if(rowArray.length - 1 > compare.length){
            return 0;
        }
    }
    return 1;
}


//a valid passphrase must contain no two words that are anagrams of each other
//a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

function sortArray(arrayIn){
    let sortedArray = [];
    for(let i = 0; i < arrayIn.length; i++){
        let sorted = arrayIn[i].split("").sort();
        sortedArray.push(sorted.toString());
    }
    return sortedArray;
}