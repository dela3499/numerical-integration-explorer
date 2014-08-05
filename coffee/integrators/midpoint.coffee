midpoint = (a,b,n,func) ->
    " Approximate integral to func over range [a,b] with n subintervals "
    
    # n must be even
    if (n % 2 != 0) then throw("midpoint: n must be an even integer")
    
    # Keep track of function calls (they'll be used to visualize the technique)
    evaluations = []
    f = (x) ->
        val = func(x)
        evaluations.push({x: x, y: val})
        val
    
    # prepare variables for computation
    h = (b-a)/(n+2) # step size
    xi1 = 0         # summation (of function values / total 'height' of rectangles)
    
    # sum up midpoint heights
    [0..n].map (i) ->
        x = a + (i + 1) * h
        if (i % 2 == 0) then xi1 += f(x)
    
    I = 2 * h * xi1;  # Integral approximation
    
    {I: I, evals: evaluations}