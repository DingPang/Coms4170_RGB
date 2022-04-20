// store learning important info:
function quiz_store(id,solution, page){
    console.log("ajaxing user selected "+id + " at quiz/"+ page+", correct answer: "+solution)
    let item = {
        "mode": "select",
        "selection": id,
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
    $(".circleBase").click(function(event) {
        quiz_store($( this ).attr("id"),item["solution"],item["id"])
        $(".circleBase").removeClass("circleWrong")
        $(".circleBase").removeClass("circleRight")
        $('.warning').hide()
        $('.correct').hide()
        let answer = $( this ).attr("id");
        let solution = item["solution"]

        if (answer != solution){
            $(this).addClass("circleWrong")
           // $('.warning').show()
            var next = "/quiz/" + (item["id"]).toString()
            window.setTimeout(function() {
                window.location.href = next;
            }, 500);

        } else {
            $(this).addClass("circleRight")
            $('.correct').show()
            var next = "/quiz/" + (item["id"]).toString()
            window.setTimeout(function() {
                window.location.href = next;
            }, 500);
        }
    });
});
