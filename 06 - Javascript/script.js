const priceper = 1.72; /* this variable is the price per litre, which is set at 1.72 AED for this exercise! */

function calculate() { /* this is the function that is called when the get total button is clicked */
    const litres = parseFloat(document.getElementById('litres').value) || 0; /* this like takes the input in the litres input and turns it into a number that we can multiply with our fixed price! if its empty, it defaults to 0 */
    const total = (litres * priceper).toFixed(2); /* our numbers get multiplied and so that we dont get a long long number with lots od decimals, i found that using toFixed can round our output to only 2 decimal places */
    document.getElementById('total-display').textContent = 'AED ' + total; /* this takes our product and puts AED infront of it. it then gets displayed in our total */
}