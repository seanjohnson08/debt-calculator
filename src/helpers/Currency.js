/**
 * Returns a formatted currency.
 * Ex: 100000 -> $1,000.00
 * @param  {Decimal} decimalValue - A Decimal representing the number of cents
 * @return {String} The formatted result
 */
function formatCurrency(decimalValue) {
  const formatted = decimalValue
    .toFixed(2)
    // Add commas
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

  return `$${formatted}`;
}

export default formatCurrency;
