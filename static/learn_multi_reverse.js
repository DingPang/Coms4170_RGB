function colors(){
    var red= document.getElementById("red").value;
    var green = document.getElementById("green").value;
    var blue = document.getElementById("blue").value;
    temp = 'background: rgb(' + red + ',' + green + ',' + blue + ')'
    $("#Hint_Color").attr("style", temp)
    document.getElementById("output").innerHTML =  'rgb(' + red + ',' + green + ',' + blue + ')' ;
}


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
    $('.warning').hide(0)
    $('.correct').hide(0)
    $('#slider').hide(0)
    $('#next').hide(0)
    $('#ref').hide(0)
    $(".btn").click(function(event) {
        learn_store($( this ).attr("id"), item["id"])
        $('.warning').hide(0)
        $('.correct').hide(0)
        let answer = $( this ).attr("id");
        let solution = item["solution"]

        if (answer != solution){
            $('.warning').show()
            $('#next').hide(0)
            $('#ref_color').attr('style','background: rgb' + answer +";");
            $('#ref').show()
        } else {
            $('.correct').show()
            $('#next').show()
            $('#ref').hide(0)
        }
    });

    $("#next").click(function(event) {
        window.location.href = '/learn/' + item["next"]
    });

    $("#Hint_Color").click(function(event) {
        $('#slider').show(0)
    });
});
