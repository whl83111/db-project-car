from backend.connectToMySQL import connectToMySQL as MySQL
from flask import Flask, render_template, request, jsonify
import os

FRONTEND_PATH = os.path.join('frontend', 'dist')

HOST = 'localhost'
USER = 'root'
PASSWORD = 'x94jo6cl6'
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
                'where': None,
                'orderBy': {
                    'price': None,
                    'years': None
                },
                'limit': {
                    'start': 0,
                    'each': 10
                }
            })
        else:
            sqlDict = {
                'type': 'SELECT',
                'targetColumns': '*',
                'targetTable': 'data',
                'where': list(),
                'orderBy': request.json['orderBy'],
                'limit': request.json['limit']
                'addition': 'WHERE {} ORDER BY {}`updateTime` LIMIT {}, {}',
            }
            additions = list()
            conditions = request.json['conditions']
            if (conditions['brand']):
                sqlDict['where'].append(
                    '`brands` = "{}"'.format(conditions['brand']))
            if (conditions['shift']):
                sqlDict['where'].append(
                    '`shifts` = "{}"'.format(conditions['shift']))
            if (conditions['yearMin']):
                sqlDict['where'].append(
                    '`years` >= "{}"'.format(conditions['yearMin']))
            if (conditions['yearMax']):
                sqlDict['where'].append(
                    '`years` >= "{}"'.format(conditions['yearMax']))
            if (conditions['region']):
                sqlDict['where'].append(
                    '`regions` = "{}"'.format(conditions['region']))
            if (conditions['price']['min']):
                sqlDict['where'].append(
                    '`price` >= "{}"'.format(conditions['price']['min']))
            if (conditions['price']['max']):
                sqlDict['where'].append(
                    '`price` <= "{}"'.format(conditions['price']['max']))
            if (conditions['displacementMin']):
                sqlDict['where'].append(
                    '`displacement` >= "{}"'.format(conditions['displacementMin']))
            if (conditions['displacementMax']):
                sqlDict['where'].append(
                    '`displacement` <= "{}"'.format(conditions['displacementMax']))
            if sqlDict['where'] != list():
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
