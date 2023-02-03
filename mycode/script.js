'use strict';

//FUNCTIONS

/*
//////////////////////////////////////////////////////////////////
//Default Parameters (don't have to enter manually)

//array to contain bookings
const bookings = [];

//basic booking function
//after ES6 set defaults in function arguments with =
//can also say that default price is determined by numPassengers with *
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
  //have to use variable before because data read in order
) {
  //old way of setting default parameters(before ES6)
  //use shortcircuting
  //numPassengers = numPassengers || 1;
  //price = price || 199;
  //undefined is falsy and thus set to 1 & 199

  //enhanced object literal syntax
  const booking = {
    //define variable,
    //creates property with that name
    //and also the value that's in that variable
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking); //push to array
};

createBooking('LH123'); //undefined numPassengers & price set to default
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
//can NOT skip arguments when we call the function
//createBooking('LH123', 1000); //flight & price
createBooking('LH123', undefined, 1000); //do it this way

///////////////////////////////////////////////////////////////////
//How passing arguments works:
//VALUE vs. REFERENCE (primitive vs. objects)

//variable with value type of a string (primitive)
const flight = 'LH234';
//object
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

//check in function
//flightNum in function is a copy of the original, NOT the original itself
const checkIn = function (flightNum, passenger) {
  //flight number changed (not good practice to change parameters of function)
  flightNum = 'LH999'; //wont change original value in flight variable
  passenger.name = 'Mr. ' + passenger.name; //add Mr. to name
  //manipulating the jonas object (same in the memory heap)
  //*****STILL A VALUE just contains a memory address*****

  if (passenger.passport === 24739479284) {
    alert('Checked in!');
  } else {
    alert('Wrong passport!');
  }
};

//call check in function
//checkIn(flight, jonas); //to be passed in as flightNum, passenger
//console.log(flight); //LH234
//flightNum is separate variable so flight not changed
//console.log(jonas); //Mr. Jonas Schmedtmann
//when we pass a reference type to a function, what is copied
//is really just the reference to the object in the memory heap
//both point to the same object in the memory

//same as doing...
//const flightNum = flight; //value copied(each separate variables)
//const passenger = jonas; //copy object(both copy & original change)

//function to change passport
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

//two functions manipulating the same object causes issues

newPassport(jonas); //change jonas objects passport
checkIn(flight, jonas); //now passport no longer matches

//IN PROGRAMMING: passing by value & passing by reference

//IN JAVASCRIPT: passing by value only
//(pass a reference to the function but we do not pass by reference)
//STILL A VALUE just contains a memory address

//languages like C++, can pass a reference to any value instead of the value itself


/////////////////////////////////////////////////////////////////
//FIRST-CLASS and HIGHER-ORDER FUNCTIONS

//First-Class Functions
//JS treats functions as first-class citizens
//this means that functions are simply values
//functions are just another "type" of object
//able to:
//store functions in variables or properties
//pass functions as arguments to other functions
//return functions from functions
//call methods on functions

//Higher-Order Functions
//a function that receives another function as an argument,
//that returns a new function, or both
//This is only possible because of first-class functions
//example: function recieves another funciton
//higher-order function = addEventListener('click', greet)
//greet = callback function
//example: function returns new function
//higher-order function = function count() {
//let counter = 0;
//return function() { //new function
//counter++;
//};
//}

//FUNCTIONS ACCEPTING CALLBACK FUNCTIONS

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  //REST pattern ...
  const [first, ...others] = str.split(' ');
  //SPREAD operator ...
  return [first.toUpperCase(), ...others].join(' ');
};

//higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); //upperFirstWord & oneWord
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

//JS uses callbacks all the time
const high5 = function () {
  console.log('!!!!');
};

document.body.addEventListener('click', high5);
//called when click anywhere on body of page

['Jonas', 'Martha', 'Adam'].forEach(high5);
//3 times !!!!(high5) on page load

//callback functions allow us to create abstraction


///////////////////////////////////////////////////////////////
//FUNCTIONS RETURNING FUNCTIONS

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//this value (greeterHey) is now a function
//returned from the greet function
const greeterHey = greet('HEY');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

//useful in situations like using:
//programming paragdigm called functional programming

//CHALLENGE
//re-write greet function using arrow functions
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('HI')('Jonas');


/////////////////////////////////////////////////////////////
//CALL & APPLY METHODS

//object
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //use either syntax
  //book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    //fill bookings array with bookings
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

//new airline created
//object
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

//take the method and store it in an external function
const book = lufthansa.book;

//regular function call - this keyword now points to undefined
//book(23, 'Sarah Williams');//does not work

//FIX
//This keyword (mannually set) [call, apply, bind methods]

//CALL METHOD
book.call(eurowings, 23, 'Sarah Williams');
//first argument is what we want the this keyword to point to
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

//can now continue to create new airlines and use call method
const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//APPLY METHOD
//does not recieve a list of arguments after this identifier/keyword
//rather accepts an array of the arguments
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
//better way to do same thing as apply
//USE SPREAD with call method
book.call(swiss, ...flightData);

///////////////////////////////////////////////////////////
//BIND METHOD
//does not immediately call the function
//instead returns a new function where the this keyword is bound
//set to whatever value we pass into bind

//book.call(eurowings, 23, 'Sarah Williams');
//instead of using call method each time
//easier to bind once and just use the new function
const bookEW = book.bind(eurowings); //create new function
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
//call the new function
bookEW(23, 'Steven Williams');
console.log(eurowings);

//use bind to create a function for a specific airline & flight number
const bookEW23 = book.bind(eurowings, 23);
//defining arguments in advance = partial application
//hard set the first argument for book(flightNum, name) to flightNum 23
//now only need name for argument
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

//when we use objects together with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this); //not a number (this is the button element)

  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyPlane();

//manually define the this keyword with bind
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial Application (preset parameters)
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //220

const addVAT = addTax.bind(null, 0.23); //null = keyword, 0.23 = rate
//like saying : addVAT = value => value + 0.23;

console.log(addVAT(100)); //123
console.log(addVAT(23)); //28.29

//function returning function
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTax2(0.23); //set rate
console.log(addVAT2(100)); //value, returns 123
console.log(addVAT2(23)); //value, returns 28.29
*/

