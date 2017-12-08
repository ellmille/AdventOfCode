//Corruption Checksum -- http://adventofcode.com/2017/day/2

//The spreadsheet consists of rows of apparently-random numbers. 
//To make sure the recovery process is on the right track, 
//they need you to calculate the spreadsheet's checksum. 
//For each row, determine the difference between the largest value and the smallest value; 
//the checksum is the sum of all of these differences.

// 5 1 9 5
// 7 5 3
// 2 4 6 8

//ex. The first row's largest and smallest values are 9 and 1, and their difference is 8.
//ex. The second row's largest and smallest values are 7 and 3, and their difference is 4.
//ex. The third row's difference is 6.
//ex. The spreadsheet's checksum would be 8 + 4 + 6 = 18.
const fs = require('fs');
const readLine = require('readline');
const stream = require('stream');

//const inputFile = process.argv[2];
const input = fs.createReadStream("input/day2Input.txt");
const lineReader = readLine.createInterface(input);

var inputArray = [];

lineReader.on('line', function (line) {
    inputArray.push(line);
});

lineReader.on('close', function () {
    console.log(stepOne(inputArray));
    console.log(stepTwo(inputArray));
})

function stepOne(input) {
    let sum = 0;
    //iterate through the rows
    for (let i = 0; i < input.length; i++) {
        //split by / -- tabs are empty
        let rowArray = input[i].split("\t");
        //find min and max
        let min = findMinInArray(rowArray);
        let max = findMaxInArray(rowArray);
        //find difference and add to sum
        sum += (max - min);
    }
    return sum;
}

function findMaxInArray(array) {
    return Math.max.apply(null, array);
}

function findMinInArray(array) {
    return Math.min.apply(null, array);
}

//The goal is to find the only two numbers in each row where one evenly divides the other
//that is, where the result of the division operation is a whole number. 
//They would like you to find those numbers on each line, divide them, and add up each line's result.

function stepTwo(input) {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let rowArray = input[i].split("\t");
        //find divisible numbers
        if (rowArray) {
            sum += findRowDifference(cleanArray(rowArray));
        }
    }
    return sum;
}

function findRowDifference(rowArray) {
    //compare [0] to [1] then [0] to [2] ect ect
    for (let i = 0; i < rowArray.length; i++) {
        let compare = compareToArray(rowArray[i], i, rowArray);
        if (compare) {
            return compare;
        }
    }
}

function compareToArray(n, arrayPlace, rowArray) {
    for (let i = 0; i < rowArray.length; i++) {
        if (i !== arrayPlace) {
            if (n % rowArray[i] == 0) {
                return n / rowArray[i];
            } else if (rowArray[i] % n == 0) {
                return rowArray[i] / n;
            }
        }
    }
}

function cleanArray(rowArray) {
    let cleanArray = [];
    for (let i = 0; i < rowArray.length; i++) {
        if (isNumber(rowArray[i])) {
            cleanArray.push(parseInt(rowArray[i]));
        }
    }
    return cleanArray;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}