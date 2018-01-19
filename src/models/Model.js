function createValidator(assertion) {
  return (propertyName) => ({
    get() {
      return this._data[propertyName]
    },
    set(value) {
      if (!assertion(value)) {
        throw new Error(`Invalid value for ${propertyName}: ${value}`);
      }
      this._data[propertyName] = value;
    }
  });
}

class Model {
  constructor(properties) {
    this._assignValidators();

    this._data = {};

    Object.assign(this, this.defaults(), properties);
  }

  _assignValidators() {
    const properties = this.properties();
    const keys = Object.keys(properties);

    keys.forEach((key) => {
      Object.defineProperty(this, key, properties[key](key));
    });
  }

  /* Overrideable methods */

  defaults() {
    return {};
  }

  properties() {
    return {};
  }
}

/** Validators **/
Object.assign(Model, {
  Integer: createValidator((value) => Number.isInteger(value)),
  String: createValidator((value) => typeof value === 'string'),
  Enum(enumValues) {
    return createValidator((value) => enumValues.includes(value));
  }
});


export default Model;