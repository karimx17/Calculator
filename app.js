// Where your gonna store the data
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        // Everytime you create a new calculator it will reset 
        this.clear();
    }
    // Functions

    // The clear function here makes the display empty 
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined
    }
    delete() {

        // Taking the string and cutting the last number off 
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    // Adding the number to show on screen 
    appendNumber(number) {

        // If you typed a period and you already have a period, return (stop the function) 
        if (number === "." && this.currentOperand.includes(".")) return;

        // Adding multiple numbers: you must convert to string or else JS will think your're trying to add them together 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Adding the operation (+,-,*,/) to the screen 
    chooseOperation(operation) {

        // If the current operand is empty, then return (stop the code) 
        if (this.currentOperand === "") return

        // If the previous operand is NOT empty then do some math 
        if (this.previousOperand !== "") {
            this.compute()
        }

        // This operation is equal to the operation we passed in 
        this.operation = operation

        // When done typing the number, move it to the previous operand so we can type the new number 
        this.previousOperand = this.currentOperand
        this.currentOperand = ""

    }

    // The math behind the calculator 
    compute() {

        // Creating a variable to be the result of our computation 
        let computation

        // Taking the previous & current operand and converting it back to a number 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        // If you hit the equals button and dont have a previous number or current number then cancel stop the code 
        if (isNaN(prev) || isNaN(current)) return

        //  A bunch of "if" statements, creating the logic for the calculator 
        switch (this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break

            // Anytime none of the values get excuted then excute the defualt 
            default:
                return
        }
        // Current operand is equal to our computation 
        this.currentOperand = computation

        this.operation = undefined
        this.previousOperand = ""
    }

    getDisplayNumber(number) {

        // Turning the number to a string 
        const stringNumber = number.toString()

        // Splitting the number is two parts 

        // First part is grabbing the numbers before the zero 
        const integerDigits = parseFloat(stringNumber.split(".")[0])

        // Second part is grabbing the numbers after the zero 
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay

        // If someone doesnt enter an integer then leave blank 
        if (isNaN(integerDigits)) {
            integerDisplay = ""

            // If someone enters an integer then add it 
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {

                // No decimal places after the value gets convereted to a string 
                maximumFractionDigits: 0
            })
        }
        // If our decimal digits doesnt equal to null then that means user inputed decimal digits 
        if (decimalDigits != null) {

            // Return the integer with a period and the decimal digits 
            return `${integerDisplay}.${decimalDigits}`

        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        // If we have an operation, then display the operator element 
        if (this.operation !== null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

            // Clearing the value 
        } else {
            this.previousOperandTextElement.innerText = ""
        }
    }
}

// Selecting HTML elements
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const operatorButtons = document.querySelectorAll(".operator");
const previousOperandTextElement = document.querySelector(".previousInput")
const currentOperandTextElement = document.querySelector(".currentInput");
const equal = document.querySelector(".equal");

// How to define classes 
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Looping over buttons, then listeting to whenever user hits a button 
numberButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Getting the number from the button element to show 
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

// Looping through the operators then listeing to whenever users hit it 
operatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Grabbbing the operation from the button element to show 
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Listening to when someone hit the equals button "=" then calculates and updates 
equal.addEventListener("click", function (button) {
    calculator.compute();
    calculator.updateDisplay()
})

// Clearing the display 
clearButton.addEventListener("click", function (button) {
    calculator.clear();
    calculator.updateDisplay()
})
// Deleting the last value 
deleteButton.addEventListener("click", function (button) {
    calculator.delete();
    calculator.updateDisplay()
})