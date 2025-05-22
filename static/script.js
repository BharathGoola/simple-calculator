function calculate(op, num1Id, num2Id, resultId) {
    const num1 = document.getElementById(num1Id).value;
    const num2 = document.getElementById(num2Id).value;

    if (num1 === '' || num2 === '') {
        document.getElementById(resultId).value = '';
        return;
    }

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            operation: op,
            num1: num1,
            num2: num2
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById(resultId).value = data.result;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const operations = [
        ['add', 'addNum1', 'addNum2', 'addResult'],
        ['sub', 'subNum1', 'subNum2', 'subResult'],
        ['mul', 'mulNum1', 'mulNum2', 'mulResult'],
        ['div', 'divNum1', 'divNum2', 'divResult']
    ];

    operations.forEach(([op, num1Id, num2Id, resultId]) => {
        document.getElementById(num1Id).addEventListener('input', () => calculate(op, num1Id, num2Id, resultId));
        document.getElementById(num2Id).addEventListener('input', () => calculate(op, num1Id, num2Id, resultId));
    });
});
