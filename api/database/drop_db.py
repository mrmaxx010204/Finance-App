import config
from database import connect

cursor, conn = connect.connect_to_sqlite_db(config.DB_FILE)

def drop_tables():
    
    #####################################
    drop_table_user_query=("""
          DROP TABLE users           
    """)

    cursor.execute(drop_table_user_query)       
    print("Table 'users' deleted successfully.")
    
    #######################################
    
    drop_table_loans_query=("""
          DROP TABLE loans         
    """)
    
    cursor.execute(drop_table_loans_query)
    print("Table 'loans' deleted successfully.")
    
    
    #######################################
    
    drop_table_loan_details_query=("""
          DROP TABLE loan_details         
    """)
    
    cursor.execute(drop_table_loan_details_query)
    print("Table 'loan_details' deleted successfully.")
    
    
    #######################################
    
    drop_table_payment_info_query=("""
          DROP TABLE payment_info       
    """)
    
    cursor.execute(drop_table_payment_info_query)
    print("Table 'payment_info' deleted successfully.")
    
    
    #######################################
    
    drop_table_expenses_query=("""
          DROP TABLE expenses       
    """)
    
    cursor.execute(drop_table_expenses_query)
    print("Table 'expenses' deleted successfully.")
    


if __name__ == "__main__":
    # dropped the table
   drop_tables()
    