class Debt {
  constructor(properties) {
    const defaults = {
      description: 'Home Mortgage',
      type: 'mortgage', // enum
      lifetime: 30 * 12, // Months
      principle: 212000, // Dollars
      balance: 19999, // Dollars
      elapsedTime: 2, // Months
      rate: 102, // Percent
      minimumMonthlyPayment: 100 // Dollars
    };

    Object.assign(this, defaults, properties);
  }
}

export default Debt;