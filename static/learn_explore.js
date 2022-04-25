let ba = 0;
let br = 0;
let bg = 0;

function fill_grad (cv, ctx, r, g, b){
    dim = cv.getBoundingClientRect()
    w = dim["width"]
    inc = w/256
    h = dim["height"]

    for(var i = 0; i <= 255; i++) {
        ctx.beginPath();

        var color = fill_help(r, g, b, i)
        ctx.fillStyle = color;

        ctx.fillRect(i *inc, 0, inc, h);
    }
}

function fill_square (cv, ctx, r, g, b){
    dim = cv.getBoundingClientRect()
    w = dim["width"]
    h = dim["height"]
    var color = fill_help(r, g, b, 0)
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
}

function fill_help(r, g, b, i){
    let res
    if (r == -1 ){
        res = 'rgb(' + i + ', ' + g + ', ' + b+')';
    } else if (g == -1 ){
        res = 'rgb(' + r + ', ' + i + ', ' + b+')';
    } else if (b == -1 ){
        res = 'rgb(' + r + ', ' + g + ', ' + i+')';
    } else{
        res = 'rgb(' + r + ', ' + g + ', ' + b+')';
    }

    return res
}


function fill_2D (cv, ctx, r, g, b,inc){
    // dim = cv.getBoundingClientRect()
    // w = dim["width"]
    // inc = w/256
    // h = dim["height"]
    for(var i = 0; i <= 255; i+=1) {
        for(var j = 0; j <= 255; j+=1) {
            ctx.beginPath();

            var color = fill_2D_help(r, g, b, i, j)
            ctx.fillStyle = color;

            ctx.fillRect(i *inc, j *inc, inc, inc);
        }
    }
}

function fill_2D_help(r, g, b, i, j){
    let res = 'rgb(' + i + ', '  + j + ', ' + b+')';

    return res
}


$(document).ready(function () {
    $("#next").click(function(event) {
        window.location.href = '/learn/' + item["next"]
    });
    var base  = document.getElementById("base");
    let base_ctx = base.getContext('2d');
    var base_color  = document.getElementById("base_color");
    let base_color_ctx = base_color.getContext('2d');

    var two_D  = document.getElementById("2D");
    let two_D_ctx = two_D.getContext('2d');
    var two_D_color  = document.getElementById("2D_color");
    let two_D_color_ctx = two_D_color.getContext('2d');

    fill_grad(base, base_ctx, 0, 0, -1)
    fill_2D(two_D, two_D_ctx, -1, -1, ba, inc)
    fill_square(base_color, base_color_ctx, 0, 0, 0)
    fill_square(two_D_color, two_D_color_ctx, 0, 0, 0)

    dim = two_D.getBoundingClientRect()
    w = dim["width"]
    inc = w/256

    $('#base').mousemove(function(e) {
        var x = e.offsetX,
            y = e.offsetY,
            p = base_ctx.getImageData(x, y, 1, 1),
            x = p.data;
        $( "#base_value" ).html('Base Color Value: rgb(' + x[0] + ', ' + x[1] + ', ' + x[2] + ')')
        fill_square(base_color, base_color_ctx, x[0], x[1], x[2])

        ba = x[2]
        fill_2D(two_D, two_D_ctx, -1, -1, ba, inc)
        $( "#2D_value" ).html(' Result Value: rgb(' +br + ', ' +bg + ', ' + ba + ')')
        fill_square(two_D_color, two_D_color_ctx,br, bg,ba)

    });

    $('#2D').mousemove(function(e) {
        var x = e.offsetX,
            y = e.offsetY,
            p = two_D_ctx.getImageData(x, y, 1, 1),
            x = p.data;
        $( "#2D_value" ).html(' Result Value: rgb(' + x[0] + ', ' + x[1] + ', ' + x[2] + ')')
        br = x[0]
        bg = x[1]
        fill_square(two_D_color, two_D_color_ctx, x[0], x[1], x[2])
    });
});
