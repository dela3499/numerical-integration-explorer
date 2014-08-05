/** @jsx React.DOM */;
var App, sinFunc;

sinFunc = function(params, x) {
  var A, B, f, phi;
  A = params.A || 1;
  f = params.f || 1;
  phi = params.phi || 0;
  B = params.B || 0;
  return A * Math.sin(f * x + phi) + B;
};

App = React.createClass({
  " Interactive tool for exploring numeric integration ": " Interactive tool for exploring numeric integration ",
  getInitialState: function() {
    return {
      plotOptions: {
        color: "#2b365c",
        lineWidth: 3
      },
      xRange: 5 * Math.PI,
      params: {
        A: 1,
        f: 1,
        phi: 0,
        B: 0
      },
      text: [],
      textPane: 0,
      cursorInfo: ['none', [0, 0]]
    };
  },
  componentWillMount: function() {
    var t;
    t = this;
    return $.getJSON("http:#127.0.0.1:33901#text/prose.json", function(data) {
      return t.setState({
        text: data
      });
    }).fail(function() {
      return $.getJSON("http:#dela3499.github.io/numerical-integration-explorer/text/prose.json", function(data) {
        return t.setState({
          text: data
        });
      });
    });
  },
  evalSinFunc: function() {
    " evaluate sine function with locally-set parameters, and return plotting object ";
    var data, t, xi, _i, _len, _ref;
    t = this;
    data = {};
    data.x = linspace(0, t.state.xRange, 1000);
    _ref = data.x;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      xi = _ref[_i];
      data.y = sinFunc(t.state.params, xi);
    }
    data.options = t.state.plotOptions;
    return data;
  },
  getIntegralError: function(method) {
    " return error in approximation for given method ";
    var Is, errors, fCounts, func, n, ni, result, t, _i, _len, _ref;
    t = this;
    n = {
      midpoint: arrayRange(0, 140, 2),
      trapezoid: arrayRange(1, 69, 1),
      simpson: arrayRange(2, 70, 2),
      romberg: arrayRange(1, 7, 1)
    };
    Is = [];
    fCounts = [];
    _ref = n[method];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      ni = _ref[_i];
      func = sinFunc.bind(t, t.state.params);
      result = integrate(0, t.state.xRange, ni, func, method);
      Is.push(result.I);
      fCounts.push(result.evals.length);
    }
    errors = t.calcError(Is);
    return {
      x: fCounts,
      y: errors,
      options: {}
    };
  },
  calcError: function(Is) {
    " return logscale relative error ";
    var errors, t;
    t = this;
    return errors = Is.map(function(I) {
      var actualValue, e;
      actualValue = symbolic(t.state.xRange, t.state.params);
      e = Math.abs((actualValue - I) / actualValue);
      return Math.log(e) / Math.log(10);
    });
  },
  handleParamUpdate: function(params) {
    return this.setState({
      params: params
    });
  },
  render: function() {
    var bounds, graphLabels, graphs, size, t;
    bounds = [-5, 75, -10, 4];
    size = 125;
    t = this;
    graphLabels = ['midpoint', 'trapezoid', 'simpson', 'romberg'];
    graphs = graphLabels.map(function(g) {
      var callbacks, data, xCursor;
      callbacks = {
        mousemove: function(pos) {
          return t.setState({
            cursorInfo: [g, pos]
          });
        },
        mouseenter: function(pos) {
          return t.setState({
            cursorInfo: [g, pos]
          });
        },
        mouseleave: function(pos) {
          return t.setState({
            cursorInfo: ['none', [0, 0]]
          });
        },
        click: function(pos) {
          return t.setState({
            cursorInfo: ['none', [0, 0]]
          });
        }
      };
      data = [t.getIntegralError(g)];
      if (t.state.cursorInfo[0] === g) {
        data[0].options.markers = {
          color: 'white',
          size: 1
        };
        data[0].options.color = 'rgba(255, 255, 255, 0)';
        xCursor = t.state.cursorInfo[1][0];
        data.push({
          x: linspace(xCursor, xCursor, 10),
          y: linspace(bounds[2], bounds[3], 10),
          options: {
            color: "black",
            lineWidth: 1
          }
        });
      }
      return (
                <div className="wrapper">
                    <Graph className={g} data={data} size={size} bounds={bounds} callbacks={callbacks}/>
                    <div className="label">{'$' + capitaliseFirstLetter(g) + '$'}</div>
                </div>                
            );
    });
    return (
            <div>
                <div className="explanation-container">
                    <div className="explanation" dangerouslySetInnerHTML={{__html: this.state.text[this.state.textPane]}}></div>
                </div>
                <div className="controls-container">
                    <div className="controls">
                        <div className="f-wrapper">
                            <Graph className="f" data={[this.evalSinFunc()]} size={500} bounds={[-1,5*Math.PI+1,-11,11]}/>
                            <Equation callback={this.handleParamUpdate} />
                        </div>
                        {graphs}
                    </div>
                </div>
            </div>
        );
  }
});

React.renderComponent(<App/>, document.getElementById('content'));
