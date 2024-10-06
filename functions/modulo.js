/*
Integer division in javascript does not work as expected.
In order to fix this, define the following function
ans use it like: 3.mod(5)
*/
Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};
