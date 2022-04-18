// store learning important info:
function learn_store(id, page){
    console.log("ajaxing user selected "+id + " at learn/"+ page)
    let item = {
        "selection": id,
        "page": page,
    }
    $.ajax({
        type: "POST",
        url: "/learn/store" ,
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
        learn_store($( this ).attr("id"), item["id"])
        $(".circleBase").removeClass("circleWrong")
        $(".circleBase").removeClass("circleRight")
        $('.warning').hide()
        $('.correct').hide()
        let answer = $( this ).attr("id");
        let solution = item["solution"]

        if (answer != solution){
            $(this).addClass("circleWrong")
            $('.warning').show()
        } else {
            $(this).addClass("circleRight")
            $('.correct').show()
            var next = "/learn/" + (item["id"]+1).toString()
            window.setTimeout(function() {
                window.location.href = next;
            }, 2000);
        }
    });
});
