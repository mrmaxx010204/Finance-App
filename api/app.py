from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from database import connect
from datetime import timedelta
import matplotlib.pyplot as plt
from collections import defaultdict
import datetime 
from dateutil.relativedelta import relativedelta
import ast
import io
import base64
import plotly.graph_objs as go
import config
import json
import calendar

app = Flask(__name__)
CORS(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@cross_origin()
def index():
    return jsonify({'message': 'Server is running successfully'})

@app.route('/clients/new', methods=['POST'])
@cross_origin()
def add_client():
    try:
        data = request.json
        if not data:
            raise ValueError('Invalid JSON data')
        name= data.get('name')
        phoneNo = data.get('phoneNo')
        aadharCard = data.get('aadharCard')
        address = data.get('address')

        if not name or not phoneNo or not aadharCard or not address:
            return jsonify({'error': 'Invalid data'}), 400

        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (name, phone_number, aadhar_card, address) VALUES (?, ?, ?, ?)',
                       (name, phoneNo, aadharCard, address))
        conn.commit()
        conn.close()
        response = jsonify({'message': 'Client added successfully'}), 201
        return response

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'An unexpected error occurred'}), 500
    

@app.route('/loans/new', methods=['POST'])
@cross_origin()
def add_loans():
    try:
        data = request.json
        if not data:
            raise ValueError('Invalid JSON data')
        
        userId = data.get('userId')
        issuedDate = data.get('issuedDate')
        amount = data.get('amount')
        tenure = data.get('tenure')
        interest = data.get('interest')
        emi = data.get('emi')
        emiStartDate = data.get('emiStartDate')
        processingCharge = data.get('processingCharge')
        type = data.get('type')

        if not userId or not issuedDate or not amount or not tenure or not interest or not emi or not emiStartDate or not processingCharge or not type:
            return jsonify({'error': 'Invalid data'}), 400

        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO loans (user_id, issuedDate, amount, tenure, interest, emi, emi_start_date, processing_charge, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                       (userId, issuedDate, amount, tenure, interest, emi, emiStartDate, processingCharge, type))
        conn.commit()
        conn.close()
        response = jsonify({'message': 'Loan details added successfully'}), 201
        return response

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
@app.route('/payments/new', methods=['POST'])
@cross_origin()
def add_payments():
    try:
        data = request.json
        if not data:
            raise ValueError('Invalid JSON data')
        
        loanId = data.get('loanId')
        userId = data.get('userId')
        noOfEmiPaid = data.get('noOfEmiPaid')
        lastPaymentDate = data.get('lastPaymentDate')

        if not loanId or not userId or not noOfEmiPaid or not lastPaymentDate:
            return jsonify({'error': 'Invalid data'}), 400

        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO payment_info (loan_id, user_id, no_of_emi_paid, last_payment_date) VALUES (?, ?, ?, ?)',
                       (loanId, userId, noOfEmiPaid, lastPaymentDate))
        conn.commit()
        conn.close()
        response = jsonify({'message': 'Payment details added successfully'}), 201
        return response

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'An unexpected error occurred'}), 500
 
 
@app.route('/expenses/new', methods=['POST'])
@cross_origin()
def add_expenses():
    try:
        data = request.json
        if not data:
            raise ValueError('Invalid JSON data')
        
        expenseName = data.get('expenseName')
        expenseAmount = data.get('expenseAmount')
        expenseDate = data.get('expenseDate')

        if not expenseName or not expenseAmount or not expenseDate:
            return jsonify({'error': 'Invalid data'}), 400

        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO expenses (expense_name, expense_amount, expense_date) VALUES (?, ?, ?)',
                       (expenseName, expenseAmount, expenseDate))
        conn.commit()
        conn.close()
        response = jsonify({'message': 'Expense added successfully'}), 201
        return response

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
    
