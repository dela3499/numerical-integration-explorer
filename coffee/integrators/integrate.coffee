integrate = (a, b, n, func, method) ->
    " Approximate integral of func in range [a,b] using specified method "
    
    methods = {
        midpoint: midpoint,
        trapezoid: trapezoid,
        simpson: simpson,
        romberg: romberg
    }
    
    methods[method](a, b, n, func)