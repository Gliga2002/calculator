let firstOperand = "0";
let curOperation = "";
let secondOperand = "";
let result;

let calculation = "";
let pressedOperator = false;
let pressedEqual = false;
let divideByZero = false;


// Selecting Node elements
const displayLastEl = document.querySelector(".display-last");
const displayCurrentEl = document.querySelector(".display-current");
const calculator = document.querySelector('.calculator');

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


// Dot
dotButton.addEventListener('click', dotBtnHandler);

calculator.addEventListener('click', function(e) {
  console.log('Clicked button');
  const clickedBtn = e.target.closest('.btn-cl')
  if(!clickedBtn) return;
  clickedBtn.style.boxShadow = "4px 2px 2px gray";
  setTimeout(()=> {
    clickedBtn.removeAttribute("style");
  }, 200)
})

// Btn Handlers

function numberBtnHandler(e) {
  resetAfterDivisionByZero();
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
    let nextOperation = e.target.textContent;
    if(!checkDivisionByZero(secondOperand,curOperation)) return;
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
  //Check division with 0

  if(!checkDivisionByZero(secondOperand, curOperation)) return;

  if(!displayLastTwo(secondOperand,equal)) return;

  const result = parseFloat(operator(curOperation, firstOperand, secondOperand));
  console.log(result);
  if(!result) setInitValue();
  displayCurrent(result);
 
  firstOperand = result;
  curOperation = '';
  secondOperand = '';
  calculation = '';
  pressedEqual = true;
  pressedOperator = false;

}

function clearBtnHandler() {
  clearAll();
}

function deleteBtnHandler() {
  if(divideByZero) {
    audio.play();
    return;
  }
  let currentValue = displayCurrentEl.textContent;
  firstOperand = String(firstOperand);
  secondOperand = String(secondOperand);
  // deleteOneNumber pass true for firstOperand and false for secondOperand
  if(currentValue === firstOperand) deleteOneNumber(true);
  if(currentValue === secondOperand) deleteOneNumber(false);
}

function dotBtnHandler() {
  resetAfterDivisionByZero();
  let currentText = displayCurrentEl.textContent;
  firstOperand = String(firstOperand);
  secondOperand = String(secondOperand);
  if(currentText === firstOperand) {
    if(firstOperand.split('.').length - 1 === 0) {
      firstOperand += ".";
      displayCurrent(firstOperand);
    } else {
      return
    }
  } else {
    if(secondOperand.split('.').length - 1 === 0) {
      secondOperand += ".";
      displayCurrent(secondOperand);
    } else {
      return
    }
  }
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

// Delete Button handler

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

// Divison by Zero

function checkDivisionByZero(secondOperand, curOperation) {
  if(secondOperand === 0 && curOperation === '/') {
    setInitValue();
    displayCurrentError();
    divideByZero = true;
    manipulateClass(true);
    return;
  } else {
    return true;
  }
}

function resetAfterDivisionByZero() {
  if(divideByZero) {
    clearAll();
    divideByZero = false;
  }
}

function manipulateClass(toggle) {
  if(toggle) {
    operationButtons.forEach((operation) => {
      operation.classList.add('opacity');
      operation.setAttribute('disabled','true');
    });
    equalButton.classList.add('opacity');
    equalButton.setAttribute('disabled','true');
    dotButton.classList.add('opacity');
    dotButton.setAttribute('disabled','true');
  } else {
    operationButtons.forEach((operation) => {
      operation.classList.remove('opacity');
      operation.removeAttribute('disabled');
    });
    equalButton.classList.remove('opacity');
    equalButton.removeAttribute('disabled');
    dotButton.classList.remove('opacity');
    dotButton.removeAttribute('disabled');
  }
}


// Displaying

function displayCurrentError() {
  displayCurrentEl.textContent = "Cannot divide by zero!";
}


function displayCurrent(numberBtn) {
  console.log(`DISPLAYED: ${typeof numberBtn} ${numberBtn}`);
  displayCurrentEl.textContent = numberBtn;
}

function displayLastTwo(operand, operation) {
  console.log(operand, operation);
  if(operand === ''  || !operation) return;
  calculation += operand + " " + operation + " ";
  console.log(calculation)
  displayLastEl.textContent = calculation;
  return true;
}



function clearLast() {
  displayLastEl.textContent = "";
}

function clearCurr() {
  displayCurrentEl.textContent = "";
}

function clearAll() {
  setInitValue();
  displayCurrent(firstOperand);
  manipulateClass(false);
}


// Calculator logic

function multiplay(num1, num2) {
  const multiplication = num1 * num2;
  return multiplication.toFixed(3);
}

function divide(num1, num2) {
    const division = num1 / num2;
    return division.toFixed(3);
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