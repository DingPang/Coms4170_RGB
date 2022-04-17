$(document).ready(function () {
    $('.warning').hide()
    $('.correct').hide()
    $(".circleBase").click(function(event) {
        $(".circleBase").removeClass("circleWrong")
        $(".circleBase").removeClass("circleRight")
        $('.warning').hide()
        $('.correct').hide()
        let answer = $( this ).attr("id");
        let solution = item["solution"]

        // if (answer != solution){

        //     $( "#dialog" ).dialog({
        //         dialogClass: "no-close",
        //         buttons: [
        //         {
        //             text: "Try Again",
        //             click: function() {
        //             $( this ).dialog( "close" );
        //             }
        //         }
        //         ]
        //     });
        // } else {
        //     let cur = window.location.href
        //     window.setTimeout(function() {
        //         window.location.href = window.location.href;
        //     }, 2000);
        // }

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
