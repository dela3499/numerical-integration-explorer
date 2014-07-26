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
    http://stackoverflow.com/questions/14059201/why-does-firebug-say-tofixed-is-not-a-function 
    ---
    Outer parsefloat required to make output a number.
    */
    return parseFloat(parseFloat(x).toFixed(0)); 
};



var Equation = React.createClass({
    getInitialState: function() {
        MathJax.Hub.Config({messageStyle: "none",tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}});
        return {params: {A:1,
                         f:2,
                         phi: 3,
                         B: 4},
               paramSymbols: {A: "A",
                             f: "f",
                             phi: "\\phi",
                             B: "B"}};
    },
    componentDidMount: function (root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]);
    },
    componentDidUpdate: function (props,state,root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]);
    },
    handleMouseEnter: function () {
//        this.setState({active: true});
    },
    handleMouseLeave: function () {
//        this.setState({active: false});
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
        var getDisplayValue = function (key) {
            return t.props.numeric? t.state.params[key] : t.state.paramSymbols[key];
        };
        var A = <Variable 
                value={getDisplayValue("A")}
                limits={[-50,50]} 
                sensitivity={0.1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "A")}
                />,
            f = <Variable 
                value={getDisplayValue("f")}
                limits={[0,10]} 
                sensitivity={1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "f")}
                />,                  
            phi = <Variable 
                value={getDisplayValue("phi")}
                limits={[-4,4]} 
                sensitivity={1} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "phi")}
                />,                         
            B = <Variable 
                value={getDisplayValue("B")}
                limits={[-5,5]} 
                sensitivity={2} 
                format={eqFormat}
                transformation={transform}
                callback={callback.bind(null, "B")}
                />;
        return (
            <div id="equation" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                $f(\theta)=$ {A} $sin (${f} $\theta+$ {phi}$)+$ {B}
            </div>
        );
    }
});


React.renderComponent(
    <Equation numeric={true}/>,
    document.getElementById('content')
);
    










