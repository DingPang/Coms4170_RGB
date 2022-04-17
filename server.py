from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, make_response, redirect

app = Flask(__name__)
user_learn = []
learn_image = "https://i.pinimg.com/564x/b7/45/3a/b7453aedcbd060c8b842d85f27c083fb.jpg"
learn_data = [
    {
        "id": 0,
        "words": "Now, RGB is additive, it is like mixing accroding to below Chart, you will now explore those concepts in this section (Don't worry, if you click Hint, this chart will show up again): ",
        "image": learn_image,
    },
    {
        "id": 1,
        "words": "RGBs are number triplets, and each of them range from 0 to 255. Higher the number corresponds to a lighter/brighter color. So, (255, 255, 255) is?",
        "image": learn_image,
        "options": ["(255, 255, 255)", "(0, 0, 0)"],
        "solution": "(255, 255, 255)",
        "type": "multi",
    },
    {
        "id": 2,
        "words": "It's called RGB, but not GRB, BRG. So, (255, 0, 0) is?",
        "image": learn_image,
        "options": ["(255, 0, 0)", "(0, 255, 0)", "(0, 0, 255)"],
        "solution": "(255, 0, 0)",
        "type": "multi",
    },
    {
        "id": 3,
        "words": "If we add (126,0,0) and (0,0,201), we will get (126,0,201), what color is it:",
        "image": learn_image,
        "base": ["(126, 0, 0)", "(0, 0, 201)"],
        "options": ["(0, 255, 255)", "(241, 194, 50)", "(126, 0, 201)"],
        "solution": "(126, 0, 201)",
        "type": "mix",
    },
]


@app.route("/")
def home():
    render_template("home.html")


@app.route("/learn")
def learn():
    return render_template("learn.html")


@app.route("/learn/<str>", methods=["GET"])
def search(str=" "):
    global learn_data
    page = str
    page_id = None
    if page == "colormix":
        page_id = 0
    else:
        page_id = int(str)

    for item in learn_data:
        if item["id"] == page_id:
            if page_id == 0:
                # transition
                return render_template("learn_trans.html", item=item)
            else:
                if item["type"] == "multi":
                    return render_template("learn_multi.html", item=item)
                elif item["type"] == "mix":
                    return render_template("learn_mix.html", item=item)
    else:
        return make_response(redirect("/"))


@app.route("/quiz")
def quiz():
    render_template("quiz.html")


if __name__ == "__main__":
    app.run(debug=True)
