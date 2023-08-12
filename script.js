let firstOperand = "0";
let curOperation = "";
let secondOperand = "";
let result;

let calculation = "";
let pressedOperator = false;
let pressedEqual = false;




// Selecting Node elements
const displayLastEl = document.querySelector(".display-last");
const displayCurrentEl = document.querySelector(".display-current");

// IIFE
(function() {
  displayCurrent(firstOperand);
})()


const audio = document.querySelector("audio");

const dotButton = document.querySelector("#dot");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

const allButtonsNodeList = document.querySelectorAll("button");
const allButtonsArray = [...allButtonsNodeList];
////////////////////////////////////////////////////////////////////////////////////////
// Number 
const numberButtons = allButtonsArray.filter((btn) => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+btn.textContent);
});
numberButtons.forEach((number) => {
  number.addEventListener("click", numberBtnHandler.bind(null));
});

// Operation 
const operationButtons = allButtonsArray.filter((btn) => {
  return ["+", "-", "*", "/"].includes(btn.textContent);
});
operationButtons.forEach((operation) => {
  operation.addEventListener("click", operationBtnHandler.bind(null));
});

// Equal 
equalButton.addEventListener("click", equalBtnHandler.bind(null));

// Clear
clearButton.addEventListener("click", clearBtnHandler);

// Delete
deleteButton.addEventListener("click", deleteBtnHandler);


function numberBtnHandler(e) {
  let value = e.target.textContent;
  concatOperandAndDisplay(value);

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
  pressedOperator = false;

}

function clearBtnHandler() {
  setInitValue();
  displayCurrent(firstOperand);
}

function deleteBtnHandler() {
  let currentValue = displayCurrentEl.textContent;
  firstOperand = String(firstOperand);
  secondOperand = String(secondOperand);
  // deleteOneNumber pass true for firstOperand and false for secondOperand
  if(currentValue === firstOperand) deleteOneNumber(true);
  if(currentValue === secondOperand) deleteOneNumber(false);
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



// function displayCurrentError() {
//   displayCurrentEl.textContent = "Cannot divide by zero!";
// }
function displayCurrent(numberBtn) {
  console.log(`DISPLAYED: ${typeof numberBtn} ${numberBtn}`);
  displayCurrentEl.textContent = numberBtn;
}

function displayLastTwo(operand, operation) {
  if(!operand || !operation) return;
  calculation += operand + " " + operation + " ";
  console.log(calculation)
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

function clearCurr() {
  displayCurrentEl.textContent = "";
}

function concatOperandAndDisplay(value) {
  if(!pressedOperator) {
    firstOperand = parseFloat(firstOperand + value);
    displayCurrent(firstOperand);
  } else if(pressedOperator) {
    secondOperand = parseFloat(secondOperand + value);
    displayCurrent(secondOperand);
  }
}

function setInitValue() {
  firstOperand = "0";
  curOperation = "";
  secondOperand = "";
  pressedOperator = false;
  pressedEqual = false;
  result = "";
  calculation = "";
  clearLast();
  clearCurr();
}

function deleteOneNumber(operand) {

  console.log(operand ? firstOperand.length : secondOperand.length);
  if(operand ? firstOperand.length > 1 : secondOperand.length > 1) {
    if(operand) {
      firstOperand = firstOperand.slice(0, -1);
    } else {
      secondOperand = secondOperand.slice(0, -1);
    }
    displayCurrent(operand ? firstOperand : secondOperand);
  } else if(operand ? firstOperand.length === 1 : secondOperand.length === 1) {
    audio.currentTime = 0;
    audio.play();
    if(operand) {
      firstOperand = '0';
    } else {
      secondOperand = '0';
    }
    displayCurrent(operand ? firstOperand : secondOperand);
  }
}

