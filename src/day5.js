//The message includes a list of the offsets for each jump. Jumps are relative: 
//-1 moves to the previous instruction, and 2 skips the next one. 
//Start at the first instruction in the list. 
//The goal is to follow the jumps until one leads outside the list.

//after each jump, the offset of that instruction increases by 1. 
//So, if you come across an offset of 3, you would move three instructions forward, 
//but change it to a 4 for the next time it is encountered.

//Positive jumps ("forward") move downward; (to the right)
//negative jumps move upward. (to the left)
//these offset values will be written all on one line, with the current instruction marked in parentheses

//0 3 0 1 -3
//(0) 3  0  1  -3  - before we have taken any steps.
//(1) 3  0  1  -3  - jump with offset 0 (that is, don't jump at all). Fortunately, the instruction is then incremented to 1.
//2 (3) 0  1  -3  - step forward because of the instruction we just modified. The first instruction is incremented again, now to 2.
//2  4  0  1 (-3) - jump all the way to the end; leave a 4 behind.
//2 (4) 0  1  -2  - go back to where we just were; increment -3 to -2.
//2  5  0  1  -2  - jump 4 steps forward, escaping the maze.
//In this example, the exit is reached in 5 steps.

//How many steps does it take to reach the exit?
const fs = require('fs');
const readLine = require('readline');
const stream = require('stream');

const input = fs.createReadStream("input/day5Input.txt");
const lineReader = readLine.createInterface(input);

var inputArray = [];

lineReader.on('line', function (line) {
    inputArray.push(parseInt(line));
});

lineReader.on('close', function () {
   console.log(stepThroughInstructions(inputArray)); //342669
});

//keep track of steps
function stepThroughInstructions(instructionArray){
    var count = 0; //step count
    let inputArray = instructionArray.slice();
    //find first step
    let index = 0;
    //iterate through while still correlates with an index within the array
    while(index < inputArray.length){
        let i = index;
        //find new index
        index += inputArray[i];
        //increment step
        inputArray[i]++;
        //increment step count
        count++;
    }
    return count;
}