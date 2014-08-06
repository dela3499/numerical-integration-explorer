romberg = (a,b,n,func) ->
    " approximates integral of func on interval [a,b] with n levels "
    " (function will be evaluated 2^(n-1) + 1 times) "
    
    # Keep track of function calls (they'll be used to visualize the technique)
    evaluations = []
    f = (x) ->
        val = func(x)
        evaluations.push({x: x, y: val})
        val    
    
    # prepare for computation
    h = b - a    # step size
    r = [[], []]  # rows of approximations
    
    # compute 1-level approximation
    r[0][0] = (h/2)*(f(a) + f(b))
    
    if (n < 2)
        # Return early if only doing a 1-level approximation
        {I: r[0][0], evals: evaluations}
    else
        # Begin multi-level approximation
        [2..n].map (i) ->
            t = 0
            [1..Math.pow(2,i-2)].map (k) ->
                x = a + (k - 0.5) * h
                t += f(x)
            r[1][0] = 0.5 * (r[0][0] + h * t)
            [2..i].map (j) ->
                y = ((r[1][j-2] - r[0][j-2])/(Math.pow(4,j-1) - 1))
                r[1][j-1] = r[1][j-2] + y
            h = h/2
            r[0] = r[1].slice(0) # copy by value instead of reference
            
        # Return normally for multi-level approximations
        {I: r[1][n-1], evals: evaluations}