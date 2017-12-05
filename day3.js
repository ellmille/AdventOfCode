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

//create spiral storage up to input
// 1 is at x0 y0
// 2 is at x1 y0
// 3 is at x1 y1
// 4 is at x0 y1
// 5 is at x-1 y1
// 6 is at x-1 y0
// 7 is at x-1 y-1
//first we may want to find length in squares x can be the midpoint

//count squares from 1 to input