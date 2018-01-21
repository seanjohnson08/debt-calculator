import Model from './Model';

const DebtTypes = ['mortgage', 'car', 'loan', 'card'];

class Debt extends Model {
  get modelName() {
    return 'Debt';
  }

  properties() {
    return {
      description: Model.String,
      type: Model.Enum(DebtTypes),
      lifetime: Model.Integer,
      principle: Model.Integer,
      balance: Model.Integer,
      elapsedTime: Model.Integer,
      rate: Model.Integer,
      minimumMonthlyPayment: Model.Integer
    };
  }

  defaults() {
    return {
      id: Math.random(), // TODO: create auto increment id
      description: 'Home Mortgage',
      type: 'mortgage', // enum
      lifetime: 30 * 12, // Months
      principle: 212000, // Dollars
      balance: 19999, // Dollars
      elapsedTime: 2, // Months
      rate: 102, // Percent
      minimumMonthlyPayment: 100 // Dollars
    };
  }
}

export default Debt;
export { DebtTypes };
