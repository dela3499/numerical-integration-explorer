var trapezoid = function (a,b,n,func) {
    var evaluations = [];
    
    /* Execute function, and log result */
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };    
    var h = (b-a)/n,
        xi0 = f(a) + f(b),
        xi1 = 0,
        x,
        xi;
    for (var i = 1; i < n; i++) {
        x = a + i*h;
        xi1 = xi1 + f(x);
    };
    xi = h * (xi0 + 2*xi1) / 2;
    return {I:xi, evals:evaluations};
};      
//
//var a = 0,
//    b = Math.PI,
//    n = 400,
//    f = Math.sin;
//
//var I = trapezoid(a,b,n,f);
//console.log(I);