const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // adiciona o dígito na tela da calculadora
    addDigit(digit) {
        // verifica se a operação já tem um ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation += digit;
        this.updateScreen();
    }

    // atualiza a tela da calculadora
    updateScreen() {
        this.currentOperationText.innerText = this.currentOperation;
    }

    // muda a operação matemática
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.currentOperationText.innerText + " " + operation;
        this.currentOperation = "";
    }

    // exclui o último dígito
    processDelOperation() {
        this.currentOperation = this.currentOperation.slice(0, -1);
        this.updateScreen();
    }

    processCEOperation() {
        // só apaga o current
        this.currentOperation = "";
        this.updateScreen();
    }

    // limpa todas as operações
    processClearOperation() {
        this.currentOperation = "";
        this.previousOperationText.innerText = "";
        this.updateScreen();
    }

    // processa todas as operações da calculadora
    processOperation(operation) {
        if (operation === "DEL") {
            this.processDelOperation();
            return;
        }

        if (operation === "C") {
            this.processClearOperation();
            return;
        }
        if (operation === "CE") {
            this.processCEOperation();
            return;
        }

        if (operation === "=") {
            const [previous, operator] = this.previousOperationText.innerText.split(
                " "
            );
            const current = this.currentOperation;

            if (!operator) {
                return;
            }

            let result;

            switch (operator) {
                case "+":
                    result = parseFloat(previous) + parseFloat(current);
                    break;
                case "-":
                    result = parseFloat(previous) - parseFloat(current);
                    break;
                case "*":
                    result = parseFloat(previous) * parseFloat(current);
                    break;
                case "/":
                    if (parseFloat(current) === 0) {
                        result = "Erro";
                    } else {
                        result = parseFloat(previous) / parseFloat(current);
                    }
                    break;
                default:
                    return;
            }

            this.previousOperationText.innerText = `${previous} ${operator} ${current} = ${result.toString()}`;
            this.currentOperation = result.toString();
            this.updateScreen();

            return;
        }

        this.changeOperation(operation);
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

// adicionar event listener ao pressionar uma tecla
document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Mapeia as teclas de operação para seus valores correspondentes
    const operationKeys = {
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
    };

    if (/\d/.test(key) || key === "." || /[+\-*/]/.test(key)) {
        if (key in operationKeys) {
            calc.processOperation(operationKeys[key]);
        } else {
            calc.addDigit(key);
        }
    } else if (key === "Backspace" || key === "Delete") {
        calc.processDelOperation();
    } else if (key === "c") {
        calc.processClearOperation();
    } else if (key === "=" || key === "Enter") {
        calc.processOperation("=");
    } else if (key === "Escape") {
        calc.processCEOperation();
    }
});

// adicionar event listener aos botões
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});

document.addEventListener("keydown", function(event) {
    const button = document.querySelector(`button[data-key="${event.key}"]`);
    if (button) {
      button.classList.add("button-hover");
    }
  });

  document.addEventListener("keyup", function(event) {
    const button = document.querySelector(`button[data-key="${event.key}"]`);
    if (button) {
      button.classList.remove("button-hover");
    }
  });