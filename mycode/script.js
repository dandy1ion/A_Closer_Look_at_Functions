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
        What is your favourite programming language?
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

const poll = {
  question: 'What is your favourite programming language?',
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
    //What is your favourite programming language?
    //    0: JavaScript
    //    1: Python
    //    2: Rust
    //    3: C++
    //    (Write option number)
    console.log(answer);

    //Register Answer
  },
};
