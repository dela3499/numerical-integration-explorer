var symbolic = function (theta,params) {
    // Symbolic integral of f(theta) = A sin(f theta + phi) + B from 0 to theta
    var A = params.A,
        f = params.f,
        phi = params.phi,
        B = params.B;
    
    return B * theta - (A*Math.cos(f*theta + phi)/f) + (A*Math.cos(phi))/f;
    