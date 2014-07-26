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
        var I = [];
//        xVals = this.state.data.x;
        xVals = linspace(0,this.state.xRange,100);
        for (var i = 0; i < xVals.length; i++) {
            var func = this.sinFunc.bind(this,this.state.params);
            I.push(trapezoid(xVals[0], xVals[i], 10, func).I);
        };
        console.log(["trap", xVals, I]);
        return {x:xVals,y:I,options:{}};
    },  
    render: function () {
        return (
            <div>
                <Graph data={[this.state.data]} size={200} fixCenter={true}/>
                <Graph data={[this.getTrapezoidData()]} size={200}/>
                <Equation numeric={true} callback={this.handleParamUpdate} />
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