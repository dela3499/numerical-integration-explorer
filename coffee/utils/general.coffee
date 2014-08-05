deepCopy = (x) ->
    "Copy array or object by value"
    $.extend(true, (if (x instanceof Array) then [] else {}), x)

capitaliseFirstLetter = (string) ->
    "Capitalize the first letter of string"
    string.charAt(0).toUpperCase() + string.slice(1)
    