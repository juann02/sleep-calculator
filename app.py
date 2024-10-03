from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# store timezone offsets temporarily
timezone_offset = 0

@app.route('/set-timezone', methods=['POST'])
def set_timezone():
    global timezone_offset
    data = request.get_json()
    timezone_offset = int(data['offset'])
    return jsonify(success=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    global timezone_offset
    time_to_fall_asleep = int(request.form['time_to_fall_asleep'])

    #get current UTC time and adjust with the stored timezone offset
    current_time = datetime.utcnow() - timedelta(minutes=timezone_offset)

    #calculate suggested alarm time
    alarm_time = current_time + timedelta(minutes=450 + time_to_fall_asleep)  # 7.5 hours in minutes + time_to_fall_asleep

    #format the times for the result page
    formatted_current_time = current_time.strftime('%H:%M')
    formatted_alarm_time = alarm_time.strftime('%H:%M')

    return render_template('result.html', result={
        'current_time': formatted_current_time,
        'time_to_fall_asleep': time_to_fall_asleep,
        'alarm_time': formatted_alarm_time
    })

if __name__ == '__main__':
    app.run(debug=True)
