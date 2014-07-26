/** @jsx React.DOM */

var App = React.createClass({
    getInitialState: function () {
        console.log("getInitialState");
        return {data: {
            x:[],
            y:[],
            options:{
                color: "white",
                lineWidth: 5
            }}};
    },
    sinFunc: function (params) {
        var A = params.A || 0,
            f = params.f || 0,
            phi = params.phi || 0,
            B = params.B || 0,
            data = {};
        data.x = linspace(0, 5*Math.PI,1000);
        data.y = data.x.map(function (xi) {
            return A * Math.sin(f * xi + phi) + B;
        });
        return data;
    },
    render: function () {
        return (
            <div>
                <Graph data={[this.state.data]} size={500}/>
                <Equation numeric={true} callback={this.handleParamUpdate} />
            </div>
        );
    },
    handleParamUpdate: function (params) {
        var t = this;
        var state = deepCopy(this.state);
        xyData = this.sinFunc(params);
        console.log(params.f);
        state.data.x = xyData.x;
        state.data.y = xyData.y;
        this.setState(state);
    }
});




//var flux = new Fluxxor.Flux(stores,actions);
var flux = 1;
React.renderComponent(
    <App flux={flux}/>,
    document.getElementById('content')
);