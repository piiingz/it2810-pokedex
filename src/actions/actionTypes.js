//
//  Action types
//

// In redux you use those these constants at least in two places - in your
// reducers and during actions creation. So it's much convenient to
// define a constant once in some file e.g. actionTypes.js
// It allows you to easily find all usages of that constant across
// the project (if you use an IDE). It also prevents you from
// introducing silly bugs caused by typos -- in which case, you will
// get a ReferenceError immediately.

// Since strings are prone to typos and duplicates it’s better to
// have action types declared as constants.

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export const ADD_POKEMON = "ADD_POKEMON";
export const EXAMPLE_YAY = "EXAMPLE_YAY";
export const EXAMPLE_TWO = "EXAMPLE_TWO";