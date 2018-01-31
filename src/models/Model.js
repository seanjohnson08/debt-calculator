import ModelValidators from './ModelValidators';

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

    /**
     * Model properties that has been verified to match what is in the data store
     * @type {Object}
     */
    this._data = {};

    /**
     * Model properties that have been changed client-side, if any
     * @type {Object}
     */
    this._changedProperties = {};

    /**
     * A model is considered "isDirty" when it has not been persisted or has been modified without being persisted.
     * @type {Boolean}
     */
    this.isDirty = true;

    Object.assign(this._data, this.defaults(), properties);
  }

  _assignValidators() {
    const properties = this.properties();
    const keys = Object.keys(properties);

    keys.forEach(key => {
      Object.defineProperty(this, key, properties[key](key));
    });
  }

  /* Overrideable methods */
  get modelName() {
    throw new Error('No model name defined');
  }

  defaults() {
    return {};
  }

  properties() {
    return {};
  }

  /**
   * Undo any client-side changes to the model
   * @return {void}
   */
  revert() {
    this.isDirty = false;
    this._changedProperties = {};
  }

  /**
   * Commit any client-side changes and persist them to the data store
   * @return {void}
   */
  save() {
    this.isDirty = false;

    // Merge all uncommitted changes
    Object.assign(this._data, this._changedProperties);
    this._changedProperties = {};

    if (this.store) {
      this.store.commit();
    }
  }

  destroy() {
    this.destroyed = true;
    if (this.store) {
      this.store.destroyModel(this);
    }
  }

  valueOf() {
    return Object.assign({}, this._data, this._changedProperties);
  }
}

// Merge validators onto Model class as static
Object.assign(Model, ModelValidators);

export default Model;
