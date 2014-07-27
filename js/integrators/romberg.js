var romberg = function (a,b,n,func) {
    var evaluations = []
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };
    var h = b - a,
        r = [[],[]],
        x;
    r[0][0] = (h/2)*(f(a) + f(b));
    if (n < 2) {
        return {I: r[0][0], evals: evaluations};
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
        r[0] = r[1].slice(0); // probably going to get some weirdness here
    };
    return {I: r[1][n-1], evals: evaluations};
};

//console.log(romberg(0,Math.PI,6,Math.sin));