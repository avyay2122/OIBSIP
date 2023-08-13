const displayElement = document.getElementById("display");
let currentInput = "0";
let currentOperator = "";
let previousInput = "";

function updateDisplay() {
    displayElement.textContent = currentInput;
}

function clearCalculator() {
    currentInput = "0";
    currentOperator = "";
    previousInput = "";
    updateDisplay();
}

function handleNumberClick(number) {
    if (currentInput === "0" || currentInput === "Error") {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperatorClick(operator) {
    if (currentOperator !== "") {
        performCalculation();
    }
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = "0";
}

function performCalculation() {
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (currentOperator) {
        case "+":
            currentInput = (previous + current).toString();
            break;
        case "-":
            currentInput = (previous - current).toString();
            break;
        case "*":
            currentInput = (previous * current).toString();
            break;
        case "/":
            if (current === 0) {
                currentInput = "Error";
            } else {
                currentInput = (previous / current).toString();
            }
            break;
        default:
            return;
    }
    currentOperator = "";
    updateDisplay();
}

function handleEqualClick() {
    if (currentOperator !== "") {
        performCalculation();
    }
}

function handleButtonClick(event) {
    const buttonValue = event.target.getAttribute("data-value");
    if (buttonValue === "C") {
        clearCalculator();
    } else if (buttonValue === "=") {
        handleEqualClick();
    } else if (isNaN(buttonValue)) {
        handleOperatorClick(buttonValue);
    } else {
        handleNumberClick(buttonValue);
    }
}

document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", handleButtonClick);
});
