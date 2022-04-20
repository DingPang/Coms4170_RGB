endMemes = {"all" : "https://www.memesmonkey.com/images/memesmonkey/be/be0b91678dfeff262973d20981434b51.jpeg",
            "most" : "https://i.imgflip.com/1qlznu.jpg",
            "some" : "https://memegenerator.net/img/instances/67730265.jpg",
            "none" : "https://i.imgflip.com/23ks14.jpg"}

$(document).ready(function(){
    $(".quiz-page").empty()


    let correctAnswers = 0
    let Answers = item.length
    let easyness_fill = 125
    for (let i = 0; i < item.length;i++){
        console.log(item[i])
        if (item[i]["mode"]==="select") {
            if (item[i]["selection"]===item[i]["solution"]) {
                correctAnswers+= 1
            }
    
        }
        if (item[i]["mode"]==="enter") {
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
