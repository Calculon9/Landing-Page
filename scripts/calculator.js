
class Calculator {
    constructor (prevOperand, currOperand) {
        this.prevOperand = prevOperand,
        this.currOperand = currOperand,
        this.clear()
    }

    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        this.operation = operation;
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                result = prev + current;
                break
            case '-':
                result = prev - current;
                break
            case 'x':
                result = prev * current;
                break
            case '/':
                result = prev/current;
            default: 
                return
        }
        this.currOperand = result
        this.operation = undefined
        this.prevOperand = ''
    }

    update() {
        currOperandTextEl.innerText = this.currOperand;
        prevOperandTextEl.innerText = this.prevOperand;
        if (this.operation != null) {
            prevOperandTextEl.innerText = `${this.prevOperand} ${this.operation}`;
        }
        
    }
}



let numberButtons = document.querySelectorAll('[data-num]')
let operationButtons = document.querySelectorAll('[data-op]')
let equalsButton = document.querySelector('[data-eq]')
let deleteButton = document.querySelector('[data-del]')
let allClearButton = document.querySelector('[data-ac]')

let prevOperandTextEl = document.querySelector('.previous-op')
let currOperandTextEl = document.querySelector('.current-op')


const calculator = new Calculator(prevOperandTextEl,currOperandTextEl);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.update()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})

equalsButton.addEventListener('click', (button) => {
    calculator.compute();
    calculator.update();
})

allClearButton.addEventListener('click', (button) => {
    calculator.clear();
    calculator.update();
})

deleteButton.addEventListener('click', (button) => {
    calculator.delete();
    calculator.update();
})