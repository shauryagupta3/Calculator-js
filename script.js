let inputDisplay = document.getElementById("input");
let outputDisplay = document.getElementById("output");
let backspace = document.getElementById("backspace");
var operator = "0";
var previousNumber = 0;
var currentNumber = 0;
var value = 0;

document.querySelectorAll("input").forEach((element) => {
  element.addEventListener("click", function () {
    if (element.value == "AC") {
      reset();
    } else if (element.value == "=" && inputDisplay.innerHTML.length > 0) {
      solution();
    } else if (inputDisplay.innerHTML.length >= 8) {
      // pass
    } else {
      inputDisplay.innerHTML += element.value;
    }
  });
});

document.querySelector("body").addEventListener("keydown", function (Event) {
  const key = Event.key; // const {key} = event; ES6+
  if (key === "Backspace" || key === "Delete") {
    erase();
  } else if (key === "Enter" || key === "=") {
    solution();
  } else if (
    key === "+" ||
    key === "-" ||
    key === "/" ||
    key === "*" ||
    key === "%" ||
    parseFloat(key) ||
    key === "0"||
    key === "."
  ) {
    if (inputDisplay.innerHTML.length < 9) {
      inputDisplay.innerHTML += key;
    }
  }
});

backspace.addEventListener("click", function () {
  erase();
});

const erase = () => {
  inputDisplay.innerHTML = inputDisplay.innerHTML.slice(0, -1);
};

const reset = () => {
  inputDisplay.innerHTML = "";
  outputDisplay.innerHTML = "";
  previousNumber = 0;
  currentNumber = 0;
};

const evaluate = (operator, num1, num2) => {
  if (inputDisplay.innerHTML.length > 0) {
    switch (operator) {
      case "+":
        currentNumber = num1 + num2;
        return currentNumber;
      case "-":
        currentNumber = num1 - num2;
        return currentNumber;
      case "*":
        currentNumber = num1 * num2;
        return currentNumber;
      case "X":
        currentNumber = num1 * num2;
        return currentNumber;
      case "/":
        currentNumber = num1 / num2;
        return currentNumber;
      case "%":
        currentNumber = (num1 * num2) / 100;
        return currentNumber;
      default:
        break;
    }
  }
};

const solution = () => {
  var text = inputDisplay.innerHTML.toString();
  var array = text.split(/([+*X%/-])/);
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    if (
      array[i] == "X" ||
      array[i] == "*" ||
      array[i] == "/" ||
      array[i] == "%" ||
      array[i] == "+" ||
      array[i] == "-"
    ) {
      switch (i) {
        case 1:
          previousNumber = parseFloat(array[i - 1]);
          currentNumber = parseFloat(array[i + 1]);
          evaluate(array[i], previousNumber, currentNumber);
          console.log(currentNumber);
          break;

        default:
          previousNumber = currentNumber;
          currentNumber = parseFloat(array[i + 1]);
          evaluate(array[i], previousNumber, currentNumber);
          console.log(currentNumber);
          break;
      }
      outputDisplay.innerHTML = currentNumber;
    }
  }
};
