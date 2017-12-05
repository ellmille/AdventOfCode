//Spiral Memory -- http://adventofcode.com/2017/day/3

//17  16  15  14  13
//18   5   4   3  12
//19   6   1   2  11
//20   7   8   9  10
//21  22  23---> ...

//Requested data must be carried back to square 1 
//by programs that can only move up, down, left, or right. 
//They always take the shortest path

//ex. Data from square 1 is carried 0 steps, since it's at the access port.
//ex. Data from square 12 is carried 3 steps, such as: down, left, left.
//ex. Data from square 23 is carried only 2 steps: up twice.
//ex. Data from square 1024 must be carried 31 steps.

//How many steps are required to carry the data from the puzzle input all the way to the access port
const input = 361527;

console.log(stepOne(input));

function stepOne(input){
    var result = createSpiral(input);
    var singleSpiral = result[input - 1].getLocation();
    return findDistance(singleSpiral[0], singleSpiral[1]);
}

function createSpiral(length){ 
    var spiral = [];
    spiral.push(new square(0, 0, 1));
    var x = 1;
    var y = 0;
    var i = 2;

    let sideLength = 2;
    while(i < length){
        //create right (bottom to top);
        for(let j = 0; j < sideLength - 1; j++){
            spiral.push(new square(x, y, i));
            i++;
            y++;
        }
        //create top (right to left)
        for(let j = 0; j < sideLength; j++){
            spiral.push(new square(x, y, i));
            i++;
            x--;
        }
        //create left (top to bottom)
        for(let j = 0; j < sideLength; j++){
            spiral.push(new square(x, y, i));
            i++;
            y--;
        }
        //create bottom (left to right) and add an extra to the right
        for(let j = 0; j < sideLength + 1; j++){
            spiral.push(new square(x, y, i));
            i++;
            x++;
        }
        sideLength += 2;
    }
    return spiral;
}

function findDistance(x, y){
    return Math.abs(x) + Math.abs(y);
}

function square(x, y, i){
    this.x = x;
    this.y = y;
    this.value = i;
    this.getLocation = function(){
        return [this.x, this.y];
    }
}