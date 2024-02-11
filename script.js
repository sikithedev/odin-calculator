const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

let firstNumber;
let operator;
let secondNumber;

Array.from(digits).forEach((digit) => {
  digit.addEventListener("click", updateDisplay);
});

Array.from(operators).forEach((operator) => {
  operator.addEventListener("click", updateDisplay);
});

equals.addEventListener("click", () => {
  [firstNumber, operator, secondNumber] = display.textContent.split("");
  display.textContent = operate(
    operator,
    Number(firstNumber),
    Number(secondNumber)
  );
});

clear.addEventListener("click", clearDisplay);

function updateDisplay(e) {
  console.log(e);
  display.textContent += e.target.textContent;
}

function clearDisplay() {
  display.textContent = "";
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return Infinity;

  return a / b;
}

function operate(operator, a, b) {
  const operators = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "*": divide,
  };

  if (!operators[operator] || isNaN(a) || isNaN(b)) return "ERROR";

  return operators[operator](a, b);
}
