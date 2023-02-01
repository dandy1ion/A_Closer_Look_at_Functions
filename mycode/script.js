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
*/

/////////////////////////////////////////////////////////////////
//FIRST-CLASS and HIGHER-ORDER FUNCTIONS
