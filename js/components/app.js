/** @jsx React.DOM */

var App = React.createClass({
    render: function () {
        return (
            <Equation numeric={true} />
        );
    }
});




//var flux = new Fluxxor.Flux(stores,actions);
var flux = 1;
React.renderComponent(
    <App flux={flux}/>,
    document.getElementById('content')
);
