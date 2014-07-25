/** @jsx React.DOM */

var round = function (x,n) {
    return Math.floor(x * Math.pow(10,n)) * Math.pow(10,-n);
};

var eqFormat = function (x) {
    return "$" + x + "$";
};

var transform = function (x) {
    /* need parseFloat to ensure toFixed operates on a number
    for some reason, low values of x don't appear as numbers.
    http://stackoverflow.com/questions/14059201/why-does-firebug-say-tofixed-is-not-a-function */
    return parseFloat(x).toFixed(1); 
};



var Equation = React.createClass({
    getInitialState: function() {
        MathJax.Hub.Config({tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}});
        return {active: true,
               params: {A:1,
                       f:2,
                       theta: 3,
                       phi: 4,
                       B: 5}};
    },
    componentDidMount: function (root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]);
    },
    componentDidUpdate: function (props,state,root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]);
    },
    render: function() {
        var t = this;
        var callback = function (key,value) {
            /* deep copy to avoid direct state mutation 
            (http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object)*/
            var state = $.extend(true, {}, t.state);
            state.params[key] = value;
            t.setState(state)
        };
        var A = <Variable 
                value={this.state.params.A}
                limits={[-50,50]} 
                sensitivity={1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "A")}
                />,
            f = <Variable 
                value={this.state.params.f}
                limits={[0,100]} 
                sensitivity={1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "f")}
                />,                  
            phi = <Variable 
                value={this.state.params.phi}
                limits={[0,100]} 
                sensitivity={1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "phi")}
                />,                         
            B = <Variable 
                value={this.state.params.B}
                limits={[0,100]} 
                sensitivity={1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "B")}
                />;                    

        
        var eq = "$Asin(f \theta + \phi) + B$";
        return (
            <div id="equation">
                {A} $sin (${f} $\theta+$ {phi}$)+$ {B};
            </div>
        );
    }
});


React.renderComponent(
    <Equation/>,
    document.getElementById('bananas')
);
    










