import Model from './Model';

const DebtTypes = ['mortgage', 'car', 'loan', 'card'];

class Debt extends Model {
  get modelName() {
    return 'Debt';
  }

  properties() {
    return {
      id: Model.Number,
      description: Model.String,
      type: Model.Enum(DebtTypes),
      lifetime: Model.Integer,
      principle: Model.Decimal,
      balance: Model.Decimal,
      elapsedTime: Model.Integer,
      rate: Model.Number,
      minimumMonthlyPayment: Model.Decimal
    };
  }

  defaults() {
    return {
      id: Math.random(), // TODO: create auto increment id
      description: 'Home Mortgage',
      type: 'mortgage', // enum
      lifetime: 30 * 12, // Months
      principle: 2120.0, // Dollars
      balance: 199.99, // Dollars
      elapsedTime: 2, // Months
      rate: 1.02, // Percent
      minimumMonthlyPayment: 100 // Dollars
    };
  }
}

export default Debt;
export { DebtTypes };
