`/** @jsx React.DOM */`

eqFormat = (x) ->
    " Internally formats the value displayed by the Variable component "
    "$ #{x.toFixed(1)} $" # Dollar signs are for MathJax

transform = (x) ->
    " Internally transforms the value returned by the Variable component "
    parseFloat(parseFloat(x).toFixed(1)) # ugly, but makes sure input and output are numbers

Equation = React.createClass({
    " display a formula with interactive, draggable parameters "
    getInitialState: ->
        MathJax.Hub.Config({messageStyle: "none",tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}}) # initialize MathJax so it'll render equations
        {
            params: {
                A: 1.0,
                f: 1.0,
                phi: 0.0,
                B: 0.0
            }
        }
    ,
    componentDidMount: (root) ->
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]) # rerender equations
    ,
    componentDidUpdate: (props,state,root) ->
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]) # rerender equations
    ,
    render: ->
        t = this # maintain access to state and props within functions
        callback = (key,value) ->
            state = deepCopy(t.state) # again, need to copy by value rather than reference
            state.params[key] = value
            t.props.callback(state.params) # update higher-level components, like the graphs
            t.setState(state) # Update local display

        # options for Variable component
        config = {
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
        }
        
        # create Variable components
        vars = {}
        for name, props of config
            vars[name] = `(
                <Variable 
                    value={t.state.params[name]}
                    limits={props.limits} 
                    sensitivity={props.sensitivity} 
                    format={eqFormat}
                    transformation={transform}
                    callback={callback.bind(null, name)}
                />
            )`
        
        return `(
            <div className="equation" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                $f(\theta)=$ {vars.A} $sin (${vars.f} $\theta+$ {vars.phi}$)+$ {vars.B}
            </div>
        )`
})