from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, make_response, redirect
import random
import time
import server_helper

app = Flask(__name__)
user_learn = []
quiz_learn = []
difficulty = "easy"
quiz_image = ""
learn_image = "https://i.pinimg.com/564x/b7/45/3a/b7453aedcbd060c8b842d85f27c083fb.jpg"
learn_data = {
    "basic": {
        "words": "Red, Green, and Blue (RGB) are primary colors of light added together in various ways to reproduce an array of colors. They are number triplets, and each of them range from 0 to 255, the arbitrary intensity increses as the number increases.",
        "colors": ["(255, 255, 255)", "(0, 0, 0)"],
        "next": 1,
        "image": learn_image,
    },
    1: {
        "id": 1,
        "words": "RGB components range from 0 to 255. The higher the number, the lighter/brighter the color. What color corresponds to (255, 255, 255)?",
        "options": ["(255, 255, 255)", "(0, 0, 0)"],
        "solution": "(255, 255, 255)",
        "type": "multi",
        "next": 2,
        "q_num": 1,
    },
    2: {
        "id": 2,
        "words": "These three colors (Red, Green, Blue) are what we call Primary Colors. It's called RGB, but not GRB, BRG. So, (255, 0, 0) is?",
        "options": ["(255, 0, 0)", "(0, 255, 0)", "(0, 0, 255)"],
        "solution": "(255, 0, 0)",
        "type": "multi",
        "next": 3,
        "q_num": 2,
    },
    3: {
        "id": 3,
        "words": "These three colors (Yellow, Cyan, Magenta) are what we call Secondary Colors. They have two parts of 255, and one 0. So, (255, 255, 0) is?",
        "options": ["(255, 255, 0)", "(0, 255, 255)", "(255, 0, 255)"],
        "solution": "(255, 255, 0)",
        "type": "multi",
        "next": "mix_rg",
        "q_num": 3,
    },
    4: {
        "id": 4,
        "words": "Based on what we just learn, which color is (247, 148, 0)?",
        "options": ["(0, 255, 255)", "(247, 148, 0)", "(247, 255, 0)"],
        "solution": "(247, 148, 0)",
        "type": "multi",
        "next": 5,
        "q_num": 1,
    },
    5: {
        "id": 5,
        "words": "",
        "options": ["(0, 255, 255)", "(247, 111, 0)", "(247, 255, 0)"],
        "solution": "(247, 111, 0)",
        "type": "multi_reverse",
        "next": 6,
        "q_num": 2,
    },
    6: {
        "id": 6,
        "words": "",
        "options": ["(50, 148, 0)", "(111, 148, 0)", "(111, 111, 0)"],
        "solution": "(111, 148, 0)",
        "type": "multi_reverse",
        "next": "mix_rb",
        "q_num": 3,
    },
    7: {
        "id": 7,
        "words": "Based on what we just learn, which color is (247, 0, 148)?",
        "options": ["(247, 0, 0)", "(247, 148, 0)", "(247, 0, 148)"],
        "solution": "(247, 0, 148)",
        "type": "multi",
        "next": 8,
        "q_num": 1,
    },
    8: {
        "id": 8,
        "words": "",
        "options": ["(148, 0, 148)", "(247, 0, 247)", "(247, 100, 0)"],
        "solution": "(148, 0, 148)",
        "type": "multi_reverse",
        "next": 9,
        "q_num": 2,
    },
    9: {
        "id": 9,
        "words": "",
        "options": ["(50, 0, 177)", "(111, 0, 148)", "(111, 0, 247)"],
        "solution": "(111, 0, 148)",
        "type": "multi_reverse",
        "next": "mix_gb",
        "q_num": 3,
    },
    10: {
        "id": 10,
        "words": "Based on what we just learn, which color is (0, 177, 148)?",
        "options": ["(0, 100, 255)", "(0, 148, 77)", "(0, 177, 148)"],
        "solution": "(0, 177, 148)",
        "type": "multi",
        "next": 11,
        "q_num": 1,
    },
    11: {
        "id": 11,
        "words": "",
        "options": ["(0, 147, 147)", "(0, 255, 148)", "(0, 177, 255)"],
        "solution": "(0, 177, 255)",
        "type": "multi_reverse",
        "next": 12,
        "q_num": 2,
    },
    12: {
        "id": 12,
        "words": "",
        "options": ["(0, 111, 70)", "(0, 111, 144)", "(0, 177, 255)"],
        "solution": "(0, 111, 70)",
        "type": "multi_reverse",
        "next": "explore",
        "q_num": 3,
    },
    13: {
        "id": 13,
        "words": "Based on what we just learn, which color is (196, 216, 208) (i.e. The Tiffany Blue)?",
        "options": ["(96, 116, 208)", "(50, 216, 208)", "(129, 216, 208)"],
        "solution": "(129, 216, 208)",
        "type": "multi",
        "next": 14,
        "q_num": 1,
    },
    14: {
        "id": 14,
        "words": "Which color is (0, 47, 167) (i.e. International Klein Blue)?",
        "options": ["(47, 87, 167)", "(11, 147, 201)", "(0, 47, 167)"],
        "solution": "(0, 47, 167)",
        "type": "multi",
        "next": 15,
        "q_num": 2,
    },
    15: {
        "id": 15,
        "words": "(i.e. color of JigglyPuff)",
        "options": ["(245, 217, 226)", "(247, 255, 148)", "(237, 177, 255)"],
        "solution": "(245, 217, 226)",
        "type": "multi_reverse",
        "next": "end",
        "q_num": 3,
    },
    "rg": {
        "title": "Combining Red and Green",
        "words": "As we have learned in basic sections, Red + Green = Yellow, but how exactly are different shades of them distributed? We will use below 2 gradients to illustrate their relationship.",
        "base": "Red",
        "Add": "Green",
        "next": 4,
    },
    "rb": {
        "title": "Combining Red and Blue",
        "words": "As we have learned in basic sections, Red + Blue = Magenta, but how exactly are different shades of them distributed? We will use below 2 gradients to illustrate their relationship.",
        "base": "Red",
        "Add": "Blue",
        "next": 7,
    },
    "gb": {
        "title": "Combining Green and Blue",
        "words": "As we have learned in basic sections, Green + Blue = Cyan, but how exactly are different shades of them distributed? We will use below 2 gradients to illustrate their relationship.",
        "base": "Green",
        "Add": "Blue",
        "next": 10,
    },
    "explore": {
        "title": "Combing Red, Green, and Blue",
        "words": "As we have learned in other sections, 2 colors mixing is a 2D Gradient, but what about 3 colors? The Gradient is going to in 3D Space, and it hard to visulaize. However, we also can represent it with a one 1D Gradient and one 2D Gradient as shown below. This perspective going to include all the possible colors that RGB can represent!",
        "base": "Green",
        "Add": "Blue",
        "next": 13,
    },
    "end": {
        "words": "Congrats! You finished Learning!",
    },
}

