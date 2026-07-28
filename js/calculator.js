// ==========================================
// Advanced Calculator
// calculator.js
// ==========================================

// ==========================================
// DOM ELEMENTS
// ==========================================

const expression = document.querySelector(".expression");
const result = document.querySelector(".result");

const buttons = document.querySelectorAll(".buttons .btn");
const memoryButtons = document.querySelectorAll(".memory");
const scientificButtons = document.querySelectorAll(".scientific");
const scientificToggle = document.getElementById("scientific-toggle");
const scientificPanel = document.querySelector(".scientific-buttons");
import { addHistory } from "./history.js";

// ==========================================
// STATE
// ==========================================

let currentExpression = "";
let currentResult = "0";

let ans = 0;
let memory = 0;

// ==========================================
// CONSTANTS
// ==========================================

const operators = [
    "+",
    "-",
    "*",
    "/",
    "%"
];

// ==========================================
// INITIALIZE
// ==========================================

function initCalculator() {

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            processInput(button.textContent);

        });

    });

    memoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            handleMemory(button.textContent);

        });

    });

    scientificButtons.forEach(button => {

        button.addEventListener("click", () => {

            handleScientific(button.textContent);

        });

    });
    scientificToggle.addEventListener("click", () => {

    scientificPanel.classList.toggle("hidden");

});

    updateDisplay();

}

// ==========================================
// MAIN CONTROLLER
// ==========================================

function processInput(value) {

    switch (value) {

        case "AC":
            clearCalculator();
            break;

        case "DEL":
            deleteLast();
            break;

        case "=":
            calculate();
            break;

        case "±":
            toggleSign();
            break;

        default:
            appendValue(value);

    }

}

// ==========================================
// NORMAL INPUT
// ==========================================

function appendValue(value) {
    if (
    currentResult === "Invalid Expression" ||
    currentResult === "Cannot divide by zero"
) {

    currentExpression = "";
    currentResult = "0";

}

    const last = currentExpression.slice(-1);

    if (
        operators.includes(last) &&
        operators.includes(value)
    ) {
        return;
    }

    if (value === ".") {

        const lastNumber = currentExpression
            .split(/[\+\-\*\/]/)
            .pop();

        if (lastNumber.includes(".")) {

            return;

        }

    }

    currentExpression += value;

    updateDisplay();

}

// ==========================================
// DISPLAY
// ==========================================

function updateDisplay() {

    expression.textContent = currentExpression || "0";

    result.textContent = currentResult;

}
// ==========================================
// CLEAR
// ==========================================

function clearCalculator() {

    currentExpression = "";
    currentResult = "0";

    updateDisplay();

}

// ==========================================
// DELETE
// ==========================================

function deleteLast() {

    currentExpression = currentExpression.slice(0, -1);

    updateDisplay();

}

// ==========================================
// TOGGLE SIGN
// ==========================================

function toggleSign() {

    if (!currentExpression) return;

    if (currentExpression.startsWith("-")) {

        currentExpression = currentExpression.substring(1);

    } else {

        currentExpression = "-" + currentExpression;

    }

    updateDisplay();

}

// ==========================================
// CALCULATE
// ==========================================

function calculate() {

    if (currentExpression.trim() === "") return;

    try {

        const answer = eval(currentExpression);
        const expressionHistory = currentExpression;

        if (answer === Infinity || answer === -Infinity) {

            currentResult = "Cannot divide by zero";

            updateDisplay();

            return;

        }

        currentResult = answer.toString();

        currentExpression = currentResult;

        ans = answer;
        addHistory(expressionHistory, currentResult);

    } catch {

        currentResult = "Invalid Expression";

    }

    updateDisplay();

}
// ==========================================
// SCIENTIFIC CONTROLLER
// ==========================================

function handleScientific(action) {

    switch (action) {

        case "%":
            percentage();
            break;

        case "x²":
            square();
            break;

        case "√":
            squareRoot();
            break;

        case "xʸ":
            power();
            break;

        case "ANS":
            useAnswer();
            break;

        case "COPY":
            copyResult();
            break;
        
        
        case "(":
            appendValue("(");
            break;

        case ")":
            appendValue(")");
            break;

    }

}

// ==========================================
// PERCENTAGE
// ==========================================

function percentage() {

    if (!currentExpression) return;

    try {

        const value = eval(currentExpression);

        const answer = value / 100;

        currentExpression = answer.toString();
        currentResult = answer.toString();
        ans = answer;

    } catch {

        currentResult = "Error";

    }

    updateDisplay();

}

// ==========================================
// SQUARE
// ==========================================

function square() {

    if (!currentExpression) return;

    try {

        const value = eval(currentExpression);

        const answer = value * value;

        currentExpression = answer.toString();
        currentResult = answer.toString();
        ans = answer;

    } catch {

        currentResult = "Error";

    }

    updateDisplay();

}

// ==========================================
// SQUARE ROOT
// ==========================================

function squareRoot() {

    if (!currentExpression) return;

    try {

        const value = eval(currentExpression);

        if (value < 0) throw new Error();

        const answer = Math.sqrt(value);

        currentExpression = answer.toString();
        currentResult = answer.toString();
        ans = answer;

    } catch {

        currentResult = "Error";

    }

    updateDisplay();

}

// ==========================================
// POWER
// ==========================================

function power() {

    currentExpression += "**";

    updateDisplay();

}

// ==========================================
// LAST ANSWER
// ==========================================

function useAnswer() {

    currentExpression += ans;

    updateDisplay();

}

// ==========================================
// COPY RESULT
// ==========================================

function copyResult() {

    navigator.clipboard.writeText(currentResult);

}

// ==========================================
// MEMORY CONTROLLER
// ==========================================

function handleMemory(action) {

    switch (action) {

        case "MC":
            memory = 0;
            break;

        case "MR":
            currentExpression += memory;
            break;

        case "M+":
            if (currentResult !== "Error") {
                memory += Number(currentResult);
            }
            break;

        case "M-":
            if (currentResult !== "Error") {
                memory -= Number(currentResult);
            }
            break;

    }

    updateDisplay();

}
// ==========================================
// HELPERS
// ==========================================

function isOperator(value) {

    return operators.includes(value);

}

function resetCalculator() {

    currentExpression = "";
    currentResult = "0";

    updateDisplay();

}

// ==========================================
// PUBLIC METHODS
// ==========================================

export {

    initCalculator

};