#Get a feel for numerical integration!
Play with the function on the right by dragging its parameters up or down.

The smaller plots at the bottom show the error for each of several integration methods. Specifically, they show the log of the relative error vs. the number of function evaluations. 
        
Take the first plot, for instance. It's showing the error for the Midpoint approximation method. At the beginning, only a single function evaluation is used. As you move right on the graph, more function evaluations are used (so the subinterval width, $h$, decreases) and the error drops off.

The decline in error is common to all methods, but notice that the rate of decline seems to increase as you move from the Midpoint method to the Romberg method.  
            
Is this always the case? Is there some function where the Romberg method isn't the most accurate?

It turns that there is. Try moving the frequency (the number right after $sin$) to $5$. In this case, Simpson's rule seems more accurate, if only by a bit.

Feel free to play with the function parameters to gain a feel for which ones affect the integration algorithms the most. (Hint: it's frequency!)