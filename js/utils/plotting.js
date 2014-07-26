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

var fitDataToCanvas = function (dataGroup,canvasWidth,canvasHeight,fixCenter) {
    return changeCoordinates(
        translate(
            rescale(
                dataGroup,canvasWidth,canvasHeight,fixCenter
            ),
            canvasWidth,canvasHeight,fixCenter
        ),
        canvasHeight
    );
};


var rescale = function (dataGroup, canvasWidth, canvasHeight,fixCenter) {
    // rescale x and y to move upper right corner to (1,1)
    var xRange = dataGroup.map(function (dataSet) {return dataSet.x.max() - dataSet.x.min()}).max(); // find smallest x value in datasets
    
    if (fixCenter) {
        yRange = dataGroup.map(function (dataSet) {return Math.max(Math.abs(dataSet.y.max()), Math.abs(dataSet.y.min()))}).max(); // find smallest y value in datasets  
    } else {
        yRange = dataGroup.map(function (dataSet) {return dataSet.y.max() - dataSet.y.min()}).max(); // find smallest y value in datasets    
    };
    var newDataGroup = deepCopy(dataGroup);
    for (var i = 0; i < newDataGroup.length; i++) {
        newDataGroup[i].x = newDataGroup[i].x.scale((canvasWidth - 2*canvasMargin)/xRange);

        if (fixCenter) {
            newDataGroup[i].y = newDataGroup[i].y.scale((canvasHeight - 2*canvasMargin)/(2*Math.max(yRange,minYRange)));
        } else {
            newDataGroup[i].y = newDataGroup[i].y.scale((canvasHeight - 2*canvasMargin)/yRange);
        };
    };    
    return newDataGroup;
};

var translate =  function (dataGroup,canvasWidth,canvasHeight,fixCenter) {
    var xOffset = dataGroup.map(function (dataSet) {return dataSet.x.min()}).min(); // find smallest x value in datasets
    if (fixCenter) {
        yOffset = 0.5 * canvasHeight;
    } else {
        yOffset = dataGroup.map(function (dataSet) {return dataSet.y.min()}).min(); // find smallest y value in datasets   
    };
    var newDataGroup = deepCopy(dataGroup);
    for (var i = 0; i < newDataGroup.length; i++) {
        newDataGroup[i].x = newDataGroup[i].x.add(-xOffset + canvasMargin);
        if (fixCenter) {
            newDataGroup[i].y = newDataGroup[i].y.add(yOffset);
        } else {
            newDataGroup[i].y = newDataGroup[i].y.add(-yOffset + canvasMargin);
        };
    };
    return newDataGroup;
};

var changeCoordinates = function (dataGroup,canvasHeight) {
    
    // change coordinates to canvas frame ( y_canvas = 1 - y )
    var newDataGroup = deepCopy(dataGroup);
    for (var i = 0; i < newDataGroup.length; i++) {
        newDataGroup[i].y = newDataGroup[i].y.scale(-1).add(canvasHeight);
    };        
    return newDataGroup;
};
        