import Model from './Model';

class Decimal extends Model {
  /**
   * @hideconstructor
   */
  constructor(value, precision = 4) {
    super();

    Object.defineProperty(this, 'precision', {
      value: precision,
      writeable: false
    });

    const floatValue = parseFloat(value);
    const offset = Math.pow(10, this.precision);
    this.int = Math.round(floatValue * offset);
  }

  get modelName() {
    return 'Decimal';
  }

  properties() {
    return {
      int: Model.Integer
    };
  }

  defaults() {
    return {
      id: Math.random() // TODO: create auto increment id
    };
  }

  mult(number) {
    return number * this.int / Math.pow(10, this.precision);
  }

  toString() {
    if (this.int === null) {
      return null;
    }

    const str = `${this.int}`; // Convert to string
    const integer = str.slice(0, -1 * this.precision);
    const decimal = str.slice(-1 * this.precision);
    return `${integer}.${decimal}`;
  }

  valueOf() {
    if (this.int === null) {
      return null;
    }

    const offset = Math.pow(10, this.precision);
    return this.int / offset;
  }
}

export default Decimal;
