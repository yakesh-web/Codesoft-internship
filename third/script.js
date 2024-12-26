const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');

        if (action === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.textContent = '0';
        } else if (action === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (['+', '-', '*', '/'].includes(action)) {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = action;
            }
        } else if (action === '=') {
            if (previousInput && currentInput && operator) {
                const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                display.textContent = result;
                currentInput = result.toString();
                previousInput = '';
                operator = null;
            }
        } else if (action === 'percent') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            display.textContent = currentInput;
        } else {
            currentInput += action;
            display.textContent = currentInput;
        }
    });
});

function calculate(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return b;
    }
}
