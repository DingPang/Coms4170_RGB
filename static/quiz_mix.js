correct = 0
// store learning important info:
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
    $('.warning').hide()
    $('.correct').hide()

    let solution = item["solution"]
    solution = solution.replace("(","[")
    solution = solution.replace(")","]")
    eval("solution = "+solution)

    $('#Submit').click(function(event){
        $('.warning').hide()
        $('.correct').hide()

        quiz_store($('#rbox').val(),$('#gbox').val(),$('#bbox').val(), solution,item["id"])

        if (Math.abs($('#rbox').val()-solution[0])<100){
            if (Math.abs($('#gbox').val()-solution[1])<100){
                if (Math.abs($('#bbox').val()-solution[2])<100){
                    var next = "/quiz/" + (item["id"]).toString()
                    $('.correct').show()
                    window.location.href = next;

                    /*window.setTimeout(function() {
                        window.location.href = next;
                    }, 50);*/
                    correct = 1
                }
            }
        }
        if (correct == 0){
            $('.warning').show()
            var next = "/quiz/" + (item["id"]).toString()
            window.location.href = next;

            /*window.setTimeout(function() {
                window.location.href = next;
            }, 50);*/
        }


    })
});
