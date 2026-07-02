// TASK 15: Function to determine NHIF contribution based on Gross Salary

function calculateNHIF(grossSalary) {
    if (grossSalary <= 5999) return 150;
    else if (grossSalary <= 7999) return 300;
    else if (grossSalary <= 11999) return 400;
    else if (grossSalary <= 14999) return 500;
    else if (grossSalary <= 19999) return 600;
    else if (grossSalary <= 24999) return 750;
    else if (grossSalary <= 29999) return 850;
    else if (grossSalary <= 34999) return 900;
    else if (grossSalary <= 39999) return 950;
    else if (grossSalary <= 44999) return 1000;
    else if (grossSalary <= 49999) return 1100;
    else if (grossSalary <= 59999) return 1200;
    else if (grossSalary <= 69999) return 1300;
    else if (grossSalary <= 79999) return 1400;
    else if (grossSalary <= 89999) return 1500;
    else if (grossSalary <= 99999) return 1600;
    else return 1700; // For 100,000 and above
}

// TASK 16: Function to calculate NSSF contribution (6% capped at 18,000 base as specified)
function calculateNSSF(grossSalary) {
    let taxableAmount = grossSalary >= 18000 ? 18000 : grossSalary;
    return taxableAmount * 0.06;
}

// TASK 17: Function to calculate NHDF (Affordable Housing Levy)
function calculateNHDF(grossSalary) {
    return grossSalary * 0.015;
}

// TASK 19: Function to compute PAYE based on KRA Tax Bands & Personal Relief
function calculatePAYE(taxableIncome) {
    if (taxableIncome <= 0) return 0;
    
    let tax = 0;
    let remaining = taxableIncome;

    // Band 1: First KES 24,000 @ 10%
    if (remaining > 24000) {
        tax += 24000 * 0.10;
        remaining -= 24000;
    } else {
        tax += remaining * 0.10;
        return Math.max(0, tax - 2400); // Less monthly personal relief
    }

    // Band 2: Next KES 8,333 @ 25%
    if (remaining > 8333) {
        tax += 8333 * 0.25;
        remaining -= 8333;
    } else {
        tax += remaining * 0.25;
        return Math.max(0, tax - 2400);
    }

    // Band 3: Next KES 467,667 @ 30%
    if (remaining > 467667) {
        tax += 467667 * 0.30;
        remaining -= 467667;
    } else {
        tax += remaining * 0.30;
        return Math.max(0, tax - 2400);
    }

    // Band 4: Next KES 300,000 @ 32.5%
    if (remaining > 300000) {
        tax += 300000 * 0.325;
        remaining -= 300000;
    } else {
        tax += remaining * 0.325;
        return Math.max(0, tax - 2400);
    }

    // Band 5: Over KES 800,000 @ 35%
    tax += remaining * 0.35;

    let finalPaye = tax - 2400; // Deduct KES 2,400 KRA Personal Relief
    return finalPaye > 0 ? finalPaye : 0;
}

// Main event handler attached cleanly to form submission
document.getElementById('tax_form').addEventListener('submit', function(event) {    
    event.preventDefault(); 

    // Extract user inputs safely
    let basicSalary = Number(document.getElementById('basic').value) || 0;
    let benefits = Number(document.getElementById('benefits').value) || 0;
    
    // TASK 15: Find Gross Salary
    let grossSalary = basicSalary + benefits;
    let nhifDeduction = calculateNHIF(grossSalary);
    
    // TASK 16 & 17: Deductions
    let nssfDeduction = calculateNSSF(grossSalary);
    let nhdfDeduction = calculateNHDF(grossSalary);
    
    // TASK 18: Calculate Taxable Income
    let taxableIncome = grossSalary - (nssfDeduction + nhdfDeduction + nhifDeduction);
    if (taxableIncome < 0) taxableIncome = 0;

    // TASK 19: Compute PAYE
    let payeeDeduction = calculatePAYE(taxableIncome);
    
    // TASK 20: Net Salary
    let netSalary = grossSalary - (nhifDeduction + nhdfDeduction + nssfDeduction + payeeDeduction);

    // Update HTML display safe elements (Ensures no crash if element is missing)
    if (document.getElementById('gross')) document.getElementById('gross').innerHTML = grossSalary.toFixed(2);
    if (document.getElementById('nhif')) document.getElementById('nhif').innerHTML = nhifDeduction.toFixed(2);
    if (document.getElementById('nssf')) document.getElementById('nssf').innerHTML = nssfDeduction.toFixed(2);
    if (document.getElementById('nhdf')) document.getElementById('nhdf').innerHTML = nhdfDeduction.toFixed(2);
    if (document.getElementById('taxable')) document.getElementById('taxable').innerHTML = taxableIncome.toFixed(2);
    if (document.getElementById('payee')) document.getElementById('payee').innerHTML = payeeDeduction.toFixed(2);
    if (document.getElementById('net')) document.getElementById('net').innerHTML = netSalary.toFixed(2);
});

// Function to handle printing the salary breakdown receipt
document.getElementById('receipt').addEventListener('click', function () {
    window.print();
});