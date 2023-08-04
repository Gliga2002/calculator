const screen = document.querySelector('.display');
const calculator = document.querySelector('.calculator');

const displayLastEl = document.querySelector('.display-last');
const displayCurrentEl = document.querySelector('.display-current')
displayCurrentEl.textContent = 0


function multiplay(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function operator(sign, num1, num2) {
  switch(sign) {
    case '+':
      return add(num1,num2)
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiplay(num1, num2);
    case '/':
      return divide(num1, num2)
  }
}


let firstOperand = '';
let operations = '';
let secondOperand = '';


function displayCurrent(numberBtn) {
  displayCurrentEl.textContent = parseInt(numberBtn);
}

function displayLast(firstOperand, operations) {
  const calculation = `${firstOperand} ${operations}`;
  displayLastEl.textContent = calculation;
}

calculator.addEventListener('click', function(e) {
  const target = e.target.closest('.btn-cl');
  if(!target) return;
  const targetTxt = target.textContent;
  checkPressedNumber(targetTxt);
  if(!operations) {
    displayCurrent(firstOperand)
  }
  checkPressedOperator(targetTxt);
  if(checkPressedOperator(targetTxt) === undefined) return
  displayLast(firstOperand, operations);
  

})





function checkPressedNumber(targetTxt) {
  switch(targetTxt) {
    case '0':
      return firstOperand += 0;
    case '1':
      return firstOperand += 1;
    case '2':
      return firstOperand += 2;
    case '3':
      return firstOperand += 3;
    case '4':
      return firstOperand += 4;
    case '5':
      return firstOperand += 5;
    case '6':
      return firstOperand += 6;
    case '7':
      return firstOperand += 7;
    case '8':
      return firstOperand += 8;
    case '9':
      return firstOperand += 9;

  }
}

function checkPressedOperator(targetTxt) {
  switch(targetTxt) {
    case '+':
      return operations = "+";
    case '-':
      return operations = "-";
    case '*':
      return operations = "*";
    case '/':
      return operations = "/";
    case '=':
      return operations = "=";
    default:
      return undefined;
  }
}