// Data Structures

// dataGroup = [{x:[], y:[], options:{}},...];
// dataSet = {x:[], y:[], options:{}};

/* To fit dataGroup to canvas:
    1. rescale to bring dataGroup into canvas (with some empty margin as well)
    2. translate datagroup to center of canvas
    3. change coordinates to match canvas: y_canvas = 1 - y
*/

var canvasMargin = 20;
var minYRange = 10;

var fitDataToCanvas = function (dataGroup,canvasWidth,canvasHeight, bounds) {
    var newDataGroup = deepCopy(dataGroup);
    for (var i = 0; i < newDataGroup.length; i++) {
        var d = newDataGroup[i],
            xmin = bounds[0],
            xmax = bounds[1],
            ymin = bounds[2],
            ymax = bounds[3];
        
        d.x = d.x.add(-xmin).scale(canvasWidth / (xmax - xmin));
        d.y = d.y.add(-ymin).scale(canvasWidth / (ymax - ymin)).scale(-1).add(canvasHeight);
//        newDataGroup[i] = d;
    };
    return newDataGroup;
};