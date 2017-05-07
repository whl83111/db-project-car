from backend.connectToMySQL import connectToMySQL as MySQL
from flask import Flask, render_template, request, jsonify
import os

FRONTEND_PATH = os.path.join('frontend', 'dist')

HOST = 'localhost'
USER = 'user'
PASSWORD = 'password'
DB = 'cars'

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
        return 'select'
    elif request.method == 'POST':
        mysql = MySQL(host = HOST,
                      user = USER,
                      password = PASSWORD,
                      db = DB
                      )
        if request.json == {}:
            mysql.executeSQL({
                'type': 'SELECT',
                'targetColumns': '*',
                'targetTable': 'data',
                'addition': 'ORDER BY `updateTime` LIMIT 0, 10'
            })
        else:
            sqlDict = {
                'type': 'SELECT',
                'targetColumns': '*',
                'targetTable': 'data',
                'addition': '{} ORDER BY `updateTime` LIMIT {}, 10'
            }
            additions = list()
            if (request.json['brand']):
                additions.append(
                    '`brands` = "{}"'.format(request.json['brand']))
            if (request.json['shift']):
                additions.append(
                    '`shifts` = "{}"'.format(request.json['shift']))
            if (request.json['year']):
                additions.append(
                    '`years` >= "{}"'.format(request.json['year']))
            if (request.json['region']):
                additions.append(
                    '`regions` = "{}"'.format(request.json['region']))
            if (request.json['price']['min']):
                additions.append(
                    '`price` >= "{}"'.format(request.json['price']['min']))
            if (request.json['price']['max']):
                additions.append(
                    '`price` <= "{}"'.format(request.json['price']['max']))
            if (request.json['displacement']['min']):
                additions.append(
                    '`displacement` >= "{}"'.format(request.json['displacement']['min']))
            if (request.json['displacement']['max']):
                additions.append(
                    '`displacement` <= "{}"'.format(request.json['displacement']['max']))
            if additions != list():
                sqlDict['addition'] = sqlDict['addition'].format("WHERE ({})".format(
                    ' AND '.join(additions)), (request.json['page'] - 1) * 10)
            else:
                sqlDict['addition'] = sqlDict['addition'].format('', (request.json['page'] - 1) * 10)
            # print('\n\n', sqlDict['addition'], '\n\n')
            mysql.executeSQL(sqlDict)
        return jsonify(mysql.executeResult)

@app.route("/api/distinct", methods=['GET', 'POST'])
def distinct():
    if request.method == 'GET':
        return 'distinct'
    elif request.method == 'POST':
        mysql = MySQL(host = HOST,
                      user = USER,
                      password = PASSWORD,
                      db = DB
                      )
        mysql.executeSQL({
            'type': 'SELECT DISTINCT',
            'targetColumn': request.json['targetColumn'],
            'targetTable': 'data',
            'addition': ''
        })
        return jsonify(mysql.executeResult)

@app.route("/api/countPage", methods=['GET', 'POST'])
def countPage():
    # TODO: 修改之
    if request.method == 'GET':
        return 'countPage'
    elif request.method == 'POST':
        mysql = MySQL(host=HOST,
                      user=USER,
                      password=PASSWORD,
                      db=DB
                      )
        mysql.executeSQL({
            'type': 'SELECT COUNT(*)',
            'targetTable': 'data',
            'addition': ''
        })
        return jsonify(mysql.executeResult)

@app.route("/api/insert", methods=['GET', 'POST'])
def insert():
    pass


if __name__ == "__main__":
    app.run()
