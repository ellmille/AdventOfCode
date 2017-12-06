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

//console.log(stepOne(input));
stepTwo(input);

function stepOne(input){
    var result = createSpiral(input);
    var singleSpiral = result[input - 1].getLocation();
    return findDistance(singleSpiral[0], singleSpiral[1]);
}
function stepTwo(input){
    var spiral = createSumSpiral(input);
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
    this.getValue = function(){
        return this.value;
    }
    this.findByLocation = function(x, y){
        if(x == this.x && y == this.y){
            return this;
        }
        return false;
    }
}

//The programs here clear the grid and then store the value 1 in square 1. 
//Then, in the same allocation order as shown above, 
//they store the sum of the values in all adjacent squares, including diagonals.
//147  142  133  122   59
//304    5    4    2   57
//330   10    1    1   54
//351   11   23   25   26
//362  747  806--->   ...
//What is the first value written that is larger than your puzzle input?
function createSumSpiral(length){ 
    var spiral = [];
    spiral.push(new square(0, 0, 1));
    var x = 1;
    var y = 0;
    var i = 2;

    let sideLength = 2;
    while(i < length){
        //create right (bottom to top);
        for(let j = 0; j < sideLength - 1; j++){
            let value = findSquareValue(spiral, x, y);
            if(checkForResult(value)){
                return;
            }
            spiral.push(new square(x, y, value));
            i++;
            y++;
        }
        //create top (right to left)
        for(let j = 0; j < sideLength; j++){
            let value = findSquareValue(spiral, x, y);            
            if(checkForResult(value)){
                return;
            }
            spiral.push(new square(x, y, value));
            i++;
            x--;
        }
        //create left (top to bottom)
        for(let j = 0; j < sideLength; j++){
            let value = findSquareValue(spiral, x, y);            
            if(checkForResult(value)){
                return;
            }
            spiral.push(new square(x, y, value));
            i++;
            y--;
        }
        //create bottom (left to right) and add an extra to the right
        for(let j = 0; j < sideLength + 1; j++){
            let value = findSquareValue(spiral, x, y);            
            if(checkForResult(value)){
                return;
            }
            spiral.push(new square(x, y, value));
            i++;
            x++;
        }
        sideLength += 2;
    }
    return spiral;
}

function findSquareValue(squareArray, x, y){
    let sum = 0;
    //find all squares around current square
    for(let i = 0; i < squareArray.length; i++){
        //find square to the right
        if(squareArray[i].findByLocation(x + 1, y)){
            sum += squareArray[i].getValue();
        }
        //upper right
        if(squareArray[i].findByLocation(x + 1, y + 1)){
            sum += squareArray[i].getValue();
        }
        //above
        if(squareArray[i].findByLocation(x, y + 1)){
            sum += squareArray[i].getValue();
        }
        //upper left
        if(squareArray[i].findByLocation(x - 1, y + 1)){
            sum += squareArray[i].getValue();
        }
        //left
        if(squareArray[i].findByLocation(x - 1, y)){
            sum += squareArray[i].getValue();
        }
        //lower left
        if(squareArray[i].findByLocation(x - 1, y - 1)){
            sum += squareArray[i].getValue();
        }
        //lower
        if(squareArray[i].findByLocation(x, y - 1)){
            sum += squareArray[i].getValue();
        }
        //lower right
        if(squareArray[i].findByLocation(x + 1, y - 1)){
            sum += squareArray[i].getValue();
        }
    }
    return sum;
}

function checkForResult(value){
    if(value > input){
        console.log(value);
        return true;
    }
    return false;
}