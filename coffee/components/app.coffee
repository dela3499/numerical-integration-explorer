`/** @jsx React.DOM */`

sinFunc = (params,x) ->
        A   = params.A   || 1
        f   = params.f   || 1
        phi = params.phi || 0
        B   = params.B   || 0
        
        A * Math.sin(f * x + phi) + B

App = React.createClass({
    " Interactive tool for exploring numeric integration "
    
    getInitialState: ->
        {
            plotOptions: {
                color: "#2b365c",
                lineWidth: 3
            },
            xRange: 5*Math.PI,          # integrals will be evaluated over [0,xRange]
            params: {A:1,f:1,phi:0,B:0},
            text: [],                   # this gets populated with raw HTML (from markdown) via an AJAX request for JSON
            textPane: 0,                # current text state, since there are multiple pages of explanation
            cursorInfo: ['none', [0,0]] # show which graph is hovered-over, and where cursor is on graph (in [x,y] coordinate)
        }
    ,
    componentWillMount: ->
        t = this
        # Get json (in dev environment)
        $.getJSON("http:#127.0.0.1:33901#text/prose.json", (data) ->
            t.setState({text: data})
        ).fail( ->  
            # Get json (in production environment) This is a hack, but works for now.
            $.getJSON("http:#dela3499.github.io/numerical-integration-explorer/text/prose.json", (data) ->
                t.setState({text: data})
            )
        )
    ,
    evalSinFunc: ->
        " evaluate sine function with locally-set parameters, and return plotting object "
        t = this # ugly, but need to maintain access to state
        data = {}
        
        data.x = linspace(0, t.state.xRange, 1000)
        data.y = sinFunc(t.state.params, xi) for xi in data.x
        data.options = t.state.plotOptions # add options object for plotting
        
        data
        
    ,
    getIntegralError: (method) ->
        " return error in approximation for given method "
        t = this
        
        # prepare input ranges to produce similar number of function evals
        n = {
            midpoint:  arrayRange(0,140,2), # even-only (fCount = n/2 + 1)
            trapezoid: arrayRange(1,69,1),  # (fCount = n + 1)
            simpson:   arrayRange(2,70,2),  # even-only (fCount = n + 1)
            romberg:   arrayRange(1,7,1)  # (fCount = 2^(n-1) + 1) - yep, this one is totally different
        }
        
        Is = [] # integral approximations
        fCounts = [] # function evaluation counts
        
        # Find approximations for each value of n
        for ni in n[method]
            func = sinFunc.bind(t, t.state.params)
            result = integrate(0,t.state.xRange, ni, func, method)
            
            Is.push(result.I) # collect approximations
            fCounts.push(result.evals.length) # collect # of evals
        
        errors = t.calcError(Is)

        {
            x: fCounts, 
            y: errors, 
            options: {}
        }
    
    ,
    calcError: (Is) ->
        " return logscale relative error "
        
        t = this
        errors = Is.map (I) ->
            actualValue = symbolic(t.state.xRange,t.state.params) # compute exact integral
            e =  Math.abs((actualValue - I) / actualValue)
            Math.log(e) / Math.log(10)
            
    ,
    handleParamUpdate: (params) ->
        this.setState({params: params})
    ,
    render: ->
        bounds = [-5,75,-10,4] # [xmin,xmax,ymin,ymax]
        size = 125 # canvas size
        t = this
        
        # Create markup and properties for each graph
        graphLabels = ['midpoint','trapezoid','simpson','romberg']
        graphs = graphLabels.map (g) ->
            callbacks = {
                mousemove: (pos) -> t.setState({cursorInfo: [g, pos]}),
                mouseenter: (pos) -> t.setState({cursorInfo: [g, pos]}),
                mouseleave: (pos) -> t.setState({cursorInfo: ['none', [0,0]]}),
                click: (pos) -> t.setState({cursorInfo: ['none', [0,0]]})
            }
            
            # Get primary data for plotting
            data = [t.getIntegralError(g)]
                
            # Plot a vertical line on graph to indicate cursor position
            if t.state.cursorInfo[0] == g 

                # Plot approximation errors as points
                data[0].options.markers = {color: 'white', size: 1}
                data[0].options.color = 'rgba(255, 255, 255, 0)'

                xCursor = t.state.cursorInfo[1][0]
                data.push({
                    x: linspace(xCursor,xCursor,10),
                    y: linspace(bounds[2],bounds[3],10),
                    options: {
                        color: "black",
                        lineWidth: 1
                    }
                })
                

            # Return markup for each graph
            `(
                <div className="wrapper">
                    <Graph className={g} data={data} size={size} bounds={bounds} callbacks={callbacks}/>
                    <div className="label">{'$' + capitaliseFirstLetter(g) + '$'}</div>
                </div>                
            )`

        # Return markup for entire app
        `(
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
        )`
})

React.renderComponent(
    `<App/>`,
    document.getElementById('content')
)