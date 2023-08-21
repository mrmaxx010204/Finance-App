import config
from database import connect

cursor, conn = connect.connect_to_sqlite_db(config.DB_FILE)


def create_tables():

    # Define the CREATE TABLE query
    create_table_users_query = ("""
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone_number NUMBER,
            aadhar_card NUMBER,
            address TEXT,
            UNIQUE (id, phone_number, aadhar_card)
            UNIQUE(phone_number)
            UNIQUE(aadhar_card)
        )
    """)

    # Execute the CREATE TABLE query
    cursor.execute(create_table_users_query)

    print("Table 'users' created successfully.")

    # Define the CREATE TABLE query for loan table
    create_table_loans_query = ("""
        CREATE TABLE IF NOT EXISTS loans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            issuedDate TEXT,
            amount REAL,
            tenure INTEGER,
            interest REAL,
            emi REAL,
            emi_start_date TEXT,
            processing_charge REAL,
            type TEXT CHECK(type IN ('monthly', 'weekly')),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    # Execute the CREATE TABLE query
    cursor.execute(create_table_loans_query)
    
    print("Table 'loans' created successfully.")
    
    
    # Define the CREATE TABLE query for payment_info table
    create_table_payment_info_query = ("""
        CREATE TABLE IF NOT EXISTS payment_info (
            loan_id INTEGER PRIMARY KEY,
            user_id INTEGER,
            no_of_emi_paid INTEGER,
            last_payment_date TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
        )
    """)
    
    # Execute the CREATE TABLE query
    cursor.execute(create_table_payment_info_query)
    
    print("Table 'payment_info' created successfully.")
    
    # Define the CREATE TABLE query for loan_details table
    create_table_loan_details_query = ("""
        CREATE TABLE IF NOT EXISTS loan_details (
            user_id INTEGER,
            loan_id INTEGER,
            emi_dates TEXT,
            PRIMARY KEY(user_id, loan_id),
            
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
        )
    """)
    
    # Execute the CREATE TABLE query
    cursor.execute(create_table_loan_details_query)
    
    print("Table 'loan_details' created successfully.")
    
    # Define the CREATE TABLE query for expenses table
    create_table_expenses_query = ("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            expense_name TEXT,
            expense_amount REAL,
            expense_date TEXT
        )
    """)
    
    # Execute the CREATE TABLE query
    cursor.execute(create_table_expenses_query)
    
    print("Table 'loan_details' created successfully.")
    # Close the cursor and connection
    cursor.close()



if __name__ == "__main__":
    # Create the loan_details table
    create_tables()
    
    