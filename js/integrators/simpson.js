var simpson = function (a,b,n,func) {
    var evaluations = [];
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };    
    var h = (b-a)/n,
        xi0 = f(a) + f(b),
        xi1 = 0,
        xi2 = 0,
        x,
        xi;
    for (var i = 1; i < n; i++) {
        x = a + i*h;
        if (i % 2 == 0) { // if i is even
            xi2 = xi2 + f(x);
        } else {
            xi1 = xi1 + f(x);
        };
    };
    xi = h * (xi0 + 2*xi2 + 4*xi1) / 3;
    return {I:xi,evals:evaluations};
};

var a = 0,
    b = Math.PI,
    n = 400,
    f = Math.sin;

var I = simpson(a,b,n,f);
console.log(I);