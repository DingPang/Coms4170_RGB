from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

@app.route('/')
def home():
    render_template("home.html")

@app.route('/learn')
def learn():
    render_template("learn.html")

@app.route('/quiz')
def quiz():
    render_template("quiz.html")