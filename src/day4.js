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
    console.log("Step Two: "+findValidPassPhrases(inputArray, 2));
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
            sum += findAnagramsInPhrase(rowArray);
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

function findAnagramsInPhrase(rowArray){
    for (let i = 0; i < rowArray.length; i++) {
        //copy array
        let arrayCopy = rowArray.slice();
        let phrase = arrayCopy[i];
        let compare = _.without(arrayCopy, arrayCopy[i]);
        let anagram = searchArray(compare, phrase);
        if(anagram){
            return 0;
        }
        // let compare = findAnagrams(i, rowArray);
        // if (compare) {
        //     //found an anagram
        //     return 0;
        // }
    }
    return 1;
}

function searchArray(compareArray, phrase){
    for (let i = 0; i < compareArray.length; i++) {
        if(compareArray[i].length == phrase.length){
            //now we have to check if the letters are the same
            let difference = _.difference(phrase.split(""), compareArray[i].split(""));
            if(difference.length == 0){
                //password is invalid
                return true; 
            }
        }
    }
    return false;
}

//a valid passphrase must contain no two words that are anagrams of each other
//a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

function findAnagrams(n, rowArray) {
    for (let i = 0; i < rowArray.length; i++) {
        if (i !== n) {
            //are the phrases even the same length
            if(rowArray[n].length === rowArray[i].length){
                //now we have to check if the letters are the same
                let difference = _.difference(rowArray[n].split(""), rowArray[i].split(""));
                if(difference.length == 0){
                    //password is invalid
                    return true;
                }
            }
        }
    }
    return false;
}