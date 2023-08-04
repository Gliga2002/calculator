let firstOperand = '';
let curOperation = '';
let secondOperand = '';
let result;

let calculation = '';
let pressedOperator = false;
let doublepressedOperator = false;
let pressedEqual = false;

// Selecting Node elements
const displayLastEl = document.querySelector('.display-last');
const displayCurrentEl = document.querySelector('.display-current');

const audio = document.querySelector('audio');

const dotButton = document.querySelector('#dot');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

const allButtonsNodeList = document.querySelectorAll('button');
const allButtonsArray = [...allButtonsNodeList];
////////////////////////////////////////////////////////////////////////////////////////
// Number handlers
const numberButtons = allButtonsArray.filter((btn) => {
  return [0, 1, 2, 3, 4, 5, 6, 7 ,8, 9].includes(+btn.textContent);
})
numberButtons.forEach((number) => {
  number.addEventListener('click',numberBtnHandler.bind(null))
})


// Operation handlers
const operationButtons = allButtonsArray.filter((btn) => {
  return ['+', '-', '*', '/'].includes(btn.textContent);
})
operationButtons.forEach((operation) => {
  operation.addEventListener('click',operationBtnHandler.bind(null))
})

// Operation equal handler
equalButton.addEventListener('click', equalBtnHandler.bind(null))

// Operation clear handler
clearButton.addEventListener('click', () => {
  displayCurrentEl.textContent = 0;
  firstOperand = '';
  curOperation = '';
  secondOperand = '';
  pressedOperator = false;
  doublepressedOperator = false;
  pressedEqual = false;
  result = '';
  calculation = '';
  clearLast();
})

// Operation delete handler
deleteButton.addEventListener('click', () => {

    if(pressedEqual) {
      const convertToString = firstOperand + '';
      firstOperand = convertToString.slice(0, -1);
      console.log(`FIRST OPERAND DELETE ${firstOperand}`)
      if(firstOperand.length >= 1) {
        displayCurrent(firstOperand);
      } else {
        audio.currentTime = 0;
        audio.play();
        // alert('You cant delete more')
      }
    }
  
    if(!pressedOperator) {
      firstOperand = firstOperand.slice(0, -1);
    console.log(`FIRST OPERAND DELETE ${firstOperand}`)
    if(firstOperand.length >= 1) {
      displayCurrent(firstOperand);
    } else {
      audio.currentTime = 0;
      audio.play();
      // alert('You cant delete more')
    }
    }
    
  
    if(pressedOperator) {
      secondOperand = secondOperand.slice(0, -1);
      console.log(`SECOND OPERAND DELETE ${secondOperand}`)
      if(secondOperand.length >= 1) {
        displayCurrent(secondOperand);
      } 
    }
   
    

})

displayCurrentEl.textContent = 0;




function numberBtnHandler(e) {
  let value = e.target.textContent;

  if(pressedEqual && pressedOperator) {
    console.log('ovdeeeeeeeeeeeeeeeeeeee')
    pressedOperator = false;
    pressedEqual = false;
    firstOperand = '';
    calculation = '';
    clearLast();
  }  

  if(!pressedEqual && pressedOperator) {
    pressedOperator = true;
  }

  if(doublepressedOperator) {
    pressedOperator = true;
  }

  console.log(`OVDE GA PROMENI NESTO ${pressedOperator}`);
  if(!pressedOperator) {
    firstOperand += value;
    console.log(`FIRST OPERAND: ${firstOperand}`);
    displayCurrent(firstOperand);
  } else {
    console.log('ovde');
    secondOperand += value;
    console.log(`SECOND OPERAND: ${secondOperand}`);
    displayCurrent(secondOperand);
  } 
    




  

}

