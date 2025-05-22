from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    op = data['operation']
    try:
        num1 = float(data['num1'])
        num2 = float(data['num2'])
    except (ValueError, KeyError):
        return jsonify({'result': 'Invalid input'})

    if op == 'add':
        result = num1 + num2
    elif op == 'sub':
        result = num1 - num2
    elif op == 'mul':
        result = num1 * num2
    elif op == 'div':
        if num2 == 0:
            result = "Error: Cannot divide by 0"
        else:
            result = num1 / num2
    else:
        result = "Invalid operation"

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)

