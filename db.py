import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="daniel",
        password="123456",
        database="pos"
    )
