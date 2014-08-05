var trapezoid = function (a,b,n,func) {
    /* approximates integral of func on interval [a,b] with n subintervals */
    
    // Keep track of function evaluation for plotting
    var evaluations = [];
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };    
    
    var h = (b-a)/n, // step size
        xi1 = 0,     // summation variable
        x;           // independent variable
    
    for (var i = 1; i < n; i++) {
        x = a + i*h;
        xi1 = xi1 + f(x);
    };
    
    var I = h * (f(a) + f(b) + 2*xi1) / 2; // integral approximation
    
    return {
        I: I, 
        evals: evaluations
    };
};      
