import pymysql.cursors

import Apis.GlobalInfo.Keys as globalInfo

versionApp = 1.0

# Connection for DB
def getConectionMYSQL():
    return pymysql.connect(
        host=globalInfo.strDBHost, port=globalInfo.strDBPort,
        user=globalInfo.strDBUser,
        password=globalInfo.strDBPassword,
        db=globalInfo.strDBName,
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )

def fnGetTest():
    print("prueba para debug Practica")
    return {'intStatus': 200, 'strAnswer': 'Prueba de proceso Get sin parametros'}

def fnGetMYSQLListLibros():
    objResult = []
    dbConn = getConectionMYSQL()
    cursor = dbConn.cursor()

    query = "SELECT * FROM libro"

    cursor.execute(query)
    objResult = cursor.fetchall()

    return {'intStatus': 200, 'strAnswer': objResult}

def fnDeleteMYSQLList(idLibro):
    dbConn = getConectionMYSQL()
    cursor = dbConn.cursor()

    query = "DELETE FROM libro WHERE idLibro = %s"

    cursor.execute(query, (idLibro))
    dbConn.commit()

    return {'intStatus': 200, 'strAnswer': 'Registro eliminado'}

def fnAddMYSQLList(nombre, apellido, edad, correo, celular, nombreLibro, tiempoRenta):
    dbConn = getConectionMYSQL()
    cursor = dbConn.cursor()
    params = (nombre, apellido, edad, correo,
              celular, nombreLibro, tiempoRenta)

    query = '''INSERT INTO usuario(nombre, apellido, edad, correo, celular, nombreLibro, tiempoRenta) VALUES (%s, %s, %s, %s, %s, %s, %s)'''

    cursor.execute(query, params)
    dbConn.commit()

    return {'intStatus': 200, 'strAnswer': 'Registro agregado'}

def fnGetMYSQLListUsuarios():
    objResult = []
    dbConn = getConectionMYSQL()
    cursor = dbConn.cursor()

    query = "SELECT * FROM usuario"

    cursor.execute(query)
    objResult = cursor.fetchall()

    return {'intStatus': 200, 'strAnswer': objResult}

def fnGetMYSQLListSucursales():
    objResult = []
    dbConn = getConectionMYSQL()
    cursor = dbConn.cursor()

    query = "SELECT * FROM sucursal"

    cursor.execute(query)
    objResult = cursor.fetchall()

    return {'intStatus': 200, 'strAnswer': objResult}

def fnUpdateMYSQLList(idLibro, nombre, apellido, edad, correo, celular):
    dbConn = getConectionMYSQL()
    cursor = dbConn.cursor()
    params = (nombre, apellido, edad, correo, celular, idLibro)

    query = '''UPDATE libro SET nombre = %s, apellido = %s, edad = %s, correo = %s, celular = %s WHERE idLibro = %s'''

    cursor.execute(query, params)
    dbConn.commit()

    return {'intStatus': 200, 'strAnswer': 'Registro actualizado'}
