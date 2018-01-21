function formatBaseCurrency(numberValue) {
  const amount = `${numberValue}`; // Convert to string
  const dollars = amount.slice(0, -2);
  const cents = amount.slice(-2);
  return `${dollars}.${cents}`;
}

/**
 * Returns a formatted currency.
 * Ex: 100000 -> $1,000.00
 * @param  {Number} numberValue - An integer representing the number of cents
 * @return {String} The formatted result
 */
function formatCurrency(numberValue) {
  const formatted = formatBaseCurrency(numberValue)
    // Add commas
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

  return `$${formatted}`;
}

export function formatCurrencyNumber(numberValue) {
  const formatted = formatBaseCurrency(numberValue);
  if (numberValue < 100) {
    return '0' + formatted;
  } else {
    return formatted;
  }
}

export default formatCurrency;