quiz_data = [
    {
        "id": 1,
        "words": "(100, 100, 100) is:",
        "image": learn_image,
        "options": ["(100, 100, 100)"],
        "solution": "(100, 100, 100)",
    },
]

basic_quiz_data = []


@app.route("/")
def homepage():
    return render_template("homepage.html")


@app.route("/learn")
def learn():
    return render_template("learn.html")


@app.route("/learn/<str>", methods=["GET"])
def learn_page(str=" "):
    try:
        global learn_data
        page_id = int(str)
        item = learn_data[page_id]

        if item["type"] == "multi":
            return render_template("learn_multi.html", item=item)
        elif item["type"] == "mix":
            return render_template("learn_mix.html", item=item)
        elif item["type"] == "multi_reverse":
            return render_template("learn_multi_reverse.html", item=item)
        else:
            return make_response(redirect("/"))
    except:
        return make_response(redirect("/"))


@app.route("/learn/basic", methods=["GET"])
def learn_basic():
    global learn_data
    op = learn_data["basic"]
    return render_template("learn_basic.html", item=op)


@app.route("/learn/explore", methods=["GET"])
def learn_exp():
    global learn_data
    op = learn_data["explore"]
    return render_template("learn_explore.html", item=op)


@app.route("/learn/end", methods=["GET"])
def learn_emd():
    global learn_data
    op = learn_data["end"]
    return render_template("learn_end.html", item=op)


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


@app.route("/learn/mix_<str>", methods=["GET"])
def mix_mix2(str=" "):
    global learn_data
    op = learn_data[str]
    return render_template("learn_mix2.html", item=op)


@app.route("/quiz/store", methods=["POST"])
def quiz_store():
    global quiz_learn
    new_item = request.get_json()
    t = time.localtime()
    current_time = time.strftime("%H:%M:%S", t)
    new_item["time"] = current_time
    quiz_learn.append(new_item)
    print(quiz_learn)
    return jsonify(new_item)


@app.route("/custum_quiz/store_image", methods=["POST"])
def custum_quiz_store():
    global quiz_image
    global difficulty

    new_item = request.get_json()
    quiz_image = new_item["url"]
    difficulty = new_item["difficulty"]

    # print(quiz_image)
    return jsonify(new_item)


@app.route("/quiz", methods=["GET"])
def quiz():
    return render_template("/quiz_start.html")


@app.route("/custom_quiz_<pstr>", methods=["GET"])
def cquiz(pstr=" "):
    num_questions = 3  # 5
    page_id = int(pstr)
    if page_id == 0:
        quiz_learn.clear()

        quiz_data[0]["words"] = "Choose a photo"
        return render_template("/quiz_custom.html", item=quiz_data[0])
    if page_id <= num_questions:
        quiz_data[0]["words"] = (
            "Click anywhere in the drawing to choose a color. Then enter its RGB values: ("
            + pstr
            + "/"+str(num_questions)+")"
        )
        quiz_data[0]["id"] = page_id + 1

        return render_template(
            "/quiz_custom_p2.html", item=quiz_data[0], image=quiz_image, difficulty = difficulty
        )

    quiz_data[0]["id"] = page_id + 1

    answers = quiz_learn
    return render_template("quiz.html", item=answers)


@app.route("/quiz/<pstr>", methods=["GET"])
def quiz_page(pstr=" "):

    page_id = int(pstr)
    random.seed()
    global basic_quiz_data, quiz_learn
    total_qs = 10
    total_types = 5
    cat = random.randint(1, total_types)
    q = {
        "type": cat,
    }
    answers = quiz_learn
    if page_id == 0:
        basic_quiz_data = []
        quiz_learn = []

    if page_id >= total_qs:
        return render_template("quiz_basic_end.html", ans=answers, quiz=basic_quiz_data)
    op = page_id % 3
    if cat == 1:
        q = server_helper.generate_basic(q, page_id, op)
    elif cat == 2:
        q = server_helper.generate_rg(q, page_id, op)
    elif cat == 3:
        q = server_helper.generate_rb(q, page_id, op)
    elif cat == 4:
        q = server_helper.generate_gb(q, page_id, op)
    elif cat == 5:
        q = server_helper.generate_rgb(q, page_id, op)

    basic_quiz_data.append(q)
    if op == 1:
        return render_template("quiz_mix.html", item=q, answers=quiz_learn)
    else:
        return render_template("quiz_multi.html", item=q, answers=quiz_learn)


if __name__ == "__main__":
    app.run(debug=True)
