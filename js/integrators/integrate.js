var integrate = function (a,b,n,func,method) {
    /* Approximate integral of func in range [a,b] using specified method */
    if (method == "trapezoid") {
        return trapezoid(a,b,n,func);
    } else if (method == "midpoint") {
        return midpoint(a,b,n,func);
    } else if (method == "simpson") {
        return simpson(a,b,n,func);
    } else if (method == "romberg") {
        return romberg(a,b,n,func);
    } else {
        throw("invalid method to integrate");
    };
};