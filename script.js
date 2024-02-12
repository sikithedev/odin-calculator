const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const decimal = document.getElementById("decimal");
const equals = document.getElementById("equals");
const del = document.getElementById("delete");
const clear = document.getElementById("clear");

let firstNumber = "";
let secondNumber = "";
let operator = null;

digits.forEach((digit) => {
  digit.addEventListener("click", () => appendNumber(digit.textContent));
});

operators.forEach((op) => {
  op.addEventListener("click", () => setOperation(op.textContent));
});

equals.addEventListener("click", () => evaluate());

del.addEventListener("click", () => deleteNumber());

clear.addEventListener("click", () => clearDisplay());

function appendNumber(digit) {
  if (String(secondNumber).includes(".") && digit === ".") return;
  if (secondNumber.split("").every((c) => c === "0")) secondNumber = "";
  if (/[a-zA-Z]/.test(secondNumber)) secondNumber = "";

  secondNumber += digit;
  updateDisplay(secondNumber);
}

function setOperation(op) {
  evaluate();
  if (secondNumber !== "") firstNumber = secondNumber;
  operator = op;
  secondNumber = "";
}

function evaluate() {
  if (firstNumber === "" || operator === null) return;

  result = operate(operator, firstNumber, secondNumber);
  if (result === "lol") {
    secondNumber = "";
    updateDisplay("lol");
  } else {
    secondNumber = round(result);
    updateDisplay(secondNumber);
  }

  firstNumber = "";
  operator = null;
}

function deleteNumber() {
  if (display.textContent !== "0" && display.textContent !== "lol")
    display.textContent = display.textContent.slice(0, -1);

  secondNumber = display.textContent;
  updateDisplay(secondNumber);
}

function updateDisplay(string) {
  string = String(string);
  if (string === "") string = "0";
  else if (string === ".") string = "0.";

  display.textContent = string;
  decimal.disabled = display.textContent.includes(".");
}

function clearDisplay() {
  updateDisplay("0");
  firstNumber = "";
  secondNumber = "";
  operator = null;
}

function operate(operator, a, b) {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b === 0 ? "lol" : a / b),
  };

  console.log(Number(a), operator, Number(b));
  return operators[operator](Number(a), Number(b));
}

function round(number) {
  return Math.round(number * 10000) / 10000;
}
