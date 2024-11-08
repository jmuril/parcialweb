// script.js

function appendToDisplay(value) {
    let display = document.getElementById('display').value;

    // Si es un número o un punto/coma decimal
    if (!isNaN(value) || value === '.' || value === ',') {
        // Permitir agregar una coma o un punto decimal si no hay ya un decimal en el número actual
        let lastNumber = display.split(/[\+\-\*\/]/).pop();
        
        // Solo permitir agregar una coma o un punto si el último número no tiene ya un decimal
        if ((value === '.' || value === ',') && (lastNumber.includes('.') || lastNumber.includes(','))) {
            return; // Evitamos agregar más de un decimal por número
        }
        
        document.getElementById('display').value += value;
    }
    // Si es un operador (+, -, *, /), lo añadimos tal cual
    else if (['+', '-', '*', '/'].includes(value)) {
        document.getElementById('display').value += value;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    let display = document.getElementById('display').value;
    // Eliminamos el último carácter
    document.getElementById('display').value = display.slice(0, -1);
}

function calculateResult() {
    let display = document.getElementById('display').value;
    
    // Reemplazamos todas las comas (,) por puntos (.) para realizar la operación correcta
    let cleanDisplay = display.replace(/,/g, '.');
    
    try {
        // Realizamos el cálculo
        let result = eval(cleanDisplay);
        
        // Formateamos el resultado para mostrar comas en los decimales
        document.getElementById('display').value = formatNumber(result.toString());
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function formatNumber(num) {
    // Separamos la parte entera de la decimal
    let parts = num.toString().split('.');

    // Formateamos la parte entera con separadores de miles
    parts[0] = parseInt(parts[0], 10).toLocaleString('es-ES');
    
    // Si hay parte decimal, la volvemos a unir usando una coma para los decimales
    return parts.length > 1 ? parts[0] + ',' + parts[1] : parts[0];
}