function operationBtnHandler(e) {
  
  if(pressedEqual && pressedOperator) {
    curOperation = e.target.textContent;
    // U prvom operandu imas rezultat!!!
    console.log('tu si macko');
    calculation = '';
    clearLast();
    displayLastTwo(firstOperand, curOperation);
    pressedOperator = true;
    pressedEqual = false;
    
  }  else if(!pressedEqual && pressedOperator) {
    nextOperation = e.target.textContent;
    doublepressedOperator = true;
    result = operator(curOperation, firstOperand, secondOperand);
    firstOperand = result;
    curOperation = nextOperation;
    secondOperand = '';
    calculation = '';
    clearLast();
    displayCurrent(result);
    displayLastTwo(firstOperand, nextOperation);
    
  }

  
  else {
    curOperation = e.target.textContent;
    pressedOperator = true;
    displayLastTwo(firstOperand, curOperation);
  }
  
 
  
}

function equalBtnHandler(e) {
  

  let equalValue = e.target.textContent;
  displayLastTwo(secondOperand, equalValue);
  result = operator(curOperation, firstOperand, secondOperand);
  firstOperand = result;
  curOperation = '';
  secondOperand = '';
  displayCurrent(result);
  pressedEqual = true;
}


function multiplay(num1, num2) {
  return Math.round((num1 * num2) * 10) / 10;
}

function divide(num1, num2) {
  return Math.round((num1 / num2) * 10) / 10;
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

function displayCurrent(numberBtn) {
  console.log(`DISPLAYED: ${numberBtn}`);
  displayCurrentEl.textContent = numberBtn['0'] === '0' ? parseInt(numberBtn) : numberBtn
}



function displayLastTwo(operand, operation) {
  calculation += parseInt(operand) + ' ' + operation + ' ';
  displayLastEl.textContent = calculation;
}

function displayLastOne(operationOroperand) {
  calculation +=  operationOroperand + ' '
  displayLastEl.textContent = calculation;
}

function clearLast() {
  displayLastEl.textContent = '';
}


// calculator.addEventListener('click', function(e) {
//   const target = e.target.closest('.btn-cl');
//   if(!target) return;
//   const targetTxt = target.textContent;
//   // if no opeartions, add first number and display it
//   if(!operations) {
//     checkPressedNumber(targetTxt);
//     displayCurrent(firstOperand)
//   }


//   // check for operation and display to last
//   checkPressedOperator(targetTxt);
//   displayLast(firstOperand, operations);

//   console.log(operations)


//   // Chek second operand
//   if(checkPressedOperator(targetTxt) === undefined && operations) {
//     checkPressedNumber2(targetTxt)
//     displayCurrent(secondOperand);
//   }

// })

// equalBtn.addEventListener('click', function(e) {
//   console.log(operator(operations, firstOperand, secondOperand));
// })





// function checkPressedNumber(targetTxt) {
//   switch(targetTxt) {
//     case '0':
//       return firstOperand += 0;
//     case '1':
//       return firstOperand += 1;
//     case '2':
//       return firstOperand += 2;
//     case '3':
//       return firstOperand += 3;
//     case '4':
//       return firstOperand += 4;
//     case '5':
//       return firstOperand += 5;
//     case '6':
//       return firstOperand += 6;
//     case '7':
//       return firstOperand += 7;
//     case '8':
//       return firstOperand += 8;
//     case '9':
//       return firstOperand += 9;

//   }
// }

// function checkPressedNumber2(targetTxt) {
//   switch(targetTxt) {
//     case '0':
//       console.log('OVDE')
//       return secondOperand += 0;
//     case '1':
//       return secondOperand += 1;
//     case '2':
//       return secondOperand += 2;
//     case '3':
//       return secondOperand += 3;
//     case '4':
//       return secondOperand += 4;
//     case '5':
//       return secondOperand += 5;
//     case '6':
//       return secondOperand += 6;
//     case '7':
//       return secondOperand += 7;
//     case '8':
//       return secondOperand += 8;
//     case '9':
//       return secondOperand += 9;

//   }
// }

// function checkPressedOperator(targetTxt) {
//   switch(targetTxt) {
//     case '+':
//       return operations = "+";
//     case '-':
//       return operations = "-";
//     case '*':
//       return operations = "*";
//     case '/':
//       return operations = "/";
//     // case '=':
//     //   return operations = "=";
//     default:
//       return undefined;
//   }
// }