/** @jsx React.DOM */;
var Graph, interp;

interp = function(rawScale, dataScale, rawVal) {
  " linear interpolation to convert rawVal from rawScale to dataScale ";
  return (rawVal / (rawScale[1] - rawScale[0])) * (dataScale[1] - dataScale[0]) + dataScale[0];
};

Graph = React.createClass({
  componentDidMount: function() {
    var canvas, stage;
    canvas = this.getDOMNode();
    stage = new createjs.Stage(canvas);
    this.setState({
      stage: stage
    });
    this.registerCallbacks();
    return this.draw();
  },
  componentDidUpdate: function() {
    return this.draw();
  },
  registerCallbacks: function() {
    " register all the provided callbacks with their associated events ";
    var callbacks, scaleX, scaleY, t;
    t = this;
    scaleX = function(x) {
      return interp([0, t.props.size], t.props.bounds.slice(0, 2), x);
    };
    scaleY = function(x) {
      return interp([0, t.props.size], t.props.bounds.slice(2), x);
    };
    callbacks = [['stagemousemove', 'mousemove'], 'mouseenter', 'mouseleave', 'click'];
    if (t.props.callbacks) {
      return callbacks.map(function(callback) {
        var eventName, propName;
        if (callback instanceof Array) {
          eventName = callback[0];
          propName = callback[1];
        } else {
          eventName = callback;
          propName = callback;
        }
        if (t.props.callbacks[propName]) {
          return t.state.stage.on(eventName, function(e) {
            var pos;
            pos = [scaleX(e.stageX), scaleY(e.stageY)];
            return t.props.callbacks[propName](pos);
          });
        }
      });
    }
  },
  render: function() {
    return (
            <canvas 
                className={"graph " + this.props.className}
                height={this.props.size}
                width={this.props.size}
            />
        );
  },
  fitDataToCanvas: function(dataGroup, canvasWidth, canvasHeight, bounds) {
    " scale and translate data to focus canvas on data range specified in BOUNDS ";
    var dataSet, newDataGroup, xmax, xmin, ymax, ymin, _i, _len;
    xmin = bounds[0], xmax = bounds[1], ymin = bounds[2], ymax = bounds[3];
    newDataGroup = deepCopy(dataGroup);
    for (_i = 0, _len = newDataGroup.length; _i < _len; _i++) {
      dataSet = newDataGroup[_i];
      dataSet.x = dataSet.x.add(-xmin).scale(canvasWidth / (xmax - xmin));
      dataSet.y = dataSet.y.add(-ymin).scale(canvasWidth / (ymax - ymin)).scale(-1).add(canvasHeight);
    }
    return newDataGroup;
  },
  draw: function() {
    var dataSet, line, plotData, stage, _i, _j, _len, _ref, _results, _results1;
    plotData = this.fitDataToCanvas(this.props.data, this.props.size, this.props.size, this.props.bounds);
    stage = this.state.stage;
    stage.removeAllChildren();
    _results = [];
    for (_i = 0, _len = plotData.length; _i < _len; _i++) {
      dataSet = plotData[_i];
      line = new createjs.Shape();
      line.graphics.setStrokeStyle(dataSet.options.lineWidth || 2);
      line.graphics.beginStroke(dataSet.options.color || "white");
      line.graphics.moveTo(dataSet.x[0], dataSet.y[0]);
      (function() {
        _results1 = [];
        for (var _j = 0, _ref = dataSet.x.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
        return _results1;
      }).apply(this).map(function(j) {
        var circle, markerColor, markerRadius;
        line.graphics.lineTo(dataSet.x[j], dataSet.y[j]);
        if (dataSet.options.markers) {
          circle = new createjs.Shape();
          markerColor = dataSet.options.markers.color || 'white';
          markerRadius = dataSet.options.markers.size || 10;
          circle.graphics.beginFill(markerColor).drawCircle(0, 0, markerRadius);
          circle.x = dataSet.x[j];
          circle.y = dataSet.y[j];
          return stage.addChild(circle);
        }
      });
      line.graphics.endStroke();
      stage.addChild(line);
      _results.push(stage.update());
    }
    return _results;
  }
});
