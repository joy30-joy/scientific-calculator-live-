document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('calc-display');
    const buttons = document.getElementsByClassName('btn');
    let currentvalue = "";

    function evaluateResult() {
        const convertedvalue = currentvalue
            .replace("x", "*")
            .replace("÷", "/")
            .replace("%", "*0.01");
        const result = eval(convertedvalue);
        currentvalue = result.toString();
        display.value = currentvalue;
    }

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', function () {
            const value = button.innerText;
            if (value === "AC") {
                currentvalue = "";
                display.value = currentvalue;
            } else if (value === "=") {
                evaluateResult();
            } else {
                currentvalue += value;
                display.value = currentvalue;
            }
        });
    }
});