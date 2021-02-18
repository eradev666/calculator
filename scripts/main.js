'use strict';
const output = document.getElementById('main-output');

const values = document.querySelectorAll('.input-button');

function isOperator(entry) {
    return entry !== '=' && entry !== 'c' && entry !== '.' ? true : false;
}

let num1 = '';
let num2 = '';
let operator = '';
let opSet = false;
let resSet = false;
for (let i = 0; i < values.length; i++) {
    let value = values[i];
    value.addEventListener('click', (e) => {
        let input = e.target.value;
        let mainResult;
        if (isNaN(parseInt(input))) {
            if (isOperator(input)) {
                operator = input;
                opSet = true;
                disableOperators();
            } else {
                if (input === '=') {
                    resSet = true;
                    mainResult = calcNumbers(num1, num2, operator);
                    value.disabled = true;
                }
                if (input === 'c') {
                    clearCalc();
                }
                if (input === '.') {
                    if (!opSet) {
                        num1 += '.';
                    } else {
                        num2 += '.';
                    }
                }
            }
        } else {
            if (!opSet) {
                num1 += input;
            } else {
                num2 += input;
            }
        }
        if (!resSet) {
            output.value = num1 + ' ' + operator + ' ' + num2;
        } else {
            output.value = mainResult;
        }
    });
}

function calcNumbers(num1, num2, operator) {
    let parseNum1 = Number(num1);
    let parseNum2 = Number(num2);
    let result;

    if (operator === '+') {
        result = parseNum1 + parseNum2;
    } else if (operator === '-') {
        result = parseNum1 - parseNum2;
    } else if (operator === '*') {
        result = parseNum1 * parseNum2;
    } else if (operator === '/') {
        result = parseNum1 / parseNum2;
    } else {
        result = 'undefined';
    }

    return result;
}

function disableOperators() {
    for (let i = 0; i < values.length; i++) {
        let button = values[i];
        if (button.value === '+') {
            button.disabled = true;
        }
        if (button.value === '-') {
            button.disabled = true;
        }
        if (button.value === '*') {
            button.disabled = true;
        }
        if (button.value === '/') {
            button.disabled = true;
        }
    }
}

function enableOperators() {
    for (let i = 0; i < values.length; i++) {
        let button = values[i];
        if (button.value === '+') {
            button.disabled = false;
        }
        if (button.value === '-') {
            button.disabled = false;
        }
        if (button.value === '*') {
            button.disabled = false;
        }
        if (button.value === '/') {
            button.disabled = false;
        }
        if (button.value === '=') {
            button.disabled = false;
        }
    }
}

function clearCalc() {
    num1 = '';
    num2 = '';
    operator = '';
    opSet = false;
    resSet = false;
    output.value = '';
    enableOperators();
}