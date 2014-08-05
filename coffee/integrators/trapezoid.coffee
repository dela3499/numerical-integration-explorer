trapezoid = (a,b,n,func) ->
    " approximates integral of func on interval [a,b] with n subintervals "
    
    # Keep track of function calls (they'll be used to visualize the technique)
    evaluations = []
    f = (x) ->
        val = func(x)
        evaluations.push({x: x, y: val})
        val
    
    h = (b-a)/n # step size
    xi1 = 0     # summation variable
    
    [1..n-1].map (i) ->
        x = a + i * h
        xi1 += f(x)
    
    # integral approximation
    I = h * (f(a) + f(b) + 2 * xi1) / 2 
    
    {I: I, evals: evaluations}