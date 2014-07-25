/** @jsx React.DOM */

var round = function (x,n) {
    return Math.floor(x * Math.pow(10,n)) * Math.pow(10,-n);
};

var eqFormat = function (x) {
    return "$" + x.toFixed(1) + "$";
};

var Equation = React.createClass({
    getInitialState: function() {
        MathJax.Hub.Config({tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}});
        return {active: true};
    },
    componentDidMount: function (root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]);
    },
    componentDidUpdate: function (props,state,root) {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,root]);
    },
    render: function() {
        var t = this;
        var A = <Variable 
                init={15} 
                limits={[0,100]} 
                dragRange={700} 
                format={eqFormat}
                callback={function (x) {t.setState({params: {A: x}})}}
                />,
            f = <Variable 
                init={15} 
                limits={[0,100]} 
                dragRange={700} 
                format={eqFormat}
                callback={function (x) {t.setState({params: {f: x}})}}
                />,
            theta = <Variable 
                init={15} 
                limits={[0,100]} 
                dragRange={700} 
                format={eqFormat}
                callback={function (x) {t.setState({params: {theta: x}})}}
                />,                         
            phi = <Variable 
                init={15} 
                limits={[0,100]} 
                dragRange={700} 
                format={eqFormat}
                callback={function (x) {t.setState({params: {phi: x}})}}
                />,                         
            B = <Variable 
                init={15} 
                limits={[0,100]} 
                dragRange={700} 
                format={eqFormat}
                callback={function (x) {t.setState({params: {B: x}})}}
                />;                    

        
        var eq = "$Asin(f \theta + \phi) + B$";
        var eqInteractive = (A + "$sin($" + f + theta + "$+$" + phi + "$) + $" + B);
//            {A} + "$ sin( $" + {f} + {theta} + "$+$" + {phi} + "$) + $" + {B};
        return (
            <div id="equation">
            {A} $sin(${f} {theta}$+${phi}$)+${B};
            </div>
        );
    }
});


React.renderComponent(
    <Equation/>,
    document.getElementById('bananas')
);
    










