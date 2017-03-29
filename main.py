import requests
import json
from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)
#app.config.from_object(__name__)

@app.route('/')
def listing():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)