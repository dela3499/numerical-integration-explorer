var integrate;

integrate = function(a, b, n, func, method) {
  " Approximate integral of func in range [a,b] using specified method ";
  var methods;
  methods = {
    midpoint: midpoint,
    trapezoid: trapezoid,
    simpson: simpson,
    romberg: romberg
  };
  return methods[method](a, b, n, func);
};

var midpoint;

midpoint = function(a, b, n, func) {
  " Approximate integral to func over range [a,b] with n subintervals ";
  var I, evaluations, f, h, xi1, _i, _results;
  if (n % 2 !== 0) {
    throw "midpoint: n must be an even integer";
  }
  evaluations = [];
  f = function(x) {
    var val;
    val = func(x);
    evaluations.push({
      x: x,
      y: val
    });
    return val;
  };
  h = (b - a) / (n + 2);
  xi1 = 0;
  (function() {
    _results = [];
    for (var _i = 0; 0 <= n ? _i <= n : _i >= n; 0 <= n ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).map(function(i) {
    var x;
    x = a + (i + 1) * h;
    if (i % 2 === 0) {
      return xi1 += f(x);
    }
  });
  I = 2 * h * xi1;
  return {
    I: I,
    evals: evaluations
  };
};

var romberg;

romberg = function(a, b, n, func) {
  " approximates integral of func on interval [a,b] with n levels ";
  " (function will be evaluated 2^(n-1) + 1 times) ";
  var evaluations, f, h, r, _i, _results;
  evaluations = [];
  f = function(x) {
    var val;
    val = func(x);
    evaluations.push({
      x: x,
      y: val
    });
    return val;
  };
  h = b - a;
  r = [[], []];
  r[0][0] = (h / 2) * (f(a) + f(b));
  if (n < 2) {
    return {
      I: r[0][0],
      evals: evaluations
    };
  } else {
    (function() {
      _results = [];
      for (var _i = 2; 2 <= n ? _i <= n : _i >= n; 2 <= n ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).map(function(i) {
      var t, _i, _j, _ref, _results, _results1;
      t = 0;
      (function() {
        _results = [];
        for (var _i = 1, _ref = Math.pow(2, i - 2); 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(k) {
        var x;
        x = a + (k - 0.5) * h;
        return t += f(x);
      });
      r[1][0] = 0.5 * (r[0][0] + h * t);
      (function() {
        _results1 = [];
        for (var _j = 2; 2 <= i ? _j <= i : _j >= i; 2 <= i ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this).map(function(j) {
        var y;
        y = (r[1][j - 2] - r[0][j - 2]) / (Math.pow(4, j - 1) - 1);
        return r[1][j - 1] = r[1][j - 2] + y;
      });
      h = h / 2;
      return r[0] = r[1].slice(0);
    });
    return {
      I: r[1][n - 1],
      evals: evaluations
    };
  }
};

var simpson;

simpson = function(a, b, n, func) {
  " approximates integral of func on interval [a,b] with n subintervals ";
  var I, evaluations, f, h, xi1, xi2, _i, _ref, _results;
  if (n % 2 !== 0) {
    throw "simpson: n must be an even integer";
  }
  evaluations = [];
  f = function(x) {
    var val;
    val = func(x);
    evaluations.push({
      x: x,
      y: val
    });
    return val;
  };
  h = (b - a) / n;
  xi1 = 0;
  xi2 = 0;
  (function() {
    _results = [];
    for (var _i = 1, _ref = n - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).map(function(i) {
    var x;
    x = a + i * h;
    if (i % 2 === 0) {
      return xi2 = xi2 + f(x);
    } else {
      return xi1 = xi1 + f(x);
    }
  });
  I = h * (f(a) + f(b) + 2 * xi2 + 4 * xi1) / 3;
  return {
    I: I,
    evals: evaluations
  };
};

var symbolic;

symbolic = function(theta, params) {
  " Symbolic, exact integral of f(theta) = A sin(f theta + phi) + B on interval [0,theta] ";
  var A, B, f, phi;
  A = params.A;
  f = params.f;
  phi = params.phi;
  B = params.B;
  if (f < 1e-5) {
    return B * theta;
  } else {
    return B * theta - (A * Math.cos(f * theta + phi) / f) + (A * Math.cos(phi)) / f;
  }
};

var trapezoid;

trapezoid = function(a, b, n, func) {
  " approximates integral of func on interval [a,b] with n subintervals ";
  var I, evaluations, f, h, xi1, _i, _ref, _results;
  evaluations = [];
  f = function(x) {
    var val;
    val = func(x);
    evaluations.push({
      x: x,
      y: val
    });
    return val;
  };
  h = (b - a) / n;
  xi1 = 0;
  (function() {
    _results = [];
    for (var _i = 1, _ref = n - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).map(function(i) {
    var x;
    x = a + i * h;
    return xi1 += f(x);
  });
  I = h * (f(a) + f(b) + 2 * xi1) / 2;
  return {
    I: I,
    evals: evaluations
  };
};
