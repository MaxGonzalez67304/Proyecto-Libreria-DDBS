# Import libraries
from flask_cors import CORS

import Apis.Functions as callMethod

import Apis.GlobalInfo.Helpers as HelperFunctions

import Apis.GlobalInfo.ResponseMessages as ResponseMessage

from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

###################################################################
##
##
# GENERAL
##
##
###################################################################

@app.route('/api/general/gettest', methods=['GET'])
def getTest():
    try:
        objResult = callMethod.fnGetTest()
        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

# Obtener informacion de la base de datos
@app.route('/api/general/getLibros', methods=['GET'])
def fnGetMYSQLListLibros():
    try:
        objResult = callMethod.fnGetMYSQLListLibros()

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

# Obtener informacion de la base de datos
@app.route('/api/general/getUsuarios', methods=['GET'])
def fnGetMYSQLListUsuarios():
    try:
        objResult = callMethod.fnGetMYSQLListUsuarios()

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

# Obtener informacion de la base de datos
@app.route('/api/general/getSucursales', methods=['GET'])
def fnGetMYSQLListSucursales():
    try:
        objResult = callMethod.fnGetMYSQLListSucursales()

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)


# Eliminar informacion de la base de datos
@app.route('/api/general/deleteLibro/<int:idLibro>', methods=['GET'])
def deleteIdLibro(idLibro):
    try:
        objResult = callMethod.fnDeleteMYSQLList(idLibro)

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

# Agregar informacion a la base de datos
@app.route('/api/general/addUsuario', methods=['POST'])
def addLibro():
    try:
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        edad = request.json['edad']
        correo = request.json['correo']
        celular = request.json['celular']
        nombreLibro = request.json['nombreLibro']
        tiempoRenta = request.json['tiempoRenta']

        objResult = callMethod.fnAddMYSQLList(
            nombre, apellido, edad, correo, celular, nombreLibro, tiempoRenta)

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)
