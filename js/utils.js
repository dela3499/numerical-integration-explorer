var arrayRange, linspace;

Array.prototype.max = function() {
  " return largest element in array ";
  return Math.max.apply(Math, this);
};

Array.prototype.min = function() {
  " return smallest element in array ";
  return Math.min.apply(Math, this);
};

Array.prototype.scale = function(n) {
  " multiply every array element by n ";
  var item, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    item = this[_i];
    _results.push(n * item);
  }
  return _results;
};

Array.prototype.add = function(n) {
  var item, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    item = this[_i];
    _results.push(n + item);
  }
  return _results;
};

linspace = function(start, end, n) {
  " return array with n regularly-space elements in range [start,end] ";
  var i, interval, _i, _ref, _results;
  interval = (end - start) / (n - 1);
  _results = [];
  for (i = _i = 0, _ref = n - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
    _results.push(start + interval * i);
  }
  return _results;
};

arrayRange = function(start, end, interval) {
  " return array with equally-spaced elements, with none greater than end ";
  var x, _i, _results;
  _results = [];
  for (x = _i = start; interval > 0 ? _i <= end : _i >= end; x = _i += interval) {
    _results.push(x);
  }
  return _results;
};

var capitaliseFirstLetter, deepCopy;

deepCopy = function(x) {
  "Copy array or object by value";
  return $.extend(true, (x instanceof Array ? [] : {}), x);
};

capitaliseFirstLetter = function(string) {
  "Capitalize the first letter of string";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
