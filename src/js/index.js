const calcScreen = document.querySelector('.calculator__screen');
const numbers = document.querySelectorAll('.calculator__number');

const plus = document.querySelector('#plusButton');
const equal  = document.querySelector('#equalButton');

let firstNumber = 0;
let secondNumber = 0;

// Got the number when clicked
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => {
        if (calcScreen.innerHTML == 0) {
            calcScreen.innerHTML = numbers[i].innerHTML;
        } else {
            calcScreen.innerHTML += numbers[i].innerHTML;
        }
    });
}

// Got the first number typed and wait the second for make the calc
plus.addEventListener('click', ()=> {
    if (calcScreen.innerHTML != '' && calcScreen.innerHTML != 0) {
        firstNumber = Number.parseInt(calcScreen.innerHTML);
        calcScreen.innerHTML = 0;
    }
})


// Make the operation
equal.addEventListener('click', () => {
    if (firstNumber != '' && firstNumber != 0 && calcScreen != '' && calcScreen != 0) {
        secondNumber = Number.parseInt(calcScreen.innerHTML);
        calcScreen.innerHTML = firstNumber + secondNumber;
    }
})