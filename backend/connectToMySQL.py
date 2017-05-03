import pymysql.cursors

class connectMySQL():
    def __init__(self, host, user, password, db):
        self.host = host
        self.user = user
        self.password = password
        sef.db = db
        self.connection = self.connectMySQL()
        self.executeResult = list()
    
    def connectMySQL(self):
        try:
            self.connection = pymysql.connect(host = self.host,
                user = self.user,
                password = self.password,
                db = self.db,
                charset = 'utf8mb4',
                cursorclass = pymysql.cursors.DictCursor)
        except:
            print('Error from ConnectMySQL !')

    def executeSQL(self, sqlDict):
        try:
            if sqlDict['type'] == "INSERT INTO":
                with self.connection.cursor() as cursor:
                    sql = 'INSERT INTO `{}` {} VALUES {} {}'.format(
                        sqlDict['targetTable'],
                        tuple(['`{}`'.format(column)
                                for column in sqlDict['targetColumns']]),
                        tuple(['`{}`'.format(column)
                                for column in sqlDict['targetValues']]),
                        sqlDict['addition']
                    ).strip()
                    cursor.execute(sql)
                    self.connection.commit()
            elif sqlDict['type'] == "SELECT":
                with connection.cursor() as cursor:
                    sql = "SELECT {} FROM {} {}".format(
                        ','.join(['`{}`'.format(column) for column in sqlDict['targetCloumns']]),
                        '`{}`'.format(sqlDict['targetTable']),
                        sqlDict['addition']
                    ).strip()
                    cursor.execute(sql)
                    self.executeResult = cursor.fetchall()
        except:
            print('Error from executeSQL!')

    def closeConnection(self):
        self.connection.close()