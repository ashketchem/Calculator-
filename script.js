let display = document.getElementById('display');
let prevDisplay = document.getElementById('prev-display');
let currentNumber = '';
let previousNumber = '';
let operator = '';

let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    let value = button.textContent;

    if (value === 'AC') {
      display.value = '';
      prevDisplay.value = '';
      currentNumber = '';
      previousNumber = '';
      operator = '';
    } else if (value === 'DEL') {
      currentNumber = currentNumber.slice(0, -1);
      display.value = currentNumber;
    } else if (value === '=') {
      if (operator && previousNumber !== '') {
        currentNumber = performCalculation(previousNumber, currentNumber, operator);
        display.value = currentNumber;
        prevDisplay.value = '';
        previousNumber = '';
        operator = '';
      }
    } else if (value === '.') {
      if (!currentNumber.includes('.')) {
        currentNumber += value;
        display.value = currentNumber;
      }
    } else if (value === '%') {
      currentNumber = (parseFloat(currentNumber) / 100).toString();
      display.value = currentNumber;
    } else if (button.hasAttribute('data-op')) {
      if (currentNumber !== '') {
        if (previousNumber !== '') {
          currentNumber = performCalculation(previousNumber, currentNumber, operator);
        }
        previousNumber = currentNumber;
        currentNumber = '';
        operator = value;
        prevDisplay.value = `${previousNumber} ${operator}`; // Display previous number and operator
        display.value = ''; // Clear display for the next number
      }
    } else {
      currentNumber += value;
      display.value = currentNumber;
    }
  });
});

function performCalculation(prev, curr, op) {
  let result;
  let prevNum = parseFloat(prev);
  let currNum = parseFloat(curr);
  switch (op) {
    case '+':
      result = prevNum + currNum;
      break;
    case '-':
      result = prevNum - currNum;
      break;
    case '*':
      result = prevNum * currNum;
      break;
    case '/':
      result = currNum === 0 ? 'Error' : prevNum / currNum;
      break;
    default:
      result = curr;
  }
  return result.toString();
}