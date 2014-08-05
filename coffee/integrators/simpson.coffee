simpson = (a,b,n,func) ->
    " approximates integral of func on interval [a,b] with n subintervals "
    
    # n must be even
    if (n % 2 != 0) then throw("simpson: n must be an even integer")
    
    # Keep track of function calls (they'll be used to visualize the technique)
    evaluations = []
    f = (x) ->
        val = func(x)
        evaluations.push({x: x, y: val})
        val
    
    # Prepare for computation
    h = (b-a)/n   # step size
    xi1 = 0       # summation for odd intervals
    xi2 = 0       # summation for even intervals
    
    [1..n-1].map (i) ->
        x = a + i * h
        if (i % 2 == 0) # if i is even
            xi2 = xi2 + f(x)
        else 
            xi1 = xi1 + f(x)
    
    # integral approximation
    I = h * (f(a) + f(b) + 2*xi2 + 4*xi1) / 3 
    
    {I: I, evals: evaluations}