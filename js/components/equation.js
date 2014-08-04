/** @jsx React.DOM */

var eqFormat = function (x) {
    return "$" + x.toFixed(1) + "$"; // display all parameters with a tenths place and use $ signs so MathJax renders it
};

var transform = function (x) {
    return parseFloat(parseFloat(x).toFixed(1)); // ugly, but makes sure input and output are numbers
};

var Equation = React.createClass({
    getInitialState: function() {
        MathJax.Hub.Config({messageStyle: "none",tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}});
        return {params: {A:1.0,
                         f:1.0,
                         phi: 0.0,
                         B: 0.0}
               };
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
            var state = deepCopy(t.state); // again, need to copy by value rather than reference
            state.params[key] = value;
            t.props.callback(state.params); // update higher-level components, like the graphs
            t.setState(state); // Update local display
        };
        var getDisplayValue = function (key) {
            return t.state.params[key];
        };
        var A = <Variable 
                value={getDisplayValue("A")}
                limits={[-5,5]} 
                sensitivity={0.1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "A")}
                />,
            f = <Variable 
                value={getDisplayValue("f")}
                limits={[0,5]} 
                sensitivity={0.1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "f")}
                />,                  
            phi = <Variable 
                value={getDisplayValue("phi")}
                limits={[-10,10]} 
                sensitivity={0.1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "phi")}
                />,                         
            B = <Variable 
                value={getDisplayValue("B")}
                limits={[-5,5]} 
                sensitivity={0.2} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "B")}
                />;
        return (
            <div className="equation" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                $f(\theta)=$ {A} $sin (${f} $\theta+$ {phi}$)+$ {B}
            </div>
        );
    }
});










