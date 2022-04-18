import {learn_store} from '/utils.js';
function insert_dialog(RGB, parent) {
    let rgb = RGB.split(',')
    var r = rgb[0].substring(1)
    var g = rgb[1]
    var b = rgb[2].slice(0, -1)

    let res = $("<div class='container'></div>")

    var plus1 = $("<span>&#43;</span>")
    var plus2 = $("<span>&#43;</span>")
    var R = $("<div class= 'circleBase' style = 'background: rgb("+r +", 0, 0)'>("+r +", 0, 0)</div>")
    var G = $("<div class= 'circleBase' style = 'background: rgb(0, "+g +", 0)'>(0,"+ g +", 0)</div>")
    var B = $("<div class= 'circleBase' style = 'background: rgb(0, 0, "+b +")'>(0, 0, "+b +")</div>")
    var P = $("<div class= 'circleBase' style = '"+parent+"'>"+ RGB +"</div>")
    var equal = $("<span>&#61;</span>")
    res.append(P)
    res.append(equal)
    res.append(R)
    res.append(plus1)
    res.append(G)
    res.append(plus2)
    res.append(B)
    $( "#dialog" ).html(res)

}
function insert_Hint() {
    let res = $("<img src='"+item["image"]+"' alt='RGB Mixing Color Wheels'>")
    $( "#hint_dialog" ).html(res)

}



$(document).ready(function () {
    $('.warning').hide()
    $('.correct').hide()
    $(".hint").click(function(event) {
        if ($("#dialog").hasClass('ui-dialog-content') && $("#dialog").dialog("isOpen")) {
            $("#dialog").dialog( "close" );
        }
        insert_Hint()
        $("#hint_dialog").dialog({
            dialogClass: "no-close",
            buttons: [
            {
                text: "Close",
                click: function() {
                $(this).dialog( "close" );
                }
            }
            ]
        });
    });
    $(".circleBase").click(function(event) {
        $(".circleBase").removeClass("circleWrong")
        $(".circleBase").removeClass("circleRight")
        if ($("#hint_dialog").hasClass('ui-dialog-content') && $("#hint_dialog").dialog("isOpen")) {
            $("#hint_dialog").dialog( "close" );
        }
        let answer = $( this ).attr("id");
        let solution = item["solution"]
        if (answer != solution){
            $('.warning').show()
            insert_dialog(answer, $(this).attr("style"))
            $(this).addClass("circleWrong")
            $( "#dialog" ).dialog({
                dialogClass: "no-close",
                buttons: [
                {
                    text: "Try Again",
                    click: function() {
                    $( this ).dialog( "close" );
                    }
                }
                ]
            });
        } else {
            if ($("#dialog").hasClass('ui-dialog-content') && $("#dialog").dialog("isOpen")) {
                $("#dialog").dialog( "close" );
            }
            $(this).addClass("circleRight")
            $('.correct').show()
            var next = "/learn/" + (item["id"]+1).toString()
            window.setTimeout(function() {
                window.location.href = next;
            }, 2000);
        }
    });
});
