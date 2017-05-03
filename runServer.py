# from backend import *
from flask import Flask, render_template
import os

FRONTEND_PATH = os.path.join('./','frontend', 'public', 'dist')

app = Flask(__name__, template_folder = FRONTEND_PATH,
            static_folder = FRONTEND_PATH)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/api/select", methods = ['GET', 'POST'])
def select():
    if request.method == 'GET':
        return 'GET'
    elif request.method == 'POST':
        return 'POST'

if __name__ == "__main__":
    print(FRONTEND_PATH)
    app.run()
