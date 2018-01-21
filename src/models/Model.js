/**
 * Creates a base class for all models to extend.
 * @class Model
 * @example
 * class Person extends Model {
 *   properties() {
 *     return {
 *       firstName: Model.String,
 *       lastName: Model.String
 *     };
 *   }
 * }
 */
class Model {
  constructor(properties) {
    this._assignValidators();

    this._data = {};

    Object.assign(this, this.defaults(), properties);
  }

  _assignValidators() {
    const properties = this.properties();
    const keys = Object.keys(properties);

    keys.forEach(key => {
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

  valueOf() {
    return this._data;
  }
}

/**
 * Creates a higher-order function that returns a property descriptor
 * that defines a getter (to retreive from hidden _data state)
 * and a setter (that validates values are valid before assigning to _data)
 *
 * @param  {function} assertion - A function that accepts 1 argument (value)
 * and returns true or false if the value is valid.
 * @param {function} [translator] - Will attempt to convert values before storing
 * @return {function} - A function that returns a property descriptor.
 */
function createValidator(assertion, translator) {
  return propertyName => ({
    get() {
      return this._data[propertyName];
    },
    set(value) {
      let _value = value;
      if (translator) {
        _value = translator(value);
      }
      if (!assertion(_value)) {
        throw new Error(`Invalid value for ${propertyName}: ${_value}`);
      }
      this._data[propertyName] = _value;
    }
  });
}

/* Validators */
Object.assign(Model, {
  /**
   * Integer data type
   * @memberof Model
   */
  Integer: createValidator(
    value => Number.isInteger(value),
    value => {
      if (typeof value === 'string') {
        if (!value.length) {
          return 0;
        }
        return parseInt(value, 10);
      }
      return value;
    }
  ),

  /**
   * String data type
   * @memberof Model
   */
  String: createValidator(value => typeof value === 'string'),

  /**
   * Enum data type
   * @param {Array} enumValues - a list possible values for the enum.
   * @memberof Model
   * @example
   * myProperty: Model.Enum(['value1', 'value2'])
   */
  Enum(enumValues) {
    return createValidator(value => enumValues.includes(value));
  }
});

export default Model;
