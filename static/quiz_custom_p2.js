// store learning important info:
let r = 0
let g = 0
let b = 0
let correct = 0

solution = []
function quiz_store(rval, gval, bval,solution, page){
    console.log("ajaxing user entered "+rval + gval+bval+" at quiz/"+ page+", correct answer: "+solution)
    let item = {
        "mode": "enter",
        "selection": [rval,gval,bval],
        "solution": solution,
        "page": page,
    }
    $.ajax({
        type: "POST",
        url: "/quiz/store" ,
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: function (response) {
            console.log("stored sucess")
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function () {
    $("#output").click(function(event){
        console.log(event)
    })    

    $('img').click(function(event) {

        if (!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }

        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        r = pixelData[0]
        g = pixelData[1]
        b = pixelData[2]
        solution = [r,g,b]
        
        $("#circleRow").html('<div class="circleBase" style = "background: rgb('+r+","+g+","+b+');"></div>')  // Code adapted from “How to Check If a Specific Pixel of an Image Is Transparent?” Stack Overflow, 1 Jan. 2012, https://stackoverflow.com/questions/8751020/how-to-check-if-a-specific-pixel-of-an-image-is-transparent. 
        $("#Submit").removeAttr("disabled")


    });

    $('#Submit').click(function(event){
        //$('.warning').hide()
       // $('.correct').hide()

        quiz_store($('#rbox').val(),$('#gbox').val(),$('#bbox').val(), solution,item["id"])

        if (Math.abs($('#rbox').val()-r)<100){
            if (Math.abs($('#gbox').val()-g)<100){
                if (Math.abs($('#bbox').val()-b)<100){
                    var next = "/custom_quiz_" + (item["id"]).toString()
               //     $('.correct').show()

                    window.setTimeout(function() {
                        window.location.href = next;
                    }, 50);
                    correct = 1
                }
            }
        }
        if (correct == 0){
          //  $('.warning').show()
            var next = "/custom_quiz_" + (item["id"]).toString()
            window.setTimeout(function() {
                window.location.href = next;
            }, 50);
        }


    })

});


