/** @jsx React.DOM */;
var Equation, eqFormat, transform;

eqFormat = function(x) {
  " Internally formats the value displayed by the Variable component ";
  return "$ " + (x.toFixed(1)) + " $";
};

transform = function(x) {
  " Internally transforms the value returned by the Variable component ";
  return parseFloat(parseFloat(x).toFixed(1));
};

Equation = React.createClass({
  " display a formula with interactive, draggable parameters ": " display a formula with interactive, draggable parameters ",
  getInitialState: function() {
    MathJax.Hub.Config({
      messageStyle: "none",
      tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']]
      }
    });
    return {
      params: {
        A: 1.0,
        f: 1.0,
        phi: 0.0,
        B: 0.0
      }
    };
  },
  componentDidMount: function(root) {
    return MathJax.Hub.Queue(["Typeset", MathJax.Hub, root]);
  },
  componentDidUpdate: function(props, state, root) {
    return MathJax.Hub.Queue(["Typeset", MathJax.Hub, root]);
  },
  render: function() {
    var callback, config, name, props, t, vars;
    t = this;
    callback = function(key, value) {
      var state;
      state = deepCopy(t.state);
      state.params[key] = value;
      t.props.callback(state.params);
      return t.setState(state);
    };
    config = {
      A: {
        limits: [-5, 5],
        sensitivity: 0.1
      },
      f: {
        limits: [0, 5],
        sensitivity: 0.1
      },
      phi: {
        limits: [-10, 10],
        sensitivity: 0.1
      },
      B: {
        limits: [-5, 5],
        sensitivity: 0.2
      }
    };
    vars = {};
    for (name in config) {
      props = config[name];
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
    }
    return (
            <div className="equation" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                $f(\theta)=$ {vars.A} $sin (${vars.f} $\theta+$ {vars.phi}$)+$ {vars.B}
            </div>
        );
  }
});
