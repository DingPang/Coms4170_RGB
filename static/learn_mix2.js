let ba = 0;
let sec = 0;

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


function fill_2D (cv, ctx, r, g, b){
    dim = cv.getBoundingClientRect()
    w = dim["width"]
    inc = w/256
    h = dim["height"]

    for(var i = 0; i <= 255; i++) {
        for(var j = 0; j <= 255; j++) {
            ctx.beginPath();

            var color = fill_2D_help(r, g, b, i, j)
            ctx.fillStyle = color;

            ctx.fillRect(i *inc, w-j *inc, inc, inc);
        }
    }
}

function fill_2D_help(r, g, b, i, j){
    let res;
    if (r == -1 && g == -1){
        res = 'rgb(' + i + ', '  + j + ', ' + b+')';
    }else if (r == -1 && b == -1){
        res = 'rgb(' + i + ', ' + g + ', ' + j+')';
    } else{
        res = 'rgb(' + r + ', ' + i + ', ' + j+')';
    }

    return res
}


$(document).ready(function () {
    $("#next").click(function(event) {
        window.location.href = '/learn/' + item["next"]
    });
    let first = item["base"]
    let Second = item["Add"]

    var base  = document.getElementById("base");
    let base_ctx = base.getContext('2d');
    var base_color  = document.getElementById("base_color");
    let base_color_ctx = base_color.getContext('2d');

    if (first == "Red"){
        fill_grad(base, base_ctx, -1, 0, 0)
    }else if (first == "Green"){
        fill_grad(base, base_ctx, 0, -1, 0)
    }

    var Add  = document.getElementById("Add");
    let Add_ctx = Add.getContext('2d');
    var Add_color  = document.getElementById("Add_color");
    let Add_color_ctx = Add_color.getContext('2d');

    fill_grad(Add, Add_ctx, 0, 0, 0)
    fill_square(base_color, base_color_ctx, 0, 0, 0)
    fill_square(Add_color, Add_color_ctx, 0, 0, 0)

    $('#base').mousemove(function(e) {
        var x = e.offsetX,
            y = e.offsetY,
            p = base_ctx.getImageData(x, y, 1, 1),
            x = p.data;
        $( "#base_value" ).html('Base Color Value: rgb(' + x[0] + ', ' + x[1] + ', ' + x[2] + ')')
        fill_square(base_color, base_color_ctx, x[0], x[1], x[2])

        if (Second == "Blue" && first == "Red"){
            ba = x[0]
            fill_grad(Add, Add_ctx, ba, 0, -1)
            $( "#Add_value" ).html('Add Color Value: rgb(' + ba + ', ' + x[1] + ', ' + sec + ')')
            fill_square(Add_color, Add_color_ctx, ba, x[1], sec)
        }else if (Second == "Green"){
            ba = x[0]
            fill_grad(Add, Add_ctx, ba, -1, 0)
            $( "#Add_value" ).html('Add Color Value: rgb(' + ba + ', ' + sec + ', ' + x[2] + ')')
            fill_square(Add_color, Add_color_ctx, ba, sec, x[2])
        } else{
            ba = x[1]
            fill_grad(Add, Add_ctx, 0, ba, -1)
            $( "#Add_value" ).html('Add Color Value: rgb(' + x[0] + ', ' + ba + ', ' +sec + ')')
            fill_square(Add_color, Add_color_ctx, x[0], ba, sec)
        }
    });

    $('#Add').mousemove(function(e) {
        var x = e.offsetX,
            y = e.offsetY,
            p = Add_ctx.getImageData(x, y, 1, 1),
            x = p.data;

        if (Second == "Blue" && first == "Red"){
            sec = x[2]
            $( "#Add_value" ).html('Add Color Value: rgb(' + ba + ', ' + x[1] + ', ' + sec + ')')
        }else if (Second == "Green"){
            sec = x[1]
            $( "#Add_value" ).html('Add Color Value: rgb(' + ba + ', ' + sec + ', ' + x[2] + ')')
        } else{
            sec = x[0]
            $( "#Add_value" ).html('Add Color Value: rgb(' + x[0] + ', ' + ba + ', ' +sec + ')')
        }
        fill_square(Add_color, Add_color_ctx, x[0], x[1], x[2])

    });

    var two_D  = document.getElementById("2D");
    let two_D_ctx = two_D.getContext('2d');
    var two_D_color  = document.getElementById("2D_color");
    let two_D_color_ctx = two_D_color.getContext('2d');

    if (Second == "Blue" && first == "Red"){
        fill_2D(two_D, two_D_ctx, -1, 0, -1)
    }else if (Second == "Green"){
        fill_2D(two_D, two_D_ctx, -1, -1, 0)
    } else{
        fill_2D(two_D, two_D_ctx, 0, -1, -1)
    }

    $('#2D').mousemove(function(e) {
        var x = e.offsetX,
            y = e.offsetY,
            p = two_D_ctx.getImageData(x, y, 1, 1),
            x = p.data;
        $( "#2D_value" ).html(' Result Value: rgb(' + x[0] + ', ' + x[1] + ', ' + x[2] + ')')
        fill_square(two_D_color, two_D_color_ctx, x[0], x[1], x[2])
    });
});
