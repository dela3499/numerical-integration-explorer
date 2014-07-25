var midpoint = function (a,b,n,func) {
    var evaluations = [];
    var f = function (x) {
        var ret = func(x);
        evaluations.push({x:x,y:ret});
        return ret;
    };    
    var h = (b-a)/(n+2),
        xi1 = 0,
        x,
        xi;
    for (var i = 0; i < n+1; i++) {
        x = a + (i+1)*h;
        if (i % 2 == 0) { // if i is even
            xi1 = xi1 + f(x);
        };
    };
    xi = 2*h * xi1;
    return {i:xi,evals:evaluations};
};      

var a = 0,
    b = Math.PI,
    n = 0,
    f = Math.sin;

var I = midpoint(a,b,n,f);
console.log(['midpoint',I]);