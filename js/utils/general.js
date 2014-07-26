var deepCopy = function (x) {
    var target = (x instanceof Array)? [] : {}; // either create a deepcopy of an array or an object
    return $.extend(true,target,x)};