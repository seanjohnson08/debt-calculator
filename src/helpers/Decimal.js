class Decimal {
  /**
   * @hideconstructor
   */
  constructor(_value, _precision = 4) {
    let value = _value;

    let int;
    let precision = _precision;

    switch (typeof value) {
      case 'object':
        ({ int, precision } = value);
        break;
      case 'string':
      case 'number':
        value = parseFloat(value);
        const offset = Math.pow(10, precision);
        int = Math.round(value * offset);
        break;
    }

    this.int = int;
    Object.defineProperty(this, 'precision', {
      value: precision,
      writeable: false,
      enumerable: true
    });
  }

  /**
   * add offsets the smaller integer to match the larger integer then creates a Decimal with the sum
   * @param {Number or Decimal} number [description]
   */
  add(number) {
    const p1 = this.precision;

    if (number instanceof Decimal) {
      const p2 = number.precision;

      let bigP;
      let int1, int2;
      if (p1 > p2) {
        int1 = this.int;
        int2 = number.int * Math.pow(10, p1 - p2);
        bigP = p1;
      } else {
        int1 = this.int * Math.pow(10, p2 - p1);
        int2 = number.int;
        bigP = p2;
      }

      const rtn = new Decimal(0, bigP);
      rtn.int = int1 + int2;
      return rtn;
    }

    const rtn = new Decimal(0, p1);
    rtn.int = this.int + number * Math.pow(10, p1);
    return rtn;
  }

  sub(number) {
    const p1 = this.precision;

    if (number instanceof Decimal) {
      const p2 = number.precision;

      let bigP;
      let int1, int2;
      if (p1 > p2) {
        int1 = this.int;
        int2 = number.int * Math.pow(10, p1 - p2);
        bigP = p1;
      } else {
        int1 = this.int * Math.pow(10, p2 - p1);
        int2 = number.int;
        bigP = p2;
      }

      const rtn = new Decimal(0, bigP);
      rtn.int = int1 - int2;
      return rtn;
    }

    const int2 = number * Math.pow(10, p1);

    const rtn = new Decimal(0, p1);
    rtn.int = this.int - int2;
    return rtn;
  }

  mult(number) {
    const p1 = this.precision;

    if (number instanceof Decimal) {
      const p2 = number.precision;

      let bigP, littleP;
      if (p1 > p2) {
        bigP = p1;
        littleP = p2;
      } else {
        bigP = p2;
        littleP = p1;
      }

      let rtn = number.int * this.int;
      Math.round(rtn, -1 * littleP);

      rtn /= Math.pow(10, p2) * Math.pow(10, p1);
      return new Decimal(rtn, bigP);
    }

    return new Decimal(this.int * number / Math.pow(10, p1), p1);
  }

  divide(number) {
    const p1 = this.precision;

    if (number instanceof Decimal) {
      const p2 = number.precision;

      const bigP = p1 > p2 ? p1 : p2;

      let rtn = this.int / number.int;
      rtn *= Math.pow(10, p2 - p1);

      return new Decimal(rtn, bigP);
    }

    return new Decimal(this.int / number / Math.pow(10, p1), p1);
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
