import sqlite3


def connect_to_sqlite_db(db_file):
    conn = sqlite3.connect(db_file)

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    return conn, cursor

def get_db_connection(db_file):
    conn = sqlite3.connect(db_file)
    conn.row_factory = sqlite3.Row
    return conn
