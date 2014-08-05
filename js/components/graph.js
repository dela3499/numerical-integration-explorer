/** @jsx React.DOM */

var interp = function (rawScale, dataScale, rawVal) {
    /* linear interpolation to convert rawVal from rawScale to dataScale */
    
    return (rawVal / (rawScale[1] - rawScale[0])) * (dataScale[1] - dataScale[0]) + dataScale[0];
    
};

var Graph = React.createClass({
    componentDidMount: function () {   
        var canvas = this.getDOMNode(); 
        var stage = new createjs.Stage(canvas);
        this.setState({stage:stage}); // provide access for later (avoids having to getDOMNode() on every draw() operation)
        this.registerCallbacks();
        this.draw();
    },
    componentDidUpdate: function () {
        this.draw();
    },      
    registerCallbacks: function () {
        /* register all the provided callbacks with their associated events */
        
        var t = this;
        
        // Setup events with provided callbacks
        var scaleX = function (x) {return interp([0,t.props.size], t.props.bounds.slice(0,2), x);};
        var scaleY = function (x) {return interp([0,t.props.size], t.props.bounds.slice(2), x);};
        
        // These are all the supported callbacks
        var callbacks = [['stagemousemove','mousemove'],'mouseenter','mouseleave','click'];
        
        // start registering callbacks if any were provided
        if (t.props.callbacks) {
            callbacks.map(function (callback) {
                
                // create event and prop names (if there's only one, make them the same)
                if (callback instanceof Array) {
                    var eventName = callback[0],
                        propName = callback[1];
                } else {
                    var eventName = callback,
                        propName = callback;
                };

                // if callback was provided, register with associated event, and pass [x,y] position as an argument
                if (t.props.callbacks[propName]) {
                    
                    t.state.stage.on(eventName, function (e) {
                        var pos = [scaleX(e.stageX),scaleY(e.stageY)]; // scaled [x,y] position
                        t.props.callbacks[propName](pos);
                    });
                    
                };

            });
        };
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
        // Rescale to make canvas shows data in bounds
        var plotData = this.fitDataToCanvas(
                this.props.data,
                this.props.size,
                this.props.size,
                this.props.bounds
                ); 
        
        // Clear canvas
        var stage = this.state.stage;
        stage.removeAllChildren();
        
        // Plot each dataset
        for (var i = 0; i < plotData.length; i++) {
            var dataSet = plotData[i];
        
            // Initialize line
            var line = new createjs.Shape();
            line.graphics.setStrokeStyle(dataSet.options.lineWidth || 2);
            line.graphics.beginStroke(dataSet.options.color || "white");
            line.graphics.moveTo(dataSet.x[0], dataSet.y[0]);
            
            // Plot each point in dataset
            for (var j = 0; j < dataSet.x.length; j++) {
                
                // Plot lines
                line.graphics.lineTo(dataSet.x[j], dataSet.y[j]);
                
                // Plot circle markers
                if (dataSet.options.markers) {
                    var circle = new createjs.Shape(),
                        markerColor = dataSet.options.markers.color || 'white',
                        markerRadius = dataSet.options.markers.size || 10;
                    
                    circle.graphics.beginFill(markerColor).drawCircle(0, 0, markerRadius);
                    circle.x = dataSet.x[j];
                    circle.y = dataSet.y[j];
                    stage.addChild(circle);                       
                };
            
            };

            // Add shapes to stage
            line.graphics.endStroke();
            stage.addChild(line);
            stage.update();
        };
    }           
});