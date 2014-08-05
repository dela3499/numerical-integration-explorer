var arrayRange, centerAndScale, linspace;

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
  var i, interval, _i, _results;
  interval = (end - start) / (n - 1);
  _results = [];
  for (i = _i = 0; 0 <= n ? _i <= n : _i >= n; i = 0 <= n ? ++_i : --_i) {
    _results.push(start + interval * i);
  }
  return _results;
};

centerAndScale = function(x, y, sideLength, percentage) {
  var innerSideLength, range, scaleFactor, scaledX, scaledY, xRange, yRange;
  innerSideLength = sideLength * percentage;
  xRange = x.max() - x.min();
  yRange = y.max() - y.min();
  range = Math.max(xRange, yRange);
  scaleFactor = innerSideLength / range;
  scaledX = scaleArray(x, scaleFactor);
  scaledY = scaleArray(y, scaleFactor);
  return {
    x: scaledX,
    y: scaledY
  };
};

arrayRange = function(start, end, interval) {
  " return array with equally-spaced elements, with none greater than end ";
  var i, n, _i, _results;
  n = Math.floor((end - start) / interval) + 1;
  _results = [];
  for (i = _i = 0; 0 <= n ? _i <= n : _i >= n; i = 0 <= n ? ++_i : --_i) {
    _results.push(start + interval * i);
  }
  return _results;
};
