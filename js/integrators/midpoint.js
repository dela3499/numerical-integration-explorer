var midpoint = function (a,b,n,func) {    
    
    // n must be even
    if (n % 2 !== 0) {
        throw("midpoint: n must be an even integer");
    };
    
    // Keep track of function calls (they'll be used to visualize the technique)
    var evaluations = [];
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };    
    
    var h = (b-a)/(n+2), // step size
        xi1 = 0,         // summation (of function values / total 'height' of rectangles)
        x;               // independent variable    
    
    for (var i = 0; i < n+1; i++) {
        x = a + (i+1)*h;
        if (i % 2 == 0) {
            xi1 = xi1 + f(x);
        };
    };
    
    var I = 2*h * xi1;  // Integral approximation
    
    return {
        I: I,
        evals: evaluations
    };
    
};