// Class
class Calculator {
    constructor(prevNumTextElement, currentNumTextElement) {
        this.prevNumTextElement = prevNumTextElement; 
        this.currentNumTextElement = currentNumTextElement;
        this.clear();
    }

    clear() {
        this.currentNum = '';
        this.prevNum = '';
        this.operation = undefined;
    }

    delete() {
        this.currentNum = this.currentNum.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentNum.includes('.')) return;
        this.currentNum = this.currentNum.toString() + number.toString();
    }

    choseOperation(operation) {
        if (this.currentNum === '') return;
        if (this.prevNum !== '') {
            this.compute();
        }

        this.operation = operation;
        this.prevNum = this.currentNum;
        this.currentNum = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevNum);
        const current = parseFloat(this.currentNum);
        if (isNaN(prev) || isNaN(current)) return;

        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentNum = computation;
        this.operation = undefined; 
        this.prevNum = '';
    }

    getDisplayedNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentNumTextElement.innerText = this.getDisplayedNumber(this.currentNum);
        
        if (this.operation != null) {
            this.prevNumTextElement.innerText = `${this.prevNum} ${this.operation}`;
        } else {
            this.prevNumTextElement.innerText = '';

        }
    }
}

// Constants
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const del = document.querySelector('[data-delete]');
const ac = document.querySelector('[data-allClear]');
const prevNum = document.querySelector('[data-previous-number]');
const currentNum = document.querySelector('[data-current-number]');

// Calculator Object
const calculator = new Calculator(prevNum, currentNum);

// Numbers button
numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    });
});

// Operation Buttons
operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperation(button.innerText);
        calculator.updateDisplay();
    });
})

// Equals button
equals.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

ac.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();  
});

del.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})