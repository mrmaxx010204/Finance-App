from flask import Flask, request, jsonify
import sqlite3
import datetime

app = Flask(__name__)

def generate_emi_dates(start_date, tenure, emi_type):
    emi_dates = []
    current_date = datetime.datetime.strptime(start_date, '%Y-%m-%d')
    if emi_type == 'monthly':
        for _ in range(tenure):
            emi_dates.append({
                'date': current_date.strftime('%Y-%m-%d'),
                'status': 'pending'
            })
            current_date += datetime.timedelta(days=30)
    elif emi_type == 'weekly':
        for _ in range(tenure):
            emi_dates.append({
                'date': current_date.strftime('%Y-%m-%d'),
                'status': 'pending'
            })
            current_date += datetime.timedelta(weeks=1)
    return emi_dates

@app.route('/api/generate-emi-dates', methods=['POST'])
def generate_and_save_emi_dates():
    try:
        data = request.json
        user_id = data['user_id']
        loan_id = data['loan_id']
        start_date = data['emi_start_date']
        tenure = data['tenure']
        emi_type = data['type']

        emi_dates = generate_emi_dates(start_date, tenure, emi_type)

        conn = sqlite3.connect('your_database.db')  # Replace with your SQLite3 database path
        cursor = conn.cursor()

        for emi_date in emi_dates:
            date = emi_date['date']
            status = emi_date['status']
            cursor.execute('INSERT INTO loan_details (user_id, loan_id, emi_date, status) VALUES (?, ?, ?, ?)',
                           (user_id, loan_id, date, status))

        conn.commit()
        conn.close()

        return jsonify(message='Emi dates generated and saved successfully'), 200

    except Exception as e:
        return jsonify(message='Error: {}'.format(str(e))), 500

if __name__ == '__main__':
    app.run(debug=True)
