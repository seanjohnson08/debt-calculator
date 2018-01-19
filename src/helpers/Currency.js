/**
 * Returns a formatted currency.
 * Ex: 100000 -> $1,000.00
 * @param  {Number} numberValue - An integer representing the number of cents
 * @return {String} The formatted result
 */

function formatCurrency(numberValue) {
  const amount = `${numberValue}`; // Convert to string
  const dollars = amount.slice(0, -2)
    // Add commas
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

  const cents = amount.slice(-2);


  return `\$${dollars}.${cents}`;
}

export default formatCurrency;