import ModelValidators, { getDiff } from './ModelValidators';

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
    this._changedProperties = {};

    /**
     * A model is considered "isDirty" when it has not been persisted or has been modified without being persisted.
     * @type {Boolean}
     */
    this.isDirty = true;

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
    Object.assign(this._data, getDiff(this, 'new'));
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
    const diff = getDiff(this, 'new');
    return Object.assign({}, this._data, diff);
  }
}

// Merge validators onto Model class as static
Object.assign(Model, ModelValidators);

export default Model;
