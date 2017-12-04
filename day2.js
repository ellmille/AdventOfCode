//Corruption Checksum
//http://adventofcode.com/2017/day/2
//node day2.js input.txt

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

const inputFile = process.argv[2];
fs.createReadStream(inputFile).pipe(process.stdout);

//parse input into rows
//iterate through rows find max and min values
//find difference of max and min in each row
//find sum of all differences
