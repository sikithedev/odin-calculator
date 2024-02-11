const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

let firstNumber = "",
  secondNumber = "",
  operator = null;

Array.from(digits).forEach((digit) => {
  digit.addEventListener("click", (e) => {
    if (!secondNumber && e.target.textContent === "0") return;

    secondNumber += e.target.textContent;
    updateDisplay(secondNumber);
  });
});

Array.from(operators).forEach((op) => {
  op.addEventListener("click", (e) => {
    if (firstNumber && operator && secondNumber) {
      secondNumber = operate(operator, firstNumber, secondNumber);
      updateDisplay(secondNumber);
    }

    firstNumber = secondNumber;
    operator = e.target.textContent;
    secondNumber = "";
  });
});

equals.addEventListener("click", () => {
  console.log(firstNumber, operator, secondNumber);
  if (firstNumber !== null && operator && secondNumber !== null) {
    secondNumber = operate(operator, firstNumber, secondNumber);
    updateDisplay(secondNumber);

    if (secondNumber === "lol") secondNumber = "";
  }

  firstNumber = "";
  operator = null;
});

clear.addEventListener("click", () => {
  updateDisplay("0");
  firstNumber = "";
  secondNumber = "";
  operator = null;
});

function updateDisplay(number) {
  display.textContent = number;
}

function operate(operator, a, b) {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b === 0 ? "lol" : a / b),
  };

  console.log(a, operator, b);
  if (a === null && b === null) return 0;
  if (!operator || a === null) return b;

  return operators[operator](Number(a), Number(b));
}
