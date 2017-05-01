# from backend import *
from flask import Flask
import os

FRONTEND_PATH = os.path.join('frontend', 'public', 'dist')

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    print(FRONTEND_PATH)
    app.run()
