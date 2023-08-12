let firstOperand = "0";
let curOperation = "";
let secondOperand = "";
let result;

let calculation = "";
let pressedOperator = false;
let doublePresedOperator = false;
let pressedEqual = false;


// Selecting Node elements
const displayLastEl = document.querySelector(".display-last");
const displayCurrentEl = document.querySelector(".display-current");

const audio = document.querySelector("audio");

const dotButton = document.querySelector("#dot");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

const allButtonsNodeList = document.querySelectorAll("button");
const allButtonsArray = [...allButtonsNodeList];
////////////////////////////////////////////////////////////////////////////////////////
// Number handlers
const numberButtons = allButtonsArray.filter((btn) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+btn.textContent);
});
numberButtons.forEach((number) => {
  number.addEventListener("click", numberBtnHandler.bind(null));
});

// Operation handlers
const operationButtons = allButtonsArray.filter((btn) => {
  return ["+", "-", "*", "/"].includes(btn.textContent);
});
operationButtons.forEach((operation) => {
  operation.addEventListener("click", operationBtnHandler.bind(null));
});

// Operation equal handler
equalButton.addEventListener("click", equalBtnHandler.bind(null));

// Operation clear handler
clearButton.addEventListener("click", () => {

});

// Operation delete handler
// deleteButton.addEventListener("click", () => {
  
// })


// IIFE
(function() {
  displayCurrent(firstOperand);
})()



function numberBtnHandler(e) {
  let value = e.target.textContent;
  concatOperandAndDisplay(value);
  // if(pressedEqual) {
  //   firstOperand = parseFloat(value);
  //   curOperation = '';
  //   secondOperand = '';
  //   calculation = '';
  //   pressedEqual = false;
  //   pressedOperator = false;
  //   clearLast();
  // }


}



function operationBtnHandler(e) {

  if(curOperation !== '' && firstOperand && secondOperand === "" && pressedEqual === false) {
    calculation = "";
    curOperation = e.target.textContent;
    displayLastTwo(firstOperand, curOperation);
    pressedOperator = true;
  } else if(curOperation === '') {
    console.log('tu')
    curOperation = e.target.textContent;
    displayLastTwo(firstOperand, curOperation);
    pressedOperator = true;
  } else  if(curOperation !== "") {
    console.log('ili ovdeeeeeeeeeeeee')
    let nextOperation = e.target.textContent;
    const result = parseFloat(operator(curOperation, firstOperand, secondOperand));
    displayCurrent(result);
   
    firstOperand = result;
    curOperation = nextOperation;
    secondOperand = '';
    calculation = '';
    displayLastTwo(firstOperand, curOperation);

    pressedEqual = false;
    pressedOperator = true;
  }

 
  

 
  

  

}

function equalBtnHandler(e) {
  let equal = e.target.textContent;
  if(!displayLastTwo(secondOperand,equal)) return;
  const result = parseFloat(operator(curOperation, firstOperand, secondOperand));
  displayCurrent(result);
 
  firstOperand = result;
  curOperation = '';
  secondOperand = '';
  calculation = '';
  pressedEqual = true;


}

function multiplay(num1, num2) {
  const multiplication = num1 * num2;
  return multiplication.toFixed(3);
}

function divide(num1, num2) {
  // console.log(num1, num2);
  // if (parseFloat(num2) === "0") {
  //   alert("Cannot div ide by 0!");
  //   return undefined;
  // } else {
    const division = num1 / num2;
    console.log(division);
    return division.toFixed(3);
  // }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function operator(sign, num1, num2) {
  num1 = +num1;
  num2 = +num2;
  switch (sign) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiplay(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

function displayCurrent(numberBtn) {
  console.log(`DISPLAYED: ${typeof numberBtn} ${numberBtn}`);
  displayCurrentEl.textContent = numberBtn;
}

// function displayCurrentError() {
//   displayCurrentEl.textContent = "Cannot divide by zero!";
// }

function displayLastTwo(operand, operation) {
  if(!operand || !operation) return;
  calculation += operand + " " + operation + " ";
  displayLastEl.textContent = calculation;
  return true;
}

// function displayLastOne(operationOroperand) {
//   calculation += operationOroperand + " ";
//   displayLastEl.textContent = calculation;
// }

function clearLast() {
  displayLastEl.textContent = "";
}

// function clearCurr() {
//   displayCurrentEl.textContent = "";
// }

function concatOperandAndDisplay(value) {
  if(!pressedOperator) {
    firstOperand = parseFloat(firstOperand + value);
    displayCurrent(firstOperand);
  } else if(pressedOperator) {
    secondOperand = parseFloat(secondOperand + value);
    displayCurrent(secondOperand);
  }
}

