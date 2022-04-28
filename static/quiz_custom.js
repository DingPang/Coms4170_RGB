// store learning important info:
function quiz_store(url, page){
    console.log("ajaxing user uploaded "+url + " at quiz/"+ page)
    let item = {
        "url": url,
        "page": page,
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
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
        $("#output").removeAttr("hidden")
        quiz_store(image.src, item["id"])
        if (!($("#output").attr("src") === undefined)){
            $("#labelDiv").append('<button type="button" class="btn btn-success" style="margin-top:5px;" onclick="window.location.href = &#39;/custom_quiz_1&#39;">Continue</button>')
        } // Code adapted from Thapa, Jiwan. “How To Display Uploaded Image In Html Using Javascript ?” Webtrickshome, https://www.webtrickshome.com/forum/how-to-display-uploaded-image-in-html-using-javascript. 
    
    })

    
    
});

