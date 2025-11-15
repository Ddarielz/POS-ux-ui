from flask import Flask, jsonify, render_template
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# 🔧 Configuración de la base de datos
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="daniel",
        password="123456",
        database="pos"
    )

# ==============================
# 🔍 Ruta principal: muestra tu POS
# ==============================
@app.get("/")
def home():
    return render_template("index.html")


# ==============================
# 🔍 Buscar producto por código
# ==============================
@app.get("/api/producto/<codigo>")
def buscar_producto(codigo):
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = "SELECT code_product, name_product, price_product FROM products WHERE code_product = %s LIMIT 1"
        cursor.execute(query, (codigo,))
        resultado = cursor.fetchone()

        cursor.close()
        connection.close()

        if resultado:
            return jsonify({"success": True, "producto": resultado})

        return jsonify({"success": False, "mensaje": "Producto no encontrado"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
