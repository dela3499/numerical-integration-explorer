// Data Structures

// dataGroup = [{x:[], y:[], options:{}},...];
// dataSet = {x:[], y:[], options:{}};

/* To fit dataGroup to canvas:
    1. translate lower-left bound (min x and y for all dataSets) to origin
    2. rescale coordinates to bring upper-right bound to (canvasWidth,canvasHeight)
    3. change coordinates to match canvas: y_canvas = 1 - y
*/

var fitDataToCanvas = function (dataGroup,canvasWidth,canvasHeight) {
    return changeCoordinates(rescale(translateToOrigin(dataGroup),canvasWidth,canvasHeight),canvasHeight);
};

var translateToOrigin =  function (dataGroup) {
    // find lower-left corner of dataset and move to (0,0)
    var xOffset = dataGroup.map(function (dataSet) {return dataSet.x.min()}).min(), // find smallest x value in datasets
        yOffset = dataGroup.map(function (dataSet) {return dataSet.y.min()}).min(); // find smallest y value in datasets   
    var newDataGroup = deepCopy(dataGroup);
    for (var i = 0; i < newDataGroup.length; i++) {
        newDataGroup[i].x = newDataGroup[i].x.add(-xOffset);
        newDataGroup[i].y = newDataGroup[i].y.add(-yOffset);
    };
    return newDataGroup;
};

var rescale = function (dataGroup, canvasWidth, canvasHeight) {
    // rescale x and y to move upper right corner to (1,1)
    var xScale = dataGroup.map(function (dataSet) {return dataSet.x.max()}).max(), // find smallest x value in datasets
        yScale = dataGroup.map(function (dataSet) {return dataSet.y.max()}).max(); // find smallest y value in datasets    
    var newDataGroup = deepCopy(dataGroup);
    for (var i = 0; i < newDataGroup.length; i++) {
        newDataGroup[i].x = newDataGroup[i].x.scale(canvasWidth*0.9/xScale);
        newDataGroup[i].y = newDataGroup[i].y.scale(canvasWidth*0.9/yScale);
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
        