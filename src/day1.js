//Take input and find the sum of all digits that match the next digit in the list. 
//The list is circular, so the digit after the last digit is the first digit in the list.

//ex. 1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit and the third digit (2) matches the fourth digit.
//ex. 1111 produces 4 because each digit (all 1) matches the next.
//ex. 1234 produces 0 because no digit matches the next.
//ex. 91212129 produces 9 because the only digit that matches the next one is the last digit, 9.

//takes input from command line
const input = process.argv[2]
const arrayIn = input.split("");
console.log(stepOne(arrayIn));
console.log(stepTwo(arrayIn));

function stepOne(inputArray){
    let sum = 0;
    let lastInt = parseInt(inputArray[0]);
    
    for (var i = 1; i < inputArray.length; i++){
        if(parseInt(inputArray[i]) == lastInt){
            sum += parseInt(inputArray[i]);
        }
        lastInt = parseInt(inputArray[i]);
    }
    
    if(lastInt == parseInt(inputArray[0])){
        sum += parseInt(inputArray[0]);
    }
    
    return sum;
}
//Now, instead of considering the next digit, 
//it wants you to consider the digit halfway around the circular list. 
//That is, if your list contains 10 items, 
//only include a digit in your sum if the digit 10/2 = 5 steps forward matches it. 
//Fortunately, your list has an even number of elements.
function stepTwo(inputArray){
    const inputSize = inputArray.length;
    const halfway = inputSize/2;

    //create new array that is 1 + the first half of the original array
    let newArray = inputArray.slice().concat(inputArray.slice(0, halfway));

    let sum = 0;
    let compareIntPlace = halfway;
    let compareInt = parseInt(newArray[compareIntPlace]);
    
    for (var i = 0; i < inputSize; i++){
        if(parseInt(newArray[i]) === compareInt){
            sum += parseInt(newArray[i]);
        }
        compareIntPlace++;
        compareInt = parseInt(newArray[compareIntPlace]);
    }
    
    return sum;
}
