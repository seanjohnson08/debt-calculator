function getProperty(property) {
  return this._changedProperties[property]
    ? this._changedProperties[property].new
    : this._data[property];
}

function setProperty(property, value) {
  if (!this._changedProperties[property]) {
    this._changedProperties[property] = {
      old: this._data[property],
      new: null
    };
  }
  this._changedProperties[property].new = value;
  this.isDirty = true;
}

/**
 * Gets a diff from a model's changedProperties hash
 * @param  {Model} model
 * @param  {String} type  - can be "new" or "old". "new" refers to uncommitted changes.
 * @return {[type]}       [description]
 */
function getDiff(model, type = 'new') {
  return Object.keys(model._changedProperties).reduce((result, key) => {
    result[key] = model._changedProperties[key][type];
    return result;
  }, {});
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
      return getProperty.call(this, propertyName);
    },
    set(value) {
      let _value = value;
      if (translator) {
        _value = translator(value);
      }
      if (!assertion(_value)) {
        throw new Error(`Invalid value for ${propertyName}: ${_value}`);
      }
      setProperty.call(this, propertyName, _value);
    }
  });
}

const ModelValidators = {
  /**
   * Boolean data type
   * @memberOf Model
   */
  Boolean: createValidator(value => typeof value === 'boolean'),

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

  Number: createValidator(
    value => typeof value === 'number' && !Number.isNaN(value),
    value => {
      if (typeof value === 'string') {
        if (!value.length) {
          return 0;
        }
        return parseFloat(value);
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
};

export default ModelValidators;
export { getDiff };
