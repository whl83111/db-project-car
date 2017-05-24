from backend.connectToMySQL import MySQL, SQL
from flask import Flask, render_template, request, jsonify, redirect, url_for
import os

FRONTEND_PATH = os.path.join('frontend', 'dist')

HOST = 'localhost'
USER = 'root'
PASSWORD = '0000'
DB = 'g03'

app = Flask(__name__, template_folder=FRONTEND_PATH,
            static_folder=FRONTEND_PATH)

app.config.update(
    DEBUG=True,
    TEMPLATES_AUTO_RELOAD=True,
    SEND_FILE_MAX_AGE_DEFAULT=1,
)

sql = SQL('data')
mysql = MySQL(host=HOST,
              user=USER,
              password=PASSWORD,
              db=DB
              )

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/api/select", methods=['GET', 'POST'])
def select():
    if request.method == 'GET':
        return 'select'
    elif request.method == 'POST':
        mysql.__init__(host=HOST,
                       user=USER,
                       password=PASSWORD,
                       db=DB)
        print(request.json)
        sqlString = sql.select(where=sql.where(request.json['conditions']),
                               order=sql.order(request.json['orderBy']),
                               limit=sql.limit(request.json['limit']['start'], request.json['limit']['each']))
        mysql.execute(sqlString)
        # mysql.close()
        return jsonify(mysql.executeResult)

@app.route("/api/distinct", methods=['GET', 'POST'])
def distinct():
    if request.method == 'GET':
        return 'distinct'
    elif request.method == 'POST':
        mysql.__init__(host=HOST,
                       user=USER,
                       password=PASSWORD,
                       db=DB)
        mysql.execute(sql.distinct(request.json['targetColumn']))
        return jsonify([list(item.values())[0] for item in mysql.executeResult if list(item.values())[0] != ''])

@app.route("/api/countPage", methods=['GET', 'POST'])
def countPage():
    # TODO: 修改之
    if request.method == 'GET':
        return 'countPage'
    elif request.method == 'POST':
        mysql.__init__(host=HOST,
                       user=USER,
                       password=PASSWORD,
                       db=DB)
        mysql.execute(sql.count(where=sql.where(request.json['conditions']),
                                order=sql.order(request.json['orderBy']),
                                limit=sql.limit(request.json['limit']['start'], request.json['limit']['each'])))
        mysql.commit()
        mysql.close()
        return jsonify(mysql.executeResult)

@app.route("/api/insert", methods=['GET', 'POST'])
def insert():
    # TODO
    if request.method == 'GET':
        return 'insert'
    elif request.method == 'POST':
        mysql.__init__(host=HOST,
                       user=USER,
                       password=PASSWORD,
                       db=DB)
        mysql.execute(sql.insert(request.json.keys(), request.json.values()))
        mysql.commit()
        mysql.close()

@app.route("/api/update", methods=['GET', 'POST'])
def update():
    # TODO
    if request.method == 'GET':
        return 'update'
    elif request.method == 'POST':
        mysql.__init__(host=HOST,
                       user=USER,
                       password=PASSWORD,
                       db=DB)
        mysql.execute(sql.update(request.json, request.json['id']))
        mysql.commit()
        mysql.close()
        return redirect(url_for('index'))

@app.route("/api/delete", methods=['GET', 'POST'])
def delete():
    # TODO
    if request.method == 'GET':
        return 'delete'
    elif request.method == 'POST':
        mysql.__init__(host=HOST,
                       user=USER,
                       password=PASSWORD,
                       db=DB)
        mysql.execute(sql.delete(request.json['id']))
        mysql.commit()
        mysql.close()

if __name__ == "__main__":
    app.run(host='0.0.0.0')
