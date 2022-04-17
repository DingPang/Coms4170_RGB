from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template("homepage.html")

@app.route('/learn')
def learn():
    return render_template("learn.html")

@app.route('/quiz')
def quiz():
    return render_template("quiz.html")

if __name__ == '__main__':
   app.run(debug = True)