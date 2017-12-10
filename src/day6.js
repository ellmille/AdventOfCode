//The reallocation routine operates in cycles. 
//In each cycle, it finds the memory bank with the most blocks (ties won by the lowest-numbered memory bank) 
//and redistributes those blocks among the banks. 
//To do this, it removes all of the blocks from the selected bank, then moves to the next (by index) memory bank and 
//inserts one of the blocks. It continues doing this until it runs out of blocks; 
//if it reaches the last memory bank, it wraps around to the first one.

//For example, imagine a scenario with only four memory banks:

//The banks start with 0, 2, 7, and 0 blocks. 
//The third bank has the most blocks, so it is chosen for redistribution.
//Starting with the next bank (the fourth bank) and then continuing to the first bank, the second bank, and so on, 
//the 7 blocks are spread out over the memory banks. 
//The fourth, first, and second banks get two blocks each, and the third bank gets one back. 
//The final result looks like this: 2 4 1 2.
//Next, the second bank is chosen because it contains the most blocks (four). 
//Because there are four memory banks, each gets one block. 
//The result is: 3 1 2 3.
//Now, there is a tie between the first and fourth memory banks, both of which have three blocks. 
//The first bank wins the tie, and its three blocks are distributed evenly over the other three banks, 
//leaving it with none: 0 2 3 4.
//The fourth bank is chosen, and its four blocks are distributed such that each of the 
//four banks receives one: 1 3 4 1.
//The third bank is chosen, and the same thing happens: 2 4 1 2.
//At this point, we've reached a state we've seen before: 2 4 1 2 was already seen. 
//The infinite loop is detected after the fifth block redistribution cycle, and so the answer in this example is 5.

//how many redistribution cycles must be completed before a configuration is produced that has been seen before?

const fs = require('fs');
const readLine = require('readline');
const stream = require('stream');

const input = fs.createReadStream("input/day6Input.txt");
const lineReader = readLine.createInterface(input);

var inputLine;

lineReader.on('line', function (line) {
    inputLine = line;
});

lineReader.on('close', function () {
   //seperate input by tab
   var bankArray = cleanArray(inputLine.split("\t"));
   console.log(bankArray);
});

function cleanArray(line){
    var cleanedArray = [];
    for(let i = 0; i < line.length; i++){
        cleanedArray.push(parseInt(line[i]));
    }
    return cleanedArray;
}