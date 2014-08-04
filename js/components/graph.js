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
    fitDataToCanvas: function (dataGroup,canvasWidth,canvasHeight, bounds) {
        /* scale and translate data to focus canvas on data range specified in BOUNDS */
        var xmin = bounds[0],
            xmax = bounds[1],
            ymin = bounds[2],
            ymax = bounds[3];
        
        // copy given collection of data sets by value
        var newDataGroup = deepCopy(dataGroup); // dataGroup = [{x:[], y:[], options:{}},...];
        
        // rescale each data set in given group
        for (var i = 0; i < newDataGroup.length; i++) {
            var d = newDataGroup[i];    // d = {x:[], y:[], options:{}};
            d.x = d.x.add(-xmin).scale(canvasWidth / (xmax - xmin));
            d.y = d.y.add(-ymin).scale(canvasWidth / (ymax - ymin)).scale(-1).add(canvasHeight);
        };

        return newDataGroup;

    },    
    draw: function () {
        // rescale to make canvas shows data in bounds
        var plotData = this.fitDataToCanvas(
                this.props.data,
                this.props.size,
                this.props.size,
                this.props.bounds
                );
        
        // Plot each dataset
        for (var i = 0; i < plotData.length; i++) {
            var dataSet = plotData[i];
        
            // initialize line
            var line = new createjs.Shape();
            line.graphics.setStrokeStyle(dataSet.options.lineWidth || 3);
            line.graphics.beginStroke(dataSet.options.color || "white");
            
            // Plot each point in dataset (connected with lines)
            for (var j = 0; j < dataSet.x.length - 1; j++) {
                line.graphics.moveTo(dataSet.x[j], dataSet.y[j]);
                line.graphics.lineTo(dataSet.x[j+1], dataSet.y[j+1]);
            }
            
            // clear canvas and draw new line
            line.graphics.endStroke();
            var stage = this.state.stage;
            stage.removeAllChildren(); // clear previous
            stage.addChild(line); // add new line
            stage.update();
        };
    }           
});























