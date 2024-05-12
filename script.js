
// page elements
const calculatorDisplay = document.querySelector(".display");
const calculatorButtons = document.querySelectorAll(".button");

// calculator globals
let num1 = 0;
let num2 = 0;
let numBuffer = [];
let numSign = "+";
let currentOperation = "+";
let clearBuffer = false;

// add event listeners to buttons to capture button clicks
calculatorButtons.forEach(button => {
    button.addEventListener("click", evt => {
        calculatorButtonEvaluator(button);
        console.log(`button press: ${evt.target.textContent}`);
    })
});

/**
 * Function to evaluate calculator button presses
 * @param {Element} button Button HTML element
 */
function calculatorButtonEvaluator(button) {
    let buttonText = button.textContent;
    let operators = "/*-+=";
    if (buttonText == "C") {
        num1 = 0;
        num2 = 0;
        numBuffer = [];
        numSign = "+";
        currentOperation = "+";
        updateDisplay("_");
    }
    else if (buttonText == "CE") {
        numBuffer.pop();
        updateDisplay(numBuffer.join(""));
    }
    else if (Number.isInteger(+buttonText) || buttonText == ".") {
        // if pressed a digit button or the point button
        if (clearBuffer) {
            numBuffer = [];
            clearBuffer = false;
            updateDisplay();
        }
        if (numBuffer.at(0) == "0" && numBuffer.at(1) != "." && buttonText != ".") {
            numBuffer.splice(0, 1);
        }
        if (buttonText != "." || countItems(numBuffer, ".") < 1) {
            // prevent more then one point in a number
            numBuffer.push(buttonText);
            updateDisplay(numBuffer.join(""));
        }
    } 
    else if (operators.includes(buttonText)) {
        num2 = +numBuffer.join("");
        num1 = doMathOperation();
        num2 = 0;
        currentOperation = buttonText;
        clearBuffer = true;
        updateDisplay(num1);
        console.log(num1, num2, currentOperation);
    }
    else if (buttonText == "+/-") {
        // change sign of the number
        if (numSign == "+") {
            numBuffer.splice(0, 0, "-");
            numSign = "-";
        } else {
            numBuffer.splice(0, 1);
            numSign = "+";
        }
        clearBuffer = false;
        updateDisplay(numBuffer.join(""));
    }
}

/**
 * Do calculations for 4 basic operations: /, *, -, +
 * @returns {number} Result of the basic operation
 */
function doMathOperation() {
    switch (currentOperation) {
        case "/":
            if (num2 == 0) {
                console.log("YOU CANNOT DIVIDE TO 0!");
                return 42;
            }
            return num1 / num2;
        case "*":
            return num1 * num2;
        case "-":
            return num1 - num2;
        case "+":
            return num1 + num2;
        case "=":
            return num1;
    }
} 

function updateDisplay(newText) {
    calculatorDisplay.textContent = newText;
}

function countItems(arr, item) {
    let count = 0;
    for (const i of arr) {
        if (i == item) {
            count++;
        }
    }
    return count;
}