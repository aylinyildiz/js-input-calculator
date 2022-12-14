const operatorArray = ["+", "-", "/", "*", "(", ")"];
class CalculatorClass {
  constructor(x) {
    this.x = x;
  }

  main() {
    var x = this.x;
    let processArray = [];
    let parsedIntArr = [];
    let startIndex;
    let endIndex;
    let insideOfBrackets;
    let insideOfBracketsText;
    let splittedArr;

    //Checking parentheses for operation priority
    if (x.includes("(")) {
      //start and end indexes of parentheses
      startIndex = x.indexOf("(") + 1;
      endIndex = x.indexOf(")");

      //(5+8)-8*5 The part between the parenthesis is calculated separately.
      //5+8
      insideOfBrackets = x.substring(startIndex, endIndex);
      splittedArr = splitMulti(insideOfBrackets, operatorArray);

      splittedArr.forEach((element) => {
        parsedIntArr.push(parseInt(element));
      });

      processArray = getProcessArray(x, startIndex, endIndex);
    } else {
      //operation without parentheses
      startIndex = 0;
      endIndex = x.length;
      insideOfBrackets = x;
      splittedArr = splitMulti(insideOfBrackets, operatorArray);

      splittedArr.forEach((element) => {
        parsedIntArr.push(parseInt(element));
      });

      processArray = getProcessArray(x, startIndex, endIndex);
    }

    let bracketsResult = calculate(parsedIntArr, processArray);

    //Calculate inside the parentheses and replace it with a value
    //(5+8)-8*5 -> 13-8*5
    //(13)-8*5 -> 13-8*5
    insideOfBracketsText = "(" + insideOfBrackets + ")";
    x = x.replace(insideOfBracketsText, bracketsResult);

    //13-8*5 we separate the numbers and get the operators
    //Numbers array and operand array are defined for the new order and operations without parentheses.
    let tempParsedIntArr = [];
    let tempProcessArr = [];
    tempParsedIntArr = getSplittedArrs(x);
    tempProcessArr = getProcessArray(x, startIndex, endIndex);

    let processArray1 = [];
    for (let i = 0; i < x.length; i++) {
      if (operatorArray.includes(x[i])) {
        processArray1.push(x[i]);
      }
    }
    //input focus colors
    var result = calculate(tempParsedIntArr, processArray1);
    var calcu = document.getElementById("calc");
    if (isNaN(result)) {
      document.getElementById("result").textContent = "?";
      calcu.focus();
      calcu.classList.remove("focusedInput");
      calcu.classList.remove("wrongFocusedInput");
      calcu.classList.add("wrongFocusedInput");
    } else {
      document.getElementById("result").textContent = result;
      calcu.classList.remove("wrongFocusedInput");
      calcu.classList.remove("focusedInput");
      calcu.classList.add("focusedInput");
    }

    return result;
  }
}

//ex:5+8-8*5 the operator breaks down all of its operations
//result: [5,8,8,5]
//Separates operands in string from string.
function splitMulti(str, operands) {
  var tempChar = operands[0];
  for (var i = 1; i < operands.length; i++) {
    str = str.split(operands[i]).join(tempChar);
  }
  str = str.split(tempChar);
  return str; //return number array
}

//5+8-8*5 takes operators entered
//["+","-","*"]
function getProcessArray(arrNumber, startIndex, endIndex) {
  let processArray = [];
  for (let i = startIndex; i < endIndex; i++) {
    if (operatorArray.includes(arrNumber[i])) {
      processArray.push(arrNumber[i]);
    }
  }
  return processArray;
}

//splitMulti function returns values as string
//we need integer values to be able to operate
function getSplittedArrs(arrNumber) {
  let parsedIntArr = [];
  splittedArr = splitMulti(arrNumber, operatorArray);
  splittedArr.forEach((element) => {
    parsedIntArr.push(parseInt(element));
  });
  return parsedIntArr;
}

function calculate(numberArray, processArray) {
  let n1, n2;
  for (let i = 0; i < numberArray.length - 1; i++) {
    if (i === 0) {
      n1 = numberArray[i];
    }

    n2 = numberArray[i + 1];
    let process = processArray[i];

    switch (process) {
      case "+":
        n1 = n1 + n2;
        break;
      case "-":
        n1 = n1 - n2;
        break;
      case "/":
        n1 = n1 / n2;
        break;
      case "*":
        n1 = n1 * n2;
        break;
      default:
        break;
    }
  }
  return n1;
}
