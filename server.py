from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, make_response, redirect
import time

app = Flask(__name__)
user_learn = []
learn_image = "https://i.pinimg.com/564x/b7/45/3a/b7453aedcbd060c8b842d85f27c083fb.jpg"
learn_data = [
    {
        "id": 3,
        "words": "Now, RGB is additive, it is like mixing accroding to below Chart, you will now explore those concepts in this section: ",
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
        "words": "These three colors (Red, Green, Blue) are what we call Primary Colors. It's called RGB, but not GRB, BRG. So, (255, 0, 0) is?",
        "image": learn_image,
        "options": ["(255, 0, 0)", "(0, 255, 0)", "(0, 0, 255)"],
        "solution": "(255, 0, 0)",
        "type": "multi",
    },
    {
        "id": 4,
        "words": "These three colors (Yellow, Cyan, Magenta) are what we call Secondary Colors. They have two parts of 255, and one 0. So, (255, 255, 0) is?",
        "image": learn_image,
        "options": ["(255, 255, 0)", "(0, 255, 255)", "(255, 0, 255)"],
        "solution": "(255, 255, 0)",
        "type": "multi",
    },
    {
        "id": 5,
        "words": "These are our 6 Tertiary Colors. They have one part of 255, one 0, and one 125. So, (255, 125, 0) is?",
        "image": learn_image,
        "options": [
            "(255, 125, 0)",
            "(255, 0, 125)",
            "(125, 255, 0)",
            "(0, 255, 125)",
            "(0, 125, 255)",
            "(125, 0, 255)",
        ],
        "solution": "(255, 125, 0)",
        "type": "multi",
    },
    {
        "id": 6,
        "words": "",
        "image": learn_image,
        "base": ["(126, 0, 0)", "(0, 0, 201)"],
        "options": ["(0, 255, 255)", "(241, 194, 50)", "(126, 0, 201)"],
        "solution": "(126, 0, 201)",
        "type": "mix",
    },
    {
        "id": 7,
        "words": "",
        "image": learn_image,
        "base": ["(255, 0, 0)", "(0, 125, 0)"],
        "options": ["(0, 255, 125)", "(241, 102, 255)", "(255, 125, 0)"],
        "solution": "(255, 125, 0)",
        "type": "mix",
    },
    {
        "id": 8,
        "words": "",
        "image": learn_image,
        "base": ["(126, 78, 0)", "(0, 0, 180)"],
        "options": ["(126, 78, 180)", "(41, 100, 50)", "(67, 131, 201)"],
        "solution": "(126, 78, 180)",
        "type": "mix",
    },
    {
        "id": 9,
        "words": "",
        "image": learn_image,
        "base": ["(208, 0, 0)", "(10, 89, 19)"],
        "options": ["(218, 89, 19)", "(47, 194, 50)", "(126, 54, 201)"],
        "solution": "(218, 89, 19)",
        "type": "mix",
    },
]



@app.route('/')
def homepage():
    return render_template("homepage.html")


@app.route("/learn")
def learn():
    return render_template("learn.html")

@app.route("/learn/<str>", methods=["GET"])
def learn_page(str=" "):
    global learn_data
    page = str
    page_id = None
    if page == "colormix":
        page_id = 3
    else:
        page_id = int(str)
    temp = 0
    for item in learn_data:
        temp += 1
        if item["id"] == page_id:
            if page_id == 3:
                # transition
                return render_template("learn_trans.html", item=item)
            else:
                if item["type"] == "multi":
                    return render_template("learn_multi.html", item=item)
                elif item["type"] == "mix":
                    return render_template("learn_mix.html", item=item)
    else:
        if temp == page_id - 1:
            return make_response(redirect("/learn/explore"))
        else:
            return make_response(redirect("/"))


@app.route("/learn/explore", methods=["GET"])
def learn_exp():
    return render_template("learn_explore.html")


@app.route("/learn/store", methods=["POST"])
def learn_store():
    global user_learn
    new_item = request.get_json()
    t = time.localtime()
    current_time = time.strftime("%H:%M:%S", t)
    new_item["time"] = current_time
    user_learn.append(new_item)
    print(user_learn)
    return jsonify(new_item)


@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

if __name__ == '__main__':
   app.run(debug = True)
