var romberg = function (a,b,n,func) {
    /* approximates integral of func on interval [a,b] with n levels
       function will be evaluated 2^(n-1) + 1 times */
    
    // Keep track of function evaluation (for plotting)
    var evaluations = []
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };
    
    var h = b - a,    // step size
        r = [[],[]],  // rows of approximations
        x;            // independent variable
    
    r[0][0] = (h/2)*(f(a) + f(b));
    
    // Return early if only doing a 1-level approximation
    if (n < 2) {
        return {
            I: r[0][0], 
            evals: evaluations
        };
    };
    
    for (var i = 2; i < n + 1; i++) {
        var t = 0;
        for (var k = 1; k < Math.pow(2,i-2) + 1; k++) {
            x = a + (k - 0.5) * h;
            t = t + f(x);
        };
        r[1][0] = 0.5 * (r[0][0] + h * t);
        for (var j = 2; j < i + 1; j++) {
            var y = ((r[1][j-2] - r[0][j-2])/(Math.pow(4,j-1) -1));
            r[1][j-1] = r[1][j-2] + y;
        };
        h = h/2;
        r[0] = r[1].slice(0); // copy by value instead of reference
    };
    
    return {
        I: r[1][n-1], // final approximation
        evals: evaluations
    };
    
};