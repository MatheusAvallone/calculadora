const display = document.getElementById('display');
let currentMode = 'deg'; // deg, rad, grad

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="switchMode('${mode}')"]`).classList.add('active');
}

function convertAngle(value) {
    switch(currentMode) {
        case 'deg':
            return value * Math.PI / 180;
        case 'grad':
            return value * Math.PI / 200;
        default: // rad
            return value;
    }
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function calculateFunction(func) {
    try {
        const value = parseFloat(display.value);
        let result;

        switch(func) {
            // Funções Trigonométricas
            case 'sin':
                result = Math.sin(convertAngle(value));
                break;
            case 'cos':
                result = Math.cos(convertAngle(value));
                break;
            case 'tan':
                result = Math.tan(convertAngle(value));
                break;
            
            // Funções Trigonométricas Inversas
            case 'asin':
                result = Math.asin(value);
                if (currentMode === 'deg') result *= 180 / Math.PI;
                if (currentMode === 'grad') result *= 200 / Math.PI;
                break;
            case 'acos':
                result = Math.acos(value);
                if (currentMode === 'deg') result *= 180 / Math.PI;
                if (currentMode === 'grad') result *= 200 / Math.PI;
                break;
            case 'atan':
                result = Math.atan(value);
                if (currentMode === 'deg') result *= 180 / Math.PI;
                if (currentMode === 'grad') result *= 200 / Math.PI;
                break;

            // Funções Hiperbólicas
            case 'sinh':
                result = Math.sinh(value);
                break;
            case 'cosh':
                result = Math.cosh(value);
                break;
            case 'tanh':
                result = Math.tanh(value);
                break;

            // Funções Hiperbólicas Inversas
            case 'asinh':
                result = Math.asinh(value);
                break;
            case 'acosh':
                result = Math.acosh(value);
                break;
            case 'atanh':
                result = Math.atanh(value);
                break;

            // Funções Logarítmicas e Exponenciais
            case 'log':
                result = Math.log10(value);
                break;
            case 'ln':
                result = Math.log(value);
                break;
            case 'exp':
                result = Math.exp(value);
                break;

            // Funções de Potência e Raiz
            case 'sqrt':
                result = Math.sqrt(value);
                break;

            // Funções Especiais
            case 'factorial':
                result = factorial(value);
                break;
            case 'abs':
                result = Math.abs(value);
                break;
            case 'round':
                result = Math.round(value);
                break;
            case 'floor':
                result = Math.floor(value);
                break;
            case 'ceil':
                result = Math.ceil(value);
                break;
            case 'random':
                result = Math.random();
                break;
        }

        display.value = formatResult(result);
    } catch (error) {
        display.value = 'Erro';
        setTimeout(clearDisplay, 1000);
    }
}

function formatResult(result) {
    if (!Number.isFinite(result)) return 'Erro';
    
    // Se o número for muito pequeno ou muito grande, usa notação científica
    if (Math.abs(result) < 1e-10 || Math.abs(result) > 1e10) {
        return result.toExponential(8);
    }
    
    // Para números normais, limita a 8 casas decimais
    return Number(result.toFixed(8));
}

function calculate() {
    try {
        // Substitui x^y por ** para potência
        let expression = display.value.replace(/\^/g, '**');
        
        // Substitui π por Math.PI
        expression = expression.replace(/π/g, 'Math.PI');
        
        // Substitui e por Math.E
        expression = expression.replace(/e/g, 'Math.E');

        const result = eval(expression);
        display.value = formatResult(result);
    } catch (error) {
        display.value = 'Erro';
        setTimeout(clearDisplay, 1000);
    }
}
  