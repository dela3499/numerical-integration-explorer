/** @jsx React.DOM */
        // TODO: move params into App state (or into stores to begin using Flux

var sinFunc = function (params,x) {
        var A   = params.A   || 1,
            f   = params.f   || 1,
            phi = params.phi || 0,
            B   = params.B   || 0;
        return A * Math.sin(f * x + phi) + B;
};

var App = React.createClass({
    /* Interactive tool for exploring numeric integration*/
    
    getInitialState: function () {
        return {
            plotOptions: {
                color: "#2b365c",
                lineWidth: 3
            },
            xRange: 5*Math.PI, // integrals will be evaluated over [0,xRange]
            params: {A:1,f:1,phi:0,B:0}
        };
    },
    evalSinFunc: function () {
    /* evaluate sine function with locally-set parameters, and return plotting object */
        
        var t = this, // ugly, but need to maintain access to state
            data = {};
        
        data.x = linspace(0, t.state.xRange,1000);
        data.y = data.x.map(function (xi) {
            return sinFunc(t.state.params, xi);
        });
        data.options = t.state.plotOptions; // add options object for plotting
        return data;
        
    },
    getIntegral: function (method) {
        var t = this;
        
        // prepare input ranges to produce similar number of function evals
        var n = {midpoint:  arrayRange(0,140,2), // even-only (fCount = n/2 + 1)
                 trapezoid: arrayRange(1,69,1),  // (fCount = n + 1)
                 simpson:   arrayRange(2,70,2),  // even-only (fCount = n + 1)
                 romberg:   arrayRange(1,7,1)};  // (fCount = 2^(n-1) + 1) - yep, this one is totally different
        
        var Is = [], // integral approximations
            fCounts = []; // function evaluation counts
        
        // Find approximations for each value of n
        n[method].map(function(ni) {
            var func = sinFunc.bind(t, t.state.params),
                result = integrate(0,t.state.xRange, ni, func, method);
            
            Is.push(result.I); // collect approximations
            fCounts.push(result.evals.length); // collect # of evals
        });
        
        var errors = t.getError(Is);

        return {
            x: fCounts, 
            y: errors, 
            options: {}
        };
    
    },    
    getError: function (x) {
        /* return logscale relative error */
        
        var t = this;
        var errors = x.map(function (xi) {
            var actualValue = symbolic(t.state.xRange,t.state.params); // compute exact integral
            var e =  Math.abs((actualValue- xi)/actualValue);
            return Math.log(e)/Math.log(10);
        });
        
        return errors;
        
    },
    render: function () {
        var bounds = [-5,75,-10,4], // [xmin,xmax,ymin,ymax]
            size = 125; // canvas size
        return (
            <div>
                <div className="explanation-container">
                    <div className="explanation">
                        <h1>Get a feel for numerical integration!</h1>
                        <p>Play with the function on the right by dragging its parameters up or down. </p> 
                        <p>The smaller plots at the bottom show the error for each of several integration methods. Specifically, they show the log of the relative error vs. the number of function evaluations. 
        </p><p>Take the first plot, for instance. It's showing the error for the Midpoint approximation method. At the beginning, only a single function evaluation is used. As you move right on the graph, more function evaluation are used (so the subinterval width, $h$, decreases) and the error drops off.</p>
            <p>The decline in error is common to all methods, but notice that the rate of decline seems to increase as you move from the Midpoint method to the Romberg method.  </p>
            <p>Is this always the case? Is there some function where the Romberg method isn't the most accurate? </p>
            <p>It turns that there is. Try moving the frequency (the number right after $sin$) to $5$. In this case, Simpson's rule seems more accurate, if only by a bit.</p>
            <p>Feel free to play with the function parameters to gain a feel for which ones affect the integration algorithms the most. (Hint: it's frequency!)</p>
                    </div>
                </div>
                <div className="controls-container">
                    <div className="controls">
                        <div className="f-wrapper">
                            <Graph className="f" data={[this.evalSinFunc()]} size={500} bounds={[-1,5*Math.PI+1,-11,11]}/>
                            <Equation callback={this.handleParamUpdate} />
                        </div>
                        <div className="wrapper">
                            <Graph className="midpoint" data={[this.getIntegral('midpoint')]} size={size} bounds={bounds}/>
                            <div className="label">$Midpoint$</div>
                        </div>            
                        <div className="wrapper">
                            <Graph className="trapezoid" data={[this.getIntegral('trapezoid')]} size={size} bounds={bounds}/>
                            <div className="label">$Trapezoid$</div>
                        </div>
                        <div className="wrapper">
                            <Graph className="simpson" data={[this.getIntegral('simpson')]} size={size} bounds={bounds}/>
                            <div className="label">$Simpson's$</div>
                        </div>
                        <div className="wrapper">
                            <Graph className="romberg" data={[this.getIntegral('romberg')]} size={size} bounds={bounds}/>
                            <div className="label">$Romberg$</div>
                        </div>       
                    </div>
                </div>
            </div>
        );
    },
    handleParamUpdate: function (params) {
        this.setState({params: params});
    }
});
//var flux = new Fluxxor.Flux(stores,actions);
var flux = 1;
React.renderComponent(
    <App flux={flux}/>,
    document.getElementById('content')
);