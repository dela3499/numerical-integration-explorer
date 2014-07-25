/** @jsx React.DOM */

var Stringify = function (x) {
    return x.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}

var Equation = React.createClass({
    render: function () {
        return (
            <div dangerouslySetInnerHTML={{__html: Stringify((function (){/*
                <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                  <mi>f</mi>
                  <mo stretchy="false">(</mo>
                  <mi>x</mi>
                  <mo stretchy="false">)</mo>
                  <mo>=</mo>
                  <mi>A</mi>
                  <mi>s</mi>
                  <mi>i</mi>
                  <mi>n</mi>
                  <mo stretchy="false">(</mo>
                  <mi>f</mi>
                  <mi>&#x03B8;<!-- θ --></mi>
                  <mo>+</mo>
                  <mi>&#x03D5;<!-- ϕ --></mi>
                  <mo stretchy="false">)</mo>
                  <mo>+</mo>
                  <mi>B</mi>
                </math>
                */}))}}
            />
        );
    }
});


var App = React.createClass ({
    render: function () {
        return (
            <div id="app">
                <Equation A={"A"} B={"B"} f={"f"} theta={"theta"}/>
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