@app.route('/clients', methods=['GET'])
@cross_origin()
def get_clients():
    try:
        # Connect to the SQLite database
        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()

        # Fetch all user data from the 'users' table
        cursor.execute('SELECT * FROM users')
        rows = cursor.fetchall()

        # Convert the data to a list of dictionaries
        clients_data = []
        for row in rows:
            clients = {
                'id': row[0],
                'name': row[1],
                'phone_number': row[2],
                'aadhar_card': row[3],
                'address': row[4],
            }
            clients_data.append(clients)

        # Close the connection
        conn.close()

        # Return the client data as JSON response
        return jsonify(clients_data)

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
@app.route('/loans', methods=['GET'])
@cross_origin()
def get_loans():
    try:
        # Connect to the SQLite database
        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()

        # Fetch all loan data from the 'loans' table
        cursor.execute('SELECT * FROM loans')
        rows = cursor.fetchall()

        # Convert the data to a list of dictionaries
        loans_data = []
        for row in rows:
            loan = {
                'id': row[0],
                'user_id': row[1],
                'issuedDate': row[2],
                'amount': row[3],
                'tenure': row[4],
                'interest': row[5],
                'emi': row[6],
                'emi_start_date': row[7],
                'processing_charge': row[8],
                'type': row[9],
            }
            loans_data.append(loan)

        # Close the connection
        conn.close()

        # Return the loans data as JSON response
        return jsonify(loans_data)

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
    
@app.route('/payments', methods=['GET'])
@cross_origin()
def get_payments():
    try:
        # Connect to the SQLite database
        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()

        # Fetch all user payments from the 'users' table
        cursor.execute('SELECT * FROM payment_info')
        rows = cursor.fetchall()

        # Convert the data to a list of dictionaries
        if rows:
            payment_data = []
            for row in rows:
                loan_id = row[0]
                user_id = row[1]
                no_of_emi_paid = row[2]
                
                cursor.execute('SELECT tenure FROM loans WHERE id = ?', (loan_id,))
                tenure_data = cursor.fetchone()
                
                no_of_emi_left = int(0)
                
                if tenure_data[0] != None:
                    no_of_emi_left = int(tenure_data[0]) - no_of_emi_paid
                
                
                payment = {
                    'loan_id': loan_id,
                    'user_id': user_id,
                    'no_of_emi_paid': no_of_emi_paid,
                    'no_of_emi_left': no_of_emi_left,
                    'last_payment_date': row[3],
                }
                payment_data.append(payment)

            # Close the connection
            conn.close()

        # Return the payment data as JSON response
        return jsonify(payment_data)

    except Exception as e:
        conn.close()
        return jsonify(message='Error: {}'.format(str(e))), 500
    
    
@app.route('/expenses', methods=['GET'])
@cross_origin()
def get_expenses():
    try:
        # Connect to the SQLite database
        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()

        # Fetch all expenses from the 'expenses' table
        cursor.execute('SELECT * FROM expenses')
        rows = cursor.fetchall()

        # Convert the data to a list of dictionaries
        if rows:
            expense_data = []
            for row in rows:               
                
                expense = {
                    'id': row[0],
                    'expense_name': row[1],
                    'expense_amount': row[2],
                    'expense_date': row[3],
                }
                expense_data.append(expense)

            # Close the connection
            conn.close()

        # Return the expense data as JSON response
        return jsonify(expense_data)

    except Exception as e:
        conn.close()
        return jsonify(message='Error: {}'.format(str(e))), 500    
    
    
