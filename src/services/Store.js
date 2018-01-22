import Debt from '../models/Debt';

const modelTypes = {
  Debt
};

let _instance;

const localStorage = window.localStorage || { getItem() {}, setItem() {} };
/**
 * Store singleton
 * The store is responsible for managing, writing, and retrieving all data in our application.
 */
class Store {
  /**
   * @hideconstructor
   */
  constructor() {
    if (!_instance) {
      _instance = this;
      this.load();
    }

    return _instance;
  }

  /**
   * Load data into our application
   */
  load() {
    const dataFromLocalStorage = localStorage.getItem('dataStore');

    if (dataFromLocalStorage) {
      this.dataStore = JSON.parse(dataFromLocalStorage).map(
        ([modelClass, data]) => {
          const model = new modelTypes[modelClass](data);

          model.store = this;
          // The model is clean since it is coming from the source of truth
          model.dirty = false;
          return model;
        }
      );
    }

    /** Temporarily add debts to the store for testing */
    if (!this.dataStore) {
      this.dataStore = [
        new Debt({
          id: 1
        }),
        new Debt({
          id: 2,
          principle: 30000,
          description: 'My Car',
          lifetime: 10 * 12,
          type: 'car'
        })
      ];

      this.commit();
    }
  }

  /**
   * Commits the current data store to persistent storage
   */
  commit() {
    const serializedStore = this.dataStore
      .filter(model => !model.dirty)
      .map(model => [model.modelName, model.valueOf()]);

    localStorage.setItem('dataStore', JSON.stringify(serializedStore));
  }

  /**
   * Retrieve all models of a given model class.
   * @param  {Class} modelClass
   * @return {Array} an array of models
   */
  getAll(modelClass) {
    // Not performant for large data sets, but our app is tiny so I don't care
    return this.dataStore.filter(model => model instanceof modelClass);
  }

  /**
   * Creates a new model and adds it to the store to be managed.
   * @param  {Class} The class of the model to be created
   * @param  {Object} The data for the new model
   * @return {Model} The model
   */
  createModel(modelClass, data = {}) {
    const model = new modelClass(data);
    model.store = this;
    this.dataStore.push(model);
    return model;
  }

  /**
   * Remove a model from the store and persist the change
   * @param  {Model} model
   * @return void
   */
  destroyModel(model) {
    this.dataStore = this.dataStore.filter(_model => model !== model);
    this.commit();
  }
}

export default new Store();
