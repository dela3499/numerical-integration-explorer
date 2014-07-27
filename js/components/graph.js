/** @jsx React.DOM */

var Graph = React.createClass({
    componentDidMount: function () {   
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
                ),
            c = this.getDOMNode().getContext('2d');
        var t = this;
        c.clearRect(0,0,this.props.size,this.props.size);
        // Plot each dataset
        for (var i = 0; i < plotData.length; i++) {
            var dataSet = plotData[i];
            c.strokeStyle = dataSet.options.color || "white";
            c.lineWidth = dataSet.options.lineWidth || 3;
            c.beginPath();
            // Plot each point in dataset (connected with lines)
            for (var j = 0; j < dataSet.x.length - 1; j++) {
                c.moveTo(dataSet.x[j], dataSet.y[j]);
                c.lineTo(dataSet.x[j+1], dataSet.y[j+1]);
            }
            c.closePath();
            c.stroke();
        };
    }           
});




























