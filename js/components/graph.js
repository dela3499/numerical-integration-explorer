/** @jsx React.DOM */

var Graph = React.createClass({
    componentDidMount: function () {   
        var canvas = this.getDOMNode(); 
        var stage = new createjs.Stage(canvas);
        this.setState({stage:stage});
        this.draw();
    },
    componentDidUpdate: function () {
        this.draw();
    },      
    render: function () {
        return (
            <canvas 
                className={"graph " + this.props.className}
                height={this.props.size}
                width={this.props.size}
            />
        );
    },
    draw: function () {
        var plotData = fitDataToCanvas(
                this.props.data,
                this.props.size,
                this.props.size,
                this.props.bounds
                );
        // Plot each dataset
        for (var i = 0; i < plotData.length; i++) {
            var dataSet = plotData[i];
            var line = new createjs.Shape();
            line.graphics.setStrokeStyle(dataSet.options.lineWidth || 3);
            line.graphics.beginStroke(dataSet.options.color || "white");
            
            // Plot each point in dataset (connected with lines)
            for (var j = 0; j < dataSet.x.length - 1; j++) {
                line.graphics.moveTo(dataSet.x[j], dataSet.y[j]);
                line.graphics.lineTo(dataSet.x[j+1], dataSet.y[j+1]);
            }
            line.graphics.endStroke();
            var stage = this.state.stage;
            stage.removeAllChildren();
            stage.addChild(line);
            stage.update();
        };
    }           
});























