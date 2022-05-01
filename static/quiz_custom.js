// store learning important info:
let difficulty = "easy"
function quiz_store(url, page,difficulty){
    console.log("ajaxing user uploaded "+url + " at quiz/"+ page+" difficulty: "+difficulty)
    let item = {
        "url": url,
        "page": page,
        "difficulty": difficulty,
    }
    $.ajax({
        type: "POST",
        url: "/custum_quiz/store_image" ,
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
    $("#file").change(function(event) {
        $("#nextButton").remove()
        $("select").remove()

        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
        $("#output").removeAttr("hidden")
        quiz_store(image.src, item["id"], difficulty)
        if (!($("#output").attr("src") === undefined)){
            $("#nextDiv").append('<button id = "nextButton" type="button" class="btn btn-success" style="margin-top:5px;" onclick="window.location.href = &#39;/custom_quiz_1&#39;">Continue</button>')
        } // Code adapted from Thapa, Jiwan. “How To Display Uploaded Image In Html Using Javascript ?” Webtrickshome, https://www.webtrickshome.com/forum/how-to-display-uploaded-image-in-html-using-javascript. 
        $("#easyDiv").append("<select class='form-select form-select-med select-btn'><option selected value='easy'>Easy</option><option value='medium'>Medium</option><option value='hard'>Hard</option></select>")
        $("select").change(function() {
            $( "select option:selected" ).each(function() {
                difficulty = $(this).val()
            });
            quiz_store(image.src, item["id"], difficulty)
        })
    })


    
});