//////////////////////////////////////////////////////////////////
//CODDING CHALLENGE #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favorite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the DEFAULT OPTION. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section.

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK!!!
*/

/*
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  //This generates [0, 0, 0, 0]. More in the next section
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //Receive Answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    //What is your favorite programming language?
    //    0: JavaScript
    //    1: Python
    //    2: Rust
    //    3: C++
    //    (Write option number)
    console.log(answer);

    //check answer for number & that it makes sense
    //Register Answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    //display results
    this.displayResults();
    this.displayResults('string');
  },

  //display results method (default of type set to array)
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}.`);
      //Like: "Poll results are 13, 2, 4, 1."
    }
  },
};

//poll.registerNewAnswer();
//call method whenever click "Answer Poll" button
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
//bind to poll for assignment of this keyword

//BONUS
//BONUS TEST DATA 1: [5, 2, 3]
//BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
//use call method to manually set the this keyword to a new object
//as the answer property has the new array
poll.displayResults.call({ answers: [5, 2, 3] }, 'string'); //logged as string
poll.displayResults.call({ answers: [5, 2, 3] }); // logged as array
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string'); //logged as string
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }); // logged as array


/////////////////////////////////////////////////////////////////////////
//IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)
//disappears right after it's called once
//will need this technique later with things like async/await

//nothing stopping us from running it more times
const runOnce = function () {
  console.log('This will never run again, unless I call it again.');
};
runOnce();

//IIFE (wrap functions statement in parethesis to make JS think it's an expression)
(function () {
  console.log('This will never run again.');
  //const isPrivate = 23; //global can not access this (scope)
})(); //these empty parethesis call the function immediately

//wont work because of scope chain
//console.log(isPrivate);

//with arrow function
(() => console.log('This ALSO will never run again.'))(); //immediately called

//functions create scopes
//(global scope does not have access to any things
//[such as variables] inside the functions scope)
//the functions scope does have access to global scope
//all data defined inside a scope is called Private
//also called encapsulated data

//sometimes need to hide/protect variables this way:
//variables declared with let or const create own scope within a block
//create a block
{
  const isPrivate = 23;
  var notPrivate = 46;
}

//console.log(isPrivate);
console.log(notPrivate);


//////////////////////////////////////////////////////////////////
//CLOSURES
//do NOT create manually; happens automatically
//(can NOT access closed-over variables explicitly)
//a closure is NOT a tangible JS object

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers.`);
  };
};

const booker = secureBooking(); // already finished it's execution but...
//call booker function
booker(); //still able to access passengerCount
booker(); //still able to access passengerCount
booker(); //still able to access passengerCount
//a CLOSURE makes a function remember all the variables that existed
//at the function's birth/origin
//in this case booker remembers variables from origin in secureBooking
//(ANY FUNCTION ALWAYS has access to the variable environment...
//of the exectution context in which the function was created)
//This connection is called CLOSURE (scope chain preserved through the closure)
//this closed over variable environment stays with the function forever

//LIKE A BACKPACK :) (able to look at it in the console)
console.dir(booker);


//////////////////////////////////////////////////////////////////
//MORE CLOSURE EXAMPLES

//don't need to return a function from another function to create a closure

//example 1
//empty variable
let f;

//function expression
const g = function () {
  const a = 23;
  //assign f to a function
  f = function () {
    console.log(a * 2);
  };
};

//g(); //called and finished execution
//f();
//f function closes over any variables of the execution context in which it was defined
//a variable inside the "backpack" of the f function

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // f has "backpack" with a inside

//inspect variable environment
console.dir(f);

//re-assigning f function in h function
h();
f(); // f has "backpack" with b inside
//closure can change like this as the variable is re-assigned

//inspect variable environment
console.dir(f);

//example 2
//timer
//function accepts n=numberPassengers & wait = wait time
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  //call setTimeout function
  //two parameters:
  //a function that will be executed
  //after a certain time (in milliseconds)
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, wait * 1000); //wait time * 1 second

  console.log(`Will start boarding in ${wait} seconds.`);
};

//const perGroup = 1000; //closure has priority in scope chain
boardPassengers(180, 3);

//callback function in boardPassengers executed completely independently...
//of the boardPassengers function...
//but the setTimout function was able to access all the variables...
//from the variable environment in which it was created
//closure created (setTimeout has "backpack" with n, wait & perGroup in it)

//timer callback function
//setTimeout(function () {
//console.log('TIMER');
//}, 1000);
*/

///////////////////////////////////////////////////////////////////
//CODING CHALLENGE #2

/* 
This is more of a thinking challenge than a coding challenge

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK!!!


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  //select the body, add the event listener of click to the body,
  //have the function change the headers color to blue
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();//IIFE

//callback function has access to header variable from "backpack"/"birthplace"
*/
