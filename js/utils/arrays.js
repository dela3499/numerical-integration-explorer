Array.prototype.max = function(){
    return Math.max.apply( Math, this );
};
 
Array.prototype.min = function(){
    return Math.min.apply( Math, this );
};

Array.prototype.scale = function (s) {
    var newX = [];
    for (var i=0; i < this.length; i++) {
        newX.push(this[i]*s);
    };
    return newX;
};

Array.prototype.add = function (a) {
    var newX = [];
    for (var i = 0; i < this.length; i++) {
        newX.push(this[i] + a);
    };
    return newX;
};


var linspace = function (start,end,n) {
    // return array with n regularly-space elements, starting with start and ending with end.
    var interval = (end - start) / (n - 1);
    var x = [];
    for (var i = 0; i < n; i++) {
        x.push(start + interval * i);
    };
    return x;
};


var centerAndScale = function (x,y,sideLength,percentage) {
    var innerSideLength = sideLength * percentage,
        xRange = x.max() - x.min(),
        yRange = y.max() - y.min(),
        range = Math.max(xRange,yRange),
        scaleFactor = innerSideLength / range,
        scaledX = scaleArray(x,scaleFactor),
        scaledY = scaleArray(y,scaleFactor);
    return {x:scaledX,y:scaledY};
};
























