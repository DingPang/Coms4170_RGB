endMemes = {"all" : "https://www.memesmonkey.com/images/memesmonkey/be/be0b91678dfeff262973d20981434b51.jpeg",
            "most" : "https://i.imgflip.com/1qlznu.jpg",
            "some" : "https://memegenerator.net/img/instances/67730265.jpg",
            "none" : "https://i.imgflip.com/23ks14.jpg"}

function loadEndPage(){
    let score = $("<div></div>")
    $(score).html("Mode: <br> Score: ")
    $(".quiz-page").append(score)

    let image = $("<img>").addClass("meme")
    $(image).attr("src", endMemes["all"])
    $(image).attr("alt", "End Meme")
    $(".quiz-page").append(image)

    let againBtn = $("<button></button>").addClass("btn btn-primary again-btn").attr("type", "button")
    $(againBtn).html("Again!")
    $(".quiz-page").append(againBtn)
}

$(document).ready(function(){
    $(".quiz-page").empty()
    loadEndPage()

    $(".again-btn").click(function(){
        window.location.href = '/quiz'
    })

})