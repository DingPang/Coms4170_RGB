endMemes = {"all" : "https://www.memesmonkey.com/images/memesmonkey/be/be0b91678dfeff262973d20981434b51.jpeg",
            "most" : "https://i.imgflip.com/1qlznu.jpg",
            "some" : "https://memegenerator.net/img/instances/67730265.jpg",
            "none" : "https://i.imgflip.com/23ks14.jpg"}

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
  function get_correct(ans){
    correctAnswers = []
    easyness_fill = 8
    for (let i = 0; i < ans.length;i++){
        sel = [ans[i]["selection"][0], ans[i]["selection"][1], ans[i]["selection"][2]]
        sol = [ans[i]["solution"][0], ans[i]["solution"][1], ans[i]["solution"][2]]
        if (ans[i]["mode"]==="select") {
            if (ans[i]["selection"]===ans[i]["solution"]) {
                correctAnswers.push(1)
            }else{
                correctAnswers.push(0)
            }

        }
        if (ans[i]["mode"]==="enter") {
            if (deltaE(sel, sol)<easyness_fill){
                correctAnswers.push(1)
            }else{
                correctAnswers.push(0)
            }
        }

    }
    return correctAnswers
}

function detailedResult(correctAnswers, quiz){
    let basic_total = 0
    let rg_total = 0
    let rb_total = 0
    let gb_total = 0
    let rgb_total = 0
    let basic_correct = 0
    let rg_correct = 0
    let rb_correct = 0
    let gb_correct = 0
    let rgb_correct = 0

    for (let i = 0; i < quiz.length;i++){
        cat = quiz[i]["type"]
        if (cat == 1){
            basic_total +=1
            if (correctAnswers[i] == 1){
                basic_correct +=1
            }
        }else if (cat == 2){
            rg_total += 1
            if (correctAnswers[i] == 1){
                rg_correct +=1
            }
        }else if (cat == 3){
            rb_total += 1
            if (correctAnswers[i] == 1){
                rb_correct +=1
            }
        }else if (cat == 4){
            gb_total += 1
            if (correctAnswers[i] == 1){
                gb_correct +=1
            }
        }else if (cat == 5){
            rgb_total += 1
            if (correctAnswers[i] == 1){
                rgb_correct +=1
            }
        }
    }
    $("#result_basic").html(basic_correct+"/" +basic_total)
    $("#result_rg").html(rg_correct+"/" +rg_total)
    $("#result_rb").html(rb_correct+"/" +rb_total)
    $("#result_gb").html(gb_correct+"/" +gb_total)
    $("#result_rgb").html(rgb_correct+"/" +rgb_total)
}

$(document).ready(function(){
    $(".quiz-page").empty()

    let corrects = 0
    let correctAnswers = get_correct(ans)
    let Answers = ans.length
    correctAnswers.forEach(e => {
        corrects+=e
    });

    detailedResult(correctAnswers, quiz)
    loadEndPage(corrects,Answers)

    $(".again-btn").click(function(){
        window.location.href = '/quiz'
    })


})


function loadEndPage(correctAnswers,Answers){

    let score = $("<div>Score: "+correctAnswers+"/"+Answers+"</div>")
    $(".quiz-page").append(score)

    let image = $("<img>").addClass("meme")
    if (Answers==0){
        $(image).attr("src", endMemes["none"])
    } else if (correctAnswers/Answers >.99){
        $(image).attr("src", endMemes["all"])
    }else if (correctAnswers/Answers >=.75){
        $(image).attr("src", endMemes["most"])
    }else if (correctAnswers/Answers >=.5){
        $(image).attr("src", endMemes["some"])
    } else {
        $(image).attr("src", endMemes["none"])

    }
    //if (correctAnswers/Answers)
    $(image).attr("alt", "End Meme")
    $(".quiz-page").append(image)

    let againBtn = $("<button></button>").addClass("btn btn-primary again-btn").attr("type", "button")
    $(againBtn).html("Again!")
    $(".quiz-page").append(againBtn)
}
