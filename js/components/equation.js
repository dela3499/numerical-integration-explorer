/** @jsx React.DOM */

var eqFormat = function (x) {
    /* Internally formats the value displayed by the Variable component */
    return "$" + x.toFixed(1) + "$"; // display all parameters with a tenths place and use $ signs so MathJax renders it
};

var transform = function (x) {
    /* Internally transforms the value returned by the Variable component */
    return parseFloat(parseFloat(x).toFixed(1)); // ugly, but makes sure input and output are numbers
};

var Equation = React.createClass({
    /* display a formula with interactive, draggable parameters */
    
    getInitialState: function() {
        MathJax.Hub.Config({messageStyle: "none",tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}}); // initialize MathJax so it'll render equations
        return {params: {A:1.0,
                         f:1.0,
                         phi: 0.0,
                         B: 0.0}
               };
    },
    componentDidMount: function (root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]); // rerender equations
    },
    componentDidUpdate: function (props,state,root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]); // rerender equations
    },
    render: function() {
        var t = this; // maintain access to state and props within functions
        var callback = function (key,value) {
            var state = deepCopy(t.state); // again, need to copy by value rather than reference
            state.params[key] = value;
            t.props.callback(state.params); // update higher-level components, like the graphs
            t.setState(state); // Update local display
        };
        
        // options for Variable component
        var config = {
            A: {
                limits: [-5,5],
                sensitivity: 0.1},
            f: {
                limits: [0,5],
                sensitivity: 0.1},
            phi: {
                limits: [-10,10],
                sensitivity: 0.1},
            B: {
                limits: [-5,5],
                sensitivity: 0.2}
        };
        
        // create Variable components
        var vars = {};
        $.each(config, function(name, props) {
            vars[name] = (
                <Variable 
                    value={t.state.params[name]}
                    limits={props.limits} 
                    sensitivity={props.sensitivity} 
                    format={eqFormat}
                    transformation={transform}
                    callback={callback.bind(null, name)}
                />               
            );
        });
        
        return (
            <div className="equation" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                $f(\theta)=$ {vars.A} $sin (${vars.f} $\theta+$ {vars.phi}$)+$ {vars.B}
            </div>
        );
    }
});

