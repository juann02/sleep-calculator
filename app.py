from flask import Flask, render_template, request
from main import calculate_alarm_time

app = Flask(__name__)

# Main route
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle sleep calculator
@app.route('/calculate', methods=['POST'])
def calculate():
    # Get the form data, with a default of '15' if empty
    time_to_fall_asleep = request.form.get('time_to_fall_asleep', '15')  # Ensure default is a string
    
    # Debugging: Print the input to the console
    print(f"Received time_to_fall_asleep: {time_to_fall_asleep}")
    
    try:
        # Attempt to convert input to an integer
        time_to_fall_asleep = int(time_to_fall_asleep)
    except ValueError:
        # If conversion fails, return error
        print("Error: Invalid input")
        return "Invalid input. Please enter a valid number."

    # If the input is valid, calculate the alarm time
    result = calculate_alarm_time(time_to_fall_asleep)
    
    return render_template('result.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
