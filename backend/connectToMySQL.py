import pymysql.cursors
import sys
import itertools
class SQL():
    def __init__(self, targetTable):
        self.targetTable = targetTable
    
    def select(self, where=None, order=None, limit=None):
        template = 'SELECT * FROM {} {} {} {}'
        sql = template.format(self.targetTable, where, order, limit)
        print()
        print(sql)
        return sql.strip()
    
    def distinct(self, col):
        template = 'SELECT DISTINCT {} FROM {}'
        sql = template.format(col, self.targetTable)
        print()
        print(sql)
        return sql.strip()
    
    def count(self, where=None, order=None, limit=None):
        template = 'SELECT COUNT(*) FROM `{}` {} {} {}'
        sql = template.format(self.targetTable, where, order, limit)
        print()
        print(sql)
        return sql.strip()

    def insert(self, columns, values):
        template = 'INSERT INTO {} ({}) VALUES ({})'
        sql = template.format(
            self.targetTable, ','.join(columns), ','.join(['"{}"'.format(value) for value in values]))
        print()
        print(sql)
        return sql.strip()

    def update(self, newValueWithColumns, objectId):
        # TODO: 考慮把`id`換成一般where()
        newData = ','.join([self.equal(column, value) for column, value in newValueWithColumns if column != 'id'])
        template = 'UPDATE `{}` SET {} WHERE `id`= {}'
        sql = template.format(self.targetTable, newValueWithColumns, objectId)
        print()
        print(sql)
        return sql.strip()

    def delete(self, objectId):
        # TODO: 考慮把`id`換成一般where()
        print(objectId)
        template = 'DELETE FROM {} WHERE `id`= {}'
        sql = template.format(self.targetTable, objectId)
        print()
        print(sql)
        return sql.strip()

    def greaterThen(self, col, value):
        return '{} >= "{}"'.format(col, value)

    def lowerThen(self, col, value):
        return '{} <= "{}"'.format(col, value)

    def equal(self, col, value):
        return '{} = "{}"'.format(col, value)

    def where(self, conditions):
        # TODO
        result = list()
        for column, value in conditions.items():
            if value != None:
                if 'Max' in column:
                    result.append(self.lowerThen(column, value))
                elif 'Min' in column:
                    result.append(self.greaterThen(column, value))
                else:
                    result.append(self.equal(column, value))
        if result != list():
            return 'WHERE {}'.format(' AND '.join(result))
        else:
            return ''

    def order(self, columnAndDirections):
        result = list()
        for column, direction in columnAndDirections.items():
            if direction != None:
                result.append('{} {}'.format(column, direction).strip())
        if result != list():
            return 'ORDER BY {}'.format(','.join(result))
        else:
            return ''

    def limit(self, start, each):
        return 'LIMIT {}, {}'.format(int(start), int(each))

class MySQL():
    def __init__(self, host, user, password, db):
        self.host = host
        self.user = user
        self.password = password
        self.db = db
        self.executeResult = list()
        try:
            self.connection = pymysql.connect(host=self.host,
                                         user=self.user,
                                         password=self.password,
                                         db=self.db,
                                         charset='utf8mb4',
                                         cursorclass=pymysql.cursors.DictCursor)
        except:
            print(sys.exc_info())
        self.cursor = self.connection.cursor()

    def execute(self, sqlString):
        try:
            self.cursor.execute(sqlString)
            # self.executeResult = list(filter(lambda x : x != '', sorted([list(result.values())[0] for result in cursor.fetchall()])))
        except:
            print(sys.exc_info())

    def getResponse(self):
        try:
            self.executeResult = self.cursor.fetchall()
        except:
            print(sys.exc_info())

    def commit(self):
        self.connection.commit()

    def close(self):
        self.connection.close()
