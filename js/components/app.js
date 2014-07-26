/** @jsx React.DOM */

var lineWidth = 5;
var data = [
    {x: linspace(0, 5*Math.PI,1000),
     y: [],
     options: {
         color: "white",
         lineWidth: lineWidth}
    },
    {x: linspace(0, 7*Math.PI,1000),
     y: [],
     options: {
         color: "#097495",
         lineWidth: lineWidth}
    }
]

var myFunc = function (x,params) {
    var A = params.A || 1,
        f = params.f || 1,
        phi = params.phi || 0,
        B = params.B || 0;
    return A * Math.sin(f * x + phi) + B;
};
for (var i = 0; i < data[0].x.length; i++) {
    data[0].y.push(myFunc(data[0].x[i],{}));
};
for (var i = 0; i < data[1].x.length; i++) {
    data[1].y.push(myFunc(data[1].x[i], {A:2,f:0.2,B:1}));
};


var App = React.createClass({
    render: function () {
        return (
            <div>
                <Graph data={data} size={500}/>
                <Equation numeric={true} />
            </div>
        );
    }
});




//var flux = new Fluxxor.Flux(stores,actions);
var flux = 1;
React.renderComponent(
    <App flux={flux}/>,
    document.getElementById('content')
);