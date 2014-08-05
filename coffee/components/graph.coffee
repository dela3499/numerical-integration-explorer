`/** @jsx React.DOM */`

interp = (rawScale, dataScale, rawVal) ->
    " linear interpolation to convert rawVal from rawScale to dataScale "
    (rawVal / (rawScale[1] - rawScale[0])) * (dataScale[1] - dataScale[0]) + dataScale[0];

Graph = React.createClass({
    componentDidMount: ->
        canvas = this.getDOMNode()
        stage = new createjs.Stage(canvas)
        this.setState({stage:stage}) # provide access for later (avoids having to getDOMNode() on every draw() operation)
        this.registerCallbacks()
        this.draw()
    ,
    componentDidUpdate: ->
        this.draw()
    ,
    registerCallbacks: ->
        " register all the provided callbacks with their associated events "
        
        t = this
        
        # Setup events with provided callbacks
        scaleX = (x) -> interp([0,t.props.size], t.props.bounds.slice(0,2), x)
        scaleY = (x) -> interp([0,t.props.size], t.props.bounds.slice(2), x)
        
        # These are all the supported callbacks
        callbacks = [['stagemousemove','mousemove'],'mouseenter','mouseleave','click']
        
        # start registering callbacks if any were provided
        if t.props.callbacks
            callbacks.map (callback) ->
                
                # create event and prop names (if there's only one, make them the same)
                if (callback instanceof Array)
                    eventName = callback[0]
                    propName = callback[1]
                else
                    eventName = callback
                    propName = callback

                # if callback was provided, register with associated event, and pass [x,y] position as an argument
                if t.props.callbacks[propName]
                    t.state.stage.on(eventName, (e) ->
                        pos = [scaleX(e.stageX),scaleY(e.stageY)] # scaled [x,y] position
                        t.props.callbacks[propName](pos)
                    )
    ,
    render: ->
        `(
            <canvas 
                className={"graph " + this.props.className}
                height={this.props.size}
                width={this.props.size}
            />
        )`
    ,
    fitDataToCanvas: (dataGroup,canvasWidth,canvasHeight, bounds) ->
        " scale and translate data to focus canvas on data range specified in BOUNDS "
        [xmin, xmax, ymin, ymax] = bounds
        
        # copy given collection of data sets by value
        newDataGroup = deepCopy(dataGroup) # dataGroup = [{x:[], y:[], options:{}},...]
        
        # rescale each data set in given group
        for dataSet in newDataGroup # dataSet has this form {x:[], y:[], options:{}}
            dataSet.x = dataSet.x.add(-xmin).scale(canvasWidth / (xmax - xmin))
            dataSet.y = dataSet.y.add(-ymin).scale(canvasWidth / (ymax - ymin)).scale(-1).add(canvasHeight)

        # Return all the rescaled datasets
        newDataGroup

    ,    
    draw: ->
        # Rescale to make canvas shows data in bounds
        plotData = this.fitDataToCanvas(
                this.props.data,
                this.props.size,
                this.props.size,
                this.props.bounds
                )
        
        # Clear canvas
        stage = this.state.stage
        stage.removeAllChildren()
        
        # Plot each dataset
        for dataSet in plotData
        
            # Initialize line
            line = new createjs.Shape()
            line.graphics.setStrokeStyle(dataSet.options.lineWidth || 2)
            line.graphics.beginStroke(dataSet.options.color || "white")
            line.graphics.moveTo(dataSet.x[0], dataSet.y[0])
            
            # Plot each point in dataset
            [0..dataSet.x.length-1].map (j) ->
                
                # Plot lines
                line.graphics.lineTo(dataSet.x[j], dataSet.y[j])
                
                # Plot circle markers
                if dataSet.options.markers
                    circle = new createjs.Shape()
                    markerColor = dataSet.options.markers.color || 'white'
                    markerRadius = dataSet.options.markers.size || 10
                    
                    circle.graphics.beginFill(markerColor).drawCircle(0, 0, markerRadius)
                    circle.x = dataSet.x[j]
                    circle.y = dataSet.y[j]
                    stage.addChild(circle)                       

            # Add shapes to stage
            line.graphics.endStroke()
            stage.addChild(line)
            stage.update()
            
})