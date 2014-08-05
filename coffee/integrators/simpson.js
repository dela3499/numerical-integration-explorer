var simpson = function (a,b,n,func) {
    /* approximates integral of func on interval [a,b] with n subintervals */
    
    // n must be even
    if (n % 2 !== 0) {
        throw("simpson: n must be an even integer");
    };
    
    // Keep track of function evaluations for plotting
    var evaluations = [];
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };
    
    
    var h = (b-a)/n,   // step size
        xi1 = 0,       // summation for odd intervals
        xi2 = 0,       // summation for even intervals
        x;             // independent variable
    
    for (var i = 1; i < n; i++) {
        x = a + i*h;
        if (i % 2 == 0) { // if i is even
            xi2 = xi2 + f(x);
        } else {
            xi1 = xi1 + f(x);
        };
    };
    
    var I = h * (f(a) + f(b) + 2*xi2 + 4*xi1) / 3; // integral approximation
    
    return {
        I: I,
        evals: evaluations
    };
    
};
