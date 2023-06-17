# Import libraries
from flask_cors import CORS, cross_origin

import os
import sys
import Apis.Functions as callMethod

import Apis.GlobalInfo.Keys as PracticaKeys

import Apis.GlobalInfo.Helpers as HelperFunctions

import Apis.GlobalInfo.ResponseMessages as ResponseMessage

from flask import Flask, jsonify, request, url_for, Response

import json

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

# Obtener registros de la base de datos
@app.route('/api/general/buscar', methods=['GET'])
def fnGetMYSQLList():
    try:
        objResult = callMethod.fnGetMYSQLList()

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

# Eliminar registros de la base de datos
@app.route('/api/general/deleteLibro/<int:idLibro>', methods=['GET'])
def deleteIdLibro(idLibro):
    try:
        objResult = callMethod.fnDeleteMYSQLList(idLibro)

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

# Agregar registros a la base de datos
@app.route('/api/general/addUsuario', methods=['POST'])
def addLibro():
    try:
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        edad = request.json['edad']
        correo = request.json['correo']
        celular = request.json['celular']

        objResult = callMethod.fnAddMYSQLList(nombre, apellido, edad, correo, celular)

        return jsonify(objResult)
    except Exception:
        HelperFunctions.PrintException()
        return jsonify(ResponseMessage.err500)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9005, debug=True, threaded=True)
