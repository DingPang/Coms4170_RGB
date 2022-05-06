endMemes = {"all" : "https://www.memesmonkey.com/images/memesmonkey/be/be0b91678dfeff262973d20981434b51.jpeg",
            "most" : "https://i.imgflip.com/1qlznu.jpg",
            "some" : "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1454949056i/18033579._SX540_.jpg",
            "none" : "https://i.imgflip.com/23ks14.jpg"}

$(document).ready(function(){
    $(".quiz-page").empty()


    let correctAnswers = 0
    let Answers = item.length
    let easyness_fill = 100
    for (let i = 0; i < item.length;i++){
        console.log(item[i])
        if (item[i]["mode"]==="select") {
            if (item[i]["selection"]===item[i]["solution"]) {
                correctAnswers+= 1
            }

        }
        if (item[i]["mode"]==="enter") {
            console.log(item[i]["selection"])
            if (Math.abs(item[i]["selection"][0]-item[i]["solution"][0])<easyness_fill){
                if (Math.abs(item[i]["selection"][1]-item[i]["solution"][1])<easyness_fill){
                    if (Math.abs(item[i]["selection"][2]-item[i]["solution"][2])<easyness_fill){
                        correctAnswers+= 1
                    }
                }
            }

        }

    }

    loadEndPage(correctAnswers,Answers)

    $(".again-btn").click(function(){
        window.location.href = '/quiz'
    })


})


function loadEndPage(correctAnswers,Answers){

    let score_number = $("<span>" + correctAnswers + "</span>").addClass("score-number")
    let score_total = $("<span> of " + Answers + "</span>").addClass("score-total")



    let image = $("<img>").addClass("meme")
    if (Answers==0){
        $(image).attr("src", endMemes["none"])
    } else if (correctAnswers/Answers >.99){
        $(image).attr("src", endMemes["all"])
        score_total.addClass("good-score")
        score_number.addClass("good-score")            
    }else if (correctAnswers/Answers >=.75){
        $(image).attr("src", endMemes["most"])
        score_total.addClass("good-score")
        score_number.addClass("good-score")    
    }else if (correctAnswers/Answers >=.5){
        $(image).attr("src", endMemes["some"])
        score_total.addClass("medium-score")
        score_number.addClass("medium-score")    
    } else {
        $(image).attr("src", endMemes["none"])
        score_total.addClass("bad-score")
        score_number.addClass("bad-score")
    
    }

    $(".quiz-page").append(score_number, score_total)

    //if (correctAnswers/Answers)
    $(image).attr("alt", "End Meme")
    $(".quiz-page").append(image)
}
