correct = 0

function deltaE(rgbA, rgbB) {
    let labA = rgb2lab(rgbA);
    let labB = rgb2lab(rgbB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  }

  function rgb2lab(rgb){
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  }


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

function get_correct(ans){
    correctAnswers = 0
    easyness_fill = 8
    for (let i = 0; i < ans.length;i++){
        sel = [ans[i]["selection"][0], ans[i]["selection"][1], ans[i]["selection"][2]]
        sol = [ans[i]["solution"][0], ans[i]["solution"][1], ans[i]["solution"][2]]
        if (ans[i]["mode"]==="select") {
            if (ans[i]["selection"]===ans[i]["solution"]) {
                correctAnswers+= 1
            }

        }
        if (ans[i]["mode"]==="enter") {
            if (deltaE(sel, sol)<easyness_fill){
                correctAnswers+= 1
            }

        }

    }
    return correctAnswers
}

function prepop(item){

    let solution = item["solution"]
    solution = solution.replace("(","")
    solution = solution.replace(")","")
    s = solution.split(",")
    min = Math.ceil(1);
    max = Math.floor(3);
    target =  Math.floor(Math.random() * (max - min + 1)) + min;
    if (target == 1){
        $("#rbox").val(s[0]);
        $("#rbox").attr("disabled",true)
    }else if (target == 2){
        $("#gbox").val(s[1]);
        $("#gbox").attr("disabled",true)
    } else{
        $("#bbox").val(s[2]);
        $("#bbox").attr("disabled",true)
    }
}

function displayProgressBar(){
    let questionPercent = parseInt(((parseInt(item["id"]) -1)/10) * 100)
    let outerBody = $("<div style='height: 15px; width: 250px;'></div>").addClass("progress")
    let innerBody = $("<div class='progress-bar' role='progressbar' aria-valuemin='0' aria-valuemax='100'>")
    let percent = questionPercent.toString() + "%"
    $(innerBody).css("width", percent).attr("aria-valuenow", questionPercent)
    $(innerBody).html(percent)
    $(outerBody).append(innerBody)
    $("#progress").append(outerBody)
}

$(document).ready(function () {
    prepop(item)
    displayProgressBar()
    correct = get_correct(ans)
    $('#track').html("Score: "+ correct + "/" + (parseInt(item.id)-1))

    $('.warning').hide()
    $('.correct').hide()

    let solution = item["solution"]
    solution = solution.replace("(","[")
    solution = solution.replace(")","]")
    eval("solution = "+solution)
    console.log(item["id"])
    $('#Submit').click(function(event){
        $('.warning').hide()
        $('.correct').hide()

        quiz_store($('#rbox').val(),$('#gbox').val(),$('#bbox').val(), solution,item["id"])
        var next = "/quiz/" + (item["id"]).toString()
        window.location.href = next;
    })
});
