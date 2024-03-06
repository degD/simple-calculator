
// page elements
const calculatorDisplay = document.querySelector(".display");
const calculatorButtons = document.querySelectorAll(".button");

// global variables
let buttonClickBuffer = [];

// add event listeners to buttons to capture button clicks
calculatorButtons.forEach(button => {
    button.addEventListener("click", evt => {
        calculatorButtonEvaluator(button);
        console.log(`button press: ${evt.target.textContent}`);
        console.log(`button buffer: ${buttonClickBuffer}`);
    })
});

// debug calculation test
let testTokens = ["12", "+", "30", "*", "2"];
simpleInfixEvaluation(testTokens);

function calculatorButtonEvaluator(button) {
    if (button.textContent === "=") {
        let tokens = simpleMathLexer();
        let result = simpleInfixEvaluation(tokens);
        console.log(result);
    }
    else if (button.textContent === "C") {
        buttonClickBuffer = [];
    }
    else if (button.textContent === "CE") {
        buttonClickBuffer.pop();
    }
    else {
        buttonClickBuffer.push(button.textContent);
    }
}

function simpleMathLexer() {
    let num = "";
    let mathTokens = [];
    for (const ch of buttonClickBuffer) {
        if ("/*-+".includes(ch)) {
            mathTokens.push(num);
            mathTokens.push(ch);
            num = "";
        }
        else {
            num += ch;
        }
    }
    mathTokens.push(num);

    console.log(mathTokens);
    return mathTokens;
}

function simpleMathProcess(a, b, opr) {
    switch (opr) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
    }
}

function simpleInfixEvaluation(mathTokens) {
    let numberStack = [];
    let operatorStack = [];
    let precedence = {"/": 2, "*": 2, "-": 1, "+": 1};
    for (const token of mathTokens) {
        if (isNaN(+token)) {
            if (operatorStack.length == 0) {
                operatorStack.push(token);
            } else {
                if (precedence[token] > precedence[operatorStack.at(-1)]) {
                    operatorStack.push(token);
                } else {
                    while (operatorStack.length > 0) {
                        let num2 = +numberStack.pop();
                        let num1 = +numberStack.pop();
                        let opr = operatorStack.pop();
                        let result = simpleMathProcess(num1, num2, opr);
                        console.log(`${num1}${opr}${num2}=${result}`);
                        numberStack.push(result);
                    }
                }
            }
        } else {
            numberStack.push(token);
        }
        console.log("number stack: " + numberStack);
        console.log("operator stack: " + operatorStack);
    }
    while (operatorStack.length > 0) {
        let num2 = +numberStack.pop();
        let num1 = +numberStack.pop();
        let result = simpleMathProcess(num1, num2, operatorStack.pop());
        numberStack.push(result);
    }

    let finalResult = numberStack.at(0);
    console.log("result: " + finalResult);
    return finalResult;
}