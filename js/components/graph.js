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
                className="graph"
                height={this.props.size}
                width={this.props.size}
            />
        );
    },
    draw: function () {
        var plotData = fitDataToCanvas(this.props.data,this.props.size,this.props.size),
            c = this.getDOMNode().getContext('2d');
        c.clearRect(0,0,this.props.size,this.props.size);
        // Plot each dataset
        for (var i = 0; i < plotData.length; i++) {
            var dataSet = plotData[i];
            c.strokeStyle = dataSet.options.color || "white";
            c.lineWidth = dataSet.options.lineWidth || 1;
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

var data = [
    {x: linspace(0, 5*Math.PI,1000),
     y: [],
     options: {
         color: "white",
         lineWidth: 3}
    },
    {x: linspace(0, 7*Math.PI,1000),
     y: [],
     options: {
         color: "black",
         lineWidth: 3}
    }
]

var myFunc = function (x,params) {
    var A = params.A || 1,
        f = params.f || 1,
        phi = params.phi || 0,
        B = params.B || 0;
    return A * Math.sin(f * x + phi) + B;
};
for (var i = 0; i < data[0].x.length; i++) {
    data[0].y.push(myFunc(data[0].x[i],{}));
};
for (var i = 0; i < data[1].x.length; i++) {
    data[1].y.push(myFunc(data[1].x[i], {A:2,f:0.2,B:0}));
};
React.renderComponent(
    <Graph data={data} size={150}/>,
    document.getElementById("content")
);





























