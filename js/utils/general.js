var capitaliseFirstLetter, deepCopy;

deepCopy = function(x) {
  "Copy array or object by value";
  return $.extend(true, (x instanceof Array ? [] : {}), x);
};

capitaliseFirstLetter = function(string) {
  "Capitalize the first letter of string";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
