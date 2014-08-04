/** @jsx React.DOM */

//TODO: fix equation to replace + with - when subsequent parameter becomes negative.

var App = React.createClass({
    getInitialState: function () {
        var xRange = 5*Math.PI,
            initData = this.evalSinFunc({A:1,f:1,phi:0,B:0},xRange);
        // TODO: move params into App state (or into stores to begin using Flux
        return {data: {
                    x: initData.x,
                    y: initData.y,
                    options:{
                        color: "#2b365c",
                        lineWidth: 3
                        }   
                    },
                xRange: xRange,
                params: {
                    A: 1,
                    f: 1,
                    phi: 0,
                    B: 0
                }
                };
    },
    sinFunc: function (params,x) {
        var A = params.A || 0,
            f = params.f || 0,
            phi = params.phi || 0,
            B = params.B || 0;
        return A * Math.sin(f * x + phi) + B;
    },
    evalSinFunc: function (params,xRange) {
        var t = this,
            data = {},
            xRange = xRange || t.state.xRange;
        data.x = linspace(0, xRange,1000);
        data.y = data.x.map(function (xi) {
            return t.sinFunc(params, xi);
        });
        return data;
    },
    getTrapezoidData: function () {
        var n = arrayRange(1,70,1);
        var Is = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params),
                res = trapezoid(0, this.state.xRange, n[i], func);
            Is.push(res.I);
        };
        var errors = this.getError(Is);
        console.log()
        return {x:n, y:errors, options:{}};
    },  
    getMidpointData: function () {
        var n = arrayRange(0,70,2);
        var Is = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params),
                res = midpoint(0, this.state.xRange, n[i], func);
            Is.push(res.I);
        };
        var errors = this.getError(Is);
        return {x:n, y:errors, options:{}};
    },      
    
    getSimpsonData: function () {
        var n = arrayRange(2,70,2);
        var Is = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params),
                res = simpson(0, this.state.xRange, n[i], func);
            Is.push(res.I);
        };
        var errors = this.getError(Is);
        return {x:n, y:errors, options:{}};
    },  
    getRombergData: function () {
//        var n = arrayRange(1,50,3);
        var n = arrayRange(1,7,1);
        var Is = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params),
                res = romberg(0, this.state.xRange, n[i], func);
            Is.push(res.I);
        };
        var errors = this.getError(Is);
        return {x:[2,3,5,9,17,33,65], y:errors, options:{}};
    },      
    getError: function (x) {
        /* return logscale relative error */
        var errors = [];
        for (var i = 0; i < x.length; i++) {
            var actualValue = symbolic(this.state.xRange,this.state.params);
            var e =  Math.abs((actualValue- x[i])/actualValue);
            errors.push(Math.log(e)/Math.log(10));
        };
        return errors;
    },
    render: function () {
        var bounds = [-5,75,-10,4],
            size = 125;
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
                            <Graph className="f" data={[this.state.data]} size={500} bounds={[-1,5*Math.PI+1,-11,11]}/>
                            <Equation callback={this.handleParamUpdate} />
                        </div>
                        <div className="wrapper">
                            <Graph className="midpoint" data={[this.getMidpointData()]} size={size} bounds={bounds}/>
                            <div className="label">$Midpoint$</div>
                        </div>            
                        <div className="wrapper">
                            <Graph className="trapezoid" data={[this.getTrapezoidData()]} size={size} bounds={bounds}/>
                            <div className="label">$Trapezoid$</div>
                        </div>
                        <div className="wrapper">
                            <Graph className="simpson" data={[this.getSimpsonData()]} size={size} bounds={bounds}/>
                            <div className="label">$Simpson's$</div>
                        </div>
                        <div className="wrapper">
                            <Graph className="romberg" data={[this.getRombergData()]} size={size} bounds={bounds}/>
                            <div className="label">$Romberg$</div>
                        </div>       
                    </div>
                </div>
            </div>
        );
    },
    handleParamUpdate: function (params) {
        var t = this;
        var state = deepCopy(this.state);
        xyData = this.evalSinFunc(params);
        state.data.x = xyData.x;
        state.data.y = xyData.y;
        state.params = params;
        this.setState(state);
    }
});
//var flux = new Fluxxor.Flux(stores,actions);
var flux = 1;
React.renderComponent(
    <App flux={flux}/>,
    document.getElementById('content')
);