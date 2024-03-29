
// page elements
const calculatorDisplay = document.querySelector(".display");
const calculatorButtons = document.querySelectorAll(".button");

// calculator globals
let num1 = 0;
let num2 = 0;
let numBuffer = [];
let numSign = "+";
let currentOperation = "+";

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
        updateDisplay();
    }
    else if (Number.isInteger(+buttonText) || buttonText == ".") {
        // if pressed a digit button or the point button
        if (numBuffer.length == 0) {
            updateDisplay();
        }
        numBuffer.push(buttonText);
        updateDisplay(numBuffer.join(""));
    } 
    else if (operators.includes(buttonText)) {
        num2 = +numBuffer.join("");
        num1 = doMathOperation();
        num2 = 0;
        currentOperation = buttonText;
        numBuffer = [];
        updateDisplay(num1);
        console.log(num1, num2, currentOperation);
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