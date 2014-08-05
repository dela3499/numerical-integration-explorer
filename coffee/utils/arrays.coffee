Array.prototype.max = ->
    " return largest element in array "
    Math.max.apply( Math, this )

Array.prototype.min = ->
    " return smallest element in array "
    Math.min.apply( Math, this )

Array.prototype.scale = (n) ->
    " multiply every array element by n "
    n * item for item in this

Array.prototype.add = (n) ->
    n + item for item in this

linspace = (start, end, n) ->
    " return array with n regularly-space elements in range [start,end] "
    interval = (end - start) / (n - 1)
    start + interval * i for i in [0..n]

arrayRange = (start, end, interval) ->
    " return array with equally-spaced elements, with none greater than end "
    n = Math.floor((end-start)/interval) + 1
    start + interval * i for i in [0..n]

























