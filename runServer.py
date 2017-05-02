# from backend import *
from flask import Flask, render_template
import os

FRONTEND_PATH = os.path.join('./','frontend', 'public', 'dist')

app = Flask(__name__, template_folder = FRONTEND_PATH,
            static_folder = FRONTEND_PATH)

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/select/")
def select():
    return {'1':123}

if __name__ == "__main__":
    print(FRONTEND_PATH)
    app.run()
