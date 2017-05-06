from backend.connectToMySQL import connectToMySQL as MySQL
from flask import Flask, render_template
import os

FRONTEND_PATH = os.path.join('frontend', 'dist')

app = Flask(__name__, template_folder=FRONTEND_PATH,
            static_folder=FRONTEND_PATH)

app.config.update(
    DEBUG=True,
    TEMPLATES_AUTO_RELOAD=True,
    SEND_FILE_MAX_AGE_DEFAULT=1,
)


@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/api/select", methods=['GET', 'POST'])
def select():
    if request.method == 'GET':
        return 'GET'
    elif request.method == 'POST':
        mysql = MySQL(host='localhost',
                      user='root',
                      password='root',
                      db='cars'
                      )
        return 'POST'


@app.route("/api/distinct", methods=['GET', 'POST'])
def select():
    if request.method == 'GET':
        return 'GET'
    elif request.method == 'POST':
        mysql = MySQL(host='localhost',
                      user='root',
                      password='root',
                      db='cars'
                      )
        mysql.executeSQL()
        return 'POST'


@app.route("/api/insert", methods=['GET', 'POST'])
def insert():
    pass


if __name__ == "__main__":
    app.run()