@app.route('/clients/<int:id>', methods=['GET'])
@cross_origin()
def get_client_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the client data based on ID
        cursor.execute('SELECT * FROM users WHERE ID = ?', (id,))
        client_data = cursor.fetchone()

        # Close the connection
        conn.close()

        if client_data:
            # Convert the client data to a dictionary and return it as JSON response
            client = {
                'id': client_data[0],
                'name': client_data[1],
                'phone_number': client_data[2],
                'aadhar_card': client_data[3],
                'address': client_data[4],
            }
            return jsonify(client)
        else:
            return jsonify({'error': 'Client not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
   
    
@app.route('/clients/<int:id>', methods=['PUT'])
@cross_origin()
def update_client_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the client data based on ID
        cursor.execute('SELECT * FROM users WHERE ID = ?', (id,))
        client_data = cursor.fetchone()
        
        if client_data:
            # Get the updated client details from the request form
            data = request.get_json()
            name= data.get('name')
            phoneNo = data.get('phoneNo')
            aadharCard = data.get('aadharCard')
            address = data.get('address')

            # Update the client data in the database
            cursor.execute('UPDATE users SET name=?, phone_number=?, aadhar_card=?, address=? WHERE ID=?',
                (name, phoneNo, aadharCard, address, id))
            conn.commit()

            # Close the connection
            conn.close()

            return jsonify({'message': 'Client updated successfully'})
        
        else:
            # User with the given ID not found
            return jsonify({'error': 'Client not found'}), 404

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
@app.route('/loans/<int:id>', methods=['GET'])
@cross_origin()
def get_loan_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the loan data based on ID
        cursor.execute('SELECT * FROM loans WHERE ID = ?', (id,))
        loan_data = cursor.fetchone()

        # Close the connection
        conn.close()

        if loan_data:
            # Convert the loan data to a dictionary and return it as JSON response
            loan = {
                'id': loan_data[0],
                'user_id': loan_data[1],
                'issuedDate': loan_data[2],
                'amount': loan_data[3],
                'tenure': loan_data[4],
                'interest': loan_data[5],
                'emi': loan_data[6],
                'emi_start_date': loan_data[7],
                'processing_charge': loan_data[8],
                'type': loan_data[9],
            }
            return jsonify(loan)
        else:
            return jsonify({'error': 'Loan not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
   
    
@app.route('/loans/<int:id>', methods=['PUT'])
@cross_origin()
def update_loan_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the loan data based on ID
        cursor.execute('SELECT * FROM loans WHERE ID = ?', (id,))
        loan_data = cursor.fetchone()
        
        if loan_data:
            # Get the updated loan details from the request form
            data = request.get_json()
            userId = data.get('userId')
            issuedDate = data.get('issuedDate')
            amount = data.get('amount')
            tenure = data.get('tenure')
            interest = data.get('interest')
            emi = data.get('emi')
            emiStartDate = data.get('emiStartDate')
            processingCharge = data.get('processingCharge')
            type = data.get('type')
            
            # Update the loan data in the database
            cursor.execute('UPDATE loans SET user_id=?, issuedDate=?, amount=?, tenure=?, interest=?, emi=?, emi_start_date=?, processing_charge=?, type=? WHERE ID=?',
                (userId, issuedDate, amount, tenure, interest, emi, emiStartDate, processingCharge, type, id))
            conn.commit()

            # Close the connection
            conn.close()

            return jsonify({'message': 'Loan updated successfully'})
        
        else:
            # User with the given ID not found
            return jsonify({'error': 'Loan not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
@app.route('/payments/<int:id>', methods=['GET'])
@cross_origin()
def get_payment_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the payment data based on ID
        cursor.execute('SELECT * FROM payment_info WHERE LOAN_ID = ?', (id,))
        payment_data = cursor.fetchone()

        # Close the connection
        conn.close()

        if payment_data:
            # Convert the payment data to a dictionary and return it as JSON response
            payment = {
                'loan_id': payment_data[0],
                'user_id': payment_data[1],
                'no_of_emi_paid': payment_data[2],
                'last_payment_date': payment_data[3], 
            }
            return jsonify(payment )
        else:
            return jsonify({'error': 'Payment Detail not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
@app.route('/payments/<int:id>', methods=['PUT'])
@cross_origin()
def update_payment_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the payment data based on ID
        cursor.execute('SELECT * FROM payment_info WHERE LOAN_ID = ?', (id,))
        payment_data = cursor.fetchone()
        
        if payment_data:
            # Get the updated payment details from the request form
            data = request.get_json()
            loanId = data.get('loanId')
            userId = data.get('userId')
            noOfEmiPaid = data.get('noOfEmiPaid')
            lastPaymentDate = data.get('lastPaymentDate')
            
            # Update the payment data in the database
            cursor.execute('UPDATE payment_info SET loan_id=?, user_id=?, no_of_emi_paid=?, last_payment_date=? WHERE LOAN_ID=?',
                (loanId, userId, noOfEmiPaid, lastPaymentDate, id))
            conn.commit()

            # Close the connection
            conn.close()

            return jsonify({'message': 'Payment Information updated successfully'})
        
        else:
            # User with the given ID not found
            return jsonify({'error': 'Payment detail not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500


@app.route('/expenses/<int:id>', methods=['GET'])
@cross_origin()
def get_expense_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the expense data based on ID
        cursor.execute('SELECT * FROM expenses WHERE id = ?', (id,))
        expense_data = cursor.fetchone()

        # Close the connection
        conn.close()
        
        if expense_data:
            # Convert the expense data to a dictionary and return it as JSON response
            expense = {
                'expense_name': expense_data[1],
                'expense_amount': expense_data[2],
                'expense_date': expense_data[3],
            }
            return jsonify(expense)
        else:
            return jsonify({'error': 'Expense Detail not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
    
    

@app.route('/expenses/<int:id>', methods=['PUT'])
@cross_origin()
def update_expense_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)

        # Fetch the expense data based on ID
        cursor.execute('SELECT * FROM expenses WHERE id = ?', (id,))
        expense_data = cursor.fetchone()
        
        if expense_data:
            # Get the updated expense details from the request form
            data = request.get_json()
            expenseName = data.get('expenseName')
            expenseAmount = data.get('expenseAmount')
            expenseDate = data.get('expenseDate')
            
            # Update the expense data in the database
            cursor.execute('UPDATE expenses SET expense_name=?, expense_amount=?, expense_date=? WHERE id=?',
                (expenseName, expenseAmount, expenseDate, id))
            conn.commit()

            # Close the connection
            conn.close()

            return jsonify({'message': 'Expense Information updated successfully'})
        
        else:
            # User with the given ID not found
            return jsonify({'error': 'Expense detail not found'}), 404
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500

    
@app.route('/clients/loans/<int:id>', methods=['GET'])
@cross_origin()
def get_loan_details_by_id(id):
    try:
        # Connect to the SQLite database
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)
    
        # Fetch payments by user ID
        cursor.execute('SELECT * FROM payment_info WHERE user_id = ?', (id,))
        payment_list = cursor.fetchall()
        
        # Fetch all loans by user ID
        cursor.execute('SELECT * FROM loans WHERE user_id = ?', (id,))
        client_loans = cursor.fetchall()

        if client_loans or payment_list:
            loans_list = []

            for loan_data in client_loans:
                loan_id = loan_data[0]
                amount = loan_data[3]
                tenure = loan_data[4]
                emi = loan_data[6]
                no_of_emi_paid = 0
                no_of_emi_left = 0
                
                for payment_data in payment_list:
                    if payment_data[0] == loan_id:
                        no_of_emi_paid = payment_data[2]
                
                
                total_amount = (emi * tenure)
                balance_amount = total_amount - (no_of_emi_paid * emi)
                no_of_emi_left = tenure - no_of_emi_paid
                
                # Create a dictionary for each loan
                loan_details = {
                    'loan_id': loan_id,
                    'issued_date': loan_data[2],
                    'emi': emi,
                    'amount': amount,
                    'total': total_amount,
                    'tenure': tenure,
                    'balance': balance_amount,
                    'no_of_emi_left': no_of_emi_left,
                    'type': loan_data[9],
                }
                
                loans_list.append(loan_details)
          
            # Close the connection
            conn.close()

            return jsonify(loans_list)
        else:
            # Loan with the given ID not found
            return jsonify({'error': 'Loan not found'}), 404

    except Exception as e:
        return jsonify(message='Error: {}'.format(str(e))), 500
 

def generate_emi_dates(start_date, tenure, emi_type):
    emi_dates = []
    current_date = datetime.datetime.strptime(start_date, '%Y-%m-%d')
    
    
    if emi_type == 'monthly':
        for _ in range(tenure):
            emi_dates.append({
                'date': current_date.strftime('%Y-%m-%d'),
                'status': 'pending'
            })
            
            if emi_type == 'monthly':
                    current_date += relativedelta(months=1)
            elif emi_type == 'weekly':
                current_date += datetime.timedelta(weeks=1)
    
    return emi_dates

    
@app.route('/payments/details/<int:user_id>/<int:loan_id>', methods=['GET'])
@cross_origin()
def get_payment_details_by_id(user_id, loan_id):
    try:
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)
        
        #Fetch name by user ID
        query = "SELECT name FROM users WHERE id = ?"
        cursor.execute(query, (user_id,))
        client_name = cursor.fetchone()  
        
        if client_name:
            client_name = client_name[0]  
            
        # Fetch payments by user ID and loan ID 
        query = """
            SELECT no_of_emi_paid FROM payment_info
            WHERE loan_id = ? AND user_id = ?
        """
        cursor.execute(query, (loan_id, user_id,))
        payment_info = cursor.fetchone()
        
        if payment_info:
            no_of_emi_paid = payment_info[0]
              
            
        # Fetch loans by user ID and loan ID
        query = "SELECT * FROM loans WHERE id = ? AND user_id = ?"
        cursor.execute(query, (loan_id, user_id,))
        loan_data = cursor.fetchone()
        
        
        if loan_data:
            tenure = loan_data[4]
            emi = loan_data[6]
            
            balance_amount = (tenure * emi) - (no_of_emi_paid * emi) 
            
                # Generate EMI dates based on emi_start_date, tenure, and type
            emi_dates = generate_emi_dates(loan_data[7], tenure, loan_data[9])
            emi_dates_array = [{'date': entry['date'], 'status': entry['status']} for entry in emi_dates]

            cursor.execute('INSERT OR IGNORE INTO loan_details (user_id, loan_id, emi_dates) VALUES (?, ?, ?)',
                        (user_id, loan_id, str(emi_dates_array)))
        

        # Fetch loans by user ID and loan ID
        query = "SELECT emi_dates FROM loan_details WHERE user_id = ? AND loan_id = ?"
        cursor.execute(query, (user_id, loan_id,))
        emi_dates = cursor.fetchone()
        emi_dates_list = ast.literal_eval(emi_dates[0])
        


        if loan_data and emi_dates and payment_info and client_name:
            # Create a dictionary for each loan
            loan_detail = {
                'user_id': user_id,
                'loan_id': loan_id,
                'client_name': client_name,
                'balance_amount': balance_amount,
                'emi': emi,
                'emi_dates': emi_dates_list
            }
                
            
            conn.commit()

            # Close the connection
            conn.close()

            return jsonify(loan_detail)
        else:
            # Loan with the given ID not found
            return jsonify({'error': 'Loan not found'}), 404

    except Exception as e:
        return jsonify(message='Error: {}'.format(str(e))), 500
    
        
@app.route('/update_status/<int:loan_id>/<int:user_id>/<date>', methods=['PUT'])
@cross_origin()
def update_status(loan_id, user_id, date):
    try:
        new_status = str(request.json.get('status'))
        
        
        conn, cursor = connect.connect_to_sqlite_db(config.DB_FILE)
        
        # Fetch loans by user ID and loan ID
        query = "SELECT emi_dates FROM loan_details WHERE user_id = ? AND loan_id = ?"
        cursor.execute(query, (user_id, loan_id,))
        emi_dates = cursor.fetchone()
        emi_dates_list = ast.literal_eval(emi_dates[0])
        
        #this piece of code will help in editing the dates
        target_date = date

        for entry in emi_dates_list:
            if entry["date"] == target_date:
                if entry["status"] == new_status:
                    entry["status"] = 'pending'
                    break
                else: 
                    entry["status"] = new_status
                    break
            
        
        emi_dates_array = [{'date': entry['date'], 'status': entry['status']} for entry in emi_dates_list]
        
        cursor.execute("UPDATE loan_details SET emi_dates=? WHERE user_id=? AND loan_id=?", (str(emi_dates_array), user_id, loan_id,))
        conn.commit()
        conn.close()
        
        return jsonify(message='Payment status updated successfully'), 200
    
    except Exception as e:
        return jsonify(message=str(e)), 500


def get_pie_chart_data(loans_data, expense_data, payment_data):
    #Calculate the total loan dispursed
    total_amount = 0
    for loan in loans_data:
        if loan['amount'] is not None:
            total_amount += loan['amount']
            
    #Calculate the total expense_amount
    total_expense_amount = 0
    for expense in expense_data:
        if expense['expense_amount'] is not None:
            total_expense_amount += expense['expense_amount']
            
    # Calculate overall total return amount
    total_return = 0
    for loan in loans_data:
        user_id = loan['user_id']
        loan_id = loan['id']
        emi = loan['emi']
        
        for payment in payment_data:
            if payment['user_id'] == user_id and payment['loan_id'] == loan_id:
                no_of_emi_paid = payment['no_of_emi_paid']
                return_total = emi * no_of_emi_paid
                total_return += return_total
    
    response = {
        "total_amount": total_amount,
        "total_expenses": total_expense_amount,
        "total_return": total_return
    }
    
    return response

def get_line_chart_data(loans_data):
    data_by_month = {}
    data_by_year = {}

    # Dictionary to map month numbers to month names
    month_names = {
        1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
        7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
    }

    for row in loans_data:
        issued_date = row[2]
        if issued_date is not None:
            issued_date = datetime.datetime.strptime(issued_date, '%Y-%m-%d')
            month_number = issued_date.month
            month_name = month_names[month_number]  # Get month name
            year = issued_date.year
            formatted_date = f"{month_name}-{year}"  # Combine month name and year
            amount = row[3]
            
            if formatted_date in data_by_month:
                data_by_month[formatted_date] += amount
            else:
                data_by_month[formatted_date] = amount
            
            if year in data_by_year:
                data_by_year[year] += amount
            else:
                data_by_year[year] = amount
    
    return {
        "monthly": [{"x": formatted_date, "y": amount} for formatted_date, amount in data_by_month.items()],
        "yearly": [{"x": year, "y": amount} for year, amount in data_by_year.items()]
    }

def get_user_chart(loans_data):
    data_by_month = {}

    for loan in loans_data:
        issued_date = loan["issuedDate"]
        if issued_date:
            issued_date = datetime.datetime.strptime(issued_date, '%Y-%m-%d')
            month_name = calendar.month_name[issued_date.month]  # Get month name
            year = issued_date.year

            # Create a combined label like "March-2022"
            label = f"{month_name}-{year}"

            if label in data_by_month:
                data_by_month[label] += 1
            else:
                data_by_month[label] = 1

    chart_data = [{"x": label, "y": count} for label, count in data_by_month.items()]
    return chart_data


@app.route('/dashboard', methods=['GET'])
@cross_origin()
def get_charts():
    try:
        conn = connect.get_db_connection(config.DB_FILE)
        cursor = conn.cursor()
        
        #get loans data
        query = "SELECT id, user_id, issuedDate, amount, emi FROM loans"
        cursor.execute(query)
        loans_data = cursor.fetchall()
        
        #get expense data for expense_amount
        query = "SELECT expense_amount FROM expenses"
        cursor.execute(query)
        expense_data = cursor.fetchall()
        
        #get payment_info data
        query = "SELECT loan_id, user_id, no_of_emi_paid FROM payment_info"
        cursor.execute(query)
        payment_data = cursor.fetchall()
        
        conn.close()      
        pie_chart_data = get_pie_chart_data(loans_data, expense_data, payment_data)
        line_chart_data = get_line_chart_data(loans_data)
        user_chart_data = get_user_chart(loans_data)
    
        response = {
            "pie_chart_data": pie_chart_data,
            "line_chart_data": line_chart_data,
            "user_chart_data": user_chart_data
        }

        return jsonify(response)
    except Exception as e:
        return jsonify(message=str(e)), 500
    
    
    
if __name__ == '__main__':
    app.run(debug=True)
