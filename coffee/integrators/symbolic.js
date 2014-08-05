var symbolic = function (theta,params) {
    /* Symbolic, exact integral of f(theta) = A sin(f theta + phi) + B on interval [0,theta] */
    
    var A = params.A,      // amplitude
        f = params.f,      // frequency
        phi = params.phi,  // phase angle
        B = params.B;      // DC offset
    
    if (f < 1e-5) {
        return B * theta;  // valid answer, and avoids divide-by-zero
    } else {
        return B * theta - (A*Math.cos(f*theta + phi)/f) + (A*Math.cos(phi))/f;
    };
};
    