let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    // Prevent multiple operators in a row
    if (expression && !isOperator(expression[expression.length - 1])) {
        expression += op;
        updateDisplay();
    } else if (expression && isOperator(expression[expression.length - 1])) {
        // Replace the last operator
        expression = expression.slice(0, -1) + op;
        updateDisplay();
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '.'].includes(char);
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = expression;
}

function calculate() {
    if (!expression) return;

    try {
        // Replace the division and multiplication symbols with standard operators
        let result = eval(expression.replace(/÷/g, '/').replace(/×/g, '*'));
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
        setTimeout(() => {
            display.value = '';
        }, 1000);
    }
}

// Allow keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});