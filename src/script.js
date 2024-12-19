document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("calc-display");
    const buttons = document.getElementsByClassName("btn");
    let currentvalue = "";
    let isRadians = true;

    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    function toggleRadDeg() {
        isRadians = !isRadians;
        document.querySelector(".btn-rad").classList.toggle("btn-primary", isRadians);
        document.querySelector(".btn-deg").classList.toggle("btn-primary", !isRadians);
    }

    function evaluateResult() {
        try {
            let convertedvalue = currentvalue
                .replace(/x/g, "*")
                .replace(/÷/g, "/")
                .replace(/%/g, "*0.01")
                .replace(/sin/g, isRadians ? "Math.sin" : "(Math.sin(Math.PI/180*")
                .replace(/cos/g, isRadians ? "Math.cos" : "(Math.cos(Math.PI/180*")
                .replace(/tan/g, isRadians ? "Math.tan" : "(Math.tan(Math.PI/180*")
                .replace(/ln/g, "Math.log")
                .replace(/π/g, "Math.PI")
                .replace(/log/g, "Math.log10")
                .replace(/e/g, "Math.E")
                .replace(/√/g, "Math.sqrt")
                .replace(/(\d+)!/g, (_, num) => factorial(Number(num)));

            if (!isRadians) {
                convertedvalue = convertedvalue.replace(/Math\.(sin|cos|tan)\(Math\.PI\/180\*(.*?)\)/g, "Math.$1($2)");
            }

            const result = eval(convertedvalue);
            currentvalue = result.toString();
            display.value = currentvalue;
        } catch {
            currentvalue = "ERROR";
            display.value = currentvalue;
        }
    }

    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            const value = button.innerText;
            if (value === "AC") {
                currentvalue = "";
                display.value = "0";
            } else if (value === "=") {
                evaluateResult();
            } else if (value === "Rad" || value === "Deg") {
                toggleRadDeg();
            } else {
                currentvalue += value;
                display.value = currentvalue;
            }
        });
    });
});