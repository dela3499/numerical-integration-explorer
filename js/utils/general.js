var deepCopy = function (x) {
    var target = (x instanceof Array)? [] : {}; // either create a deepcopy of an array or an object
    return $.extend(true,target,x)};

var capitaliseFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);}