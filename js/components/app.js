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
                        color: "white",
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
        var n = arrayRange(1,50,1);
        var errors = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params);
            errors.push(symbolic(this.state.xRange,this.state.params) - trapezoid(0, this.state.xRange, n[i], func).I);
        };
        return {x:n, y:errors, options:{}};
    },  
    getMidpointData: function () {
        var n = arrayRange(0,50,2);
        var errors = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params);
            errors.push(symbolic(this.state.xRange,this.state.params) - midpoint(0, this.state.xRange, n[i], func).I);
        };
        return {x:n, y:errors, options:{}};
    },      
    
    getSimpsonData: function () {
        var n = arrayRange(2,50,2);
        var errors = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params);
            errors.push(symbolic(this.state.xRange,this.state.params) - simpson(0, this.state.xRange, n[i], func).I);
        };
        return {x:n, y:errors, options:{}};
    },  
    getRombergData: function () {
        var n = arrayRange(1,50,5);
        var errors = [];
        for (var i = 0; i < n.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params);
            errors.push(symbolic(this.state.xRange,this.state.params) - romberg(0, this.state.xRange, n[i], func).I);
        };
        console.log("finished");
        return {x:n, y:errors, options:{}};
    },      
    render: function () {
        var bounds = [-5,55,-20,20];
        return (
            <div>
                <div className="f-wrapper">
                    <Graph className="f" data={[this.state.data]} size={350} bounds={[0,5*Math.PI,-10,10]}/>
                    <Equation numeric={true} callback={this.handleParamUpdate} />
                </div>
                <div className="wrapper">
                    <Graph className="trapezoid" data={[this.getTrapezoidData()]} size={200} bounds={bounds}/>
                    <div className="label">$Trapezoid$</div>
                </div>
                <div className="wrapper">
                    <Graph className="midpoint" data={[this.getMidpointData()]} size={200} bounds={bounds}/>
                    <div className="label">$Midpoint$</div>
                </div>
                <div className="wrapper">
                    <Graph className="simpson" data={[this.getSimpsonData()]} size={200} bounds={bounds}/>
                    <div className="label">$Simpson's$</div>
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