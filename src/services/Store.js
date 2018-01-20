import Debt from '../models/Debt';

let _instance;

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
    // TODO: load from local storage
    this.dataStore = [
      new Debt({
        id: 1,
      }),
      new Debt({
        id: 2,
        principle: 30000,
        description: 'My Car',
        lifetime: 10 * 12,
      })
    ];
  }

  /**
   * Retrieve all models of a given model class.
   * @param  {Class} modelClass
   * @return {Array} an array of models
   */
  getAll(modelClass) {
    // Not performant for large data sets, but our app is tiny so I don't care
    return this.dataStore.filter((model) => model instanceof modelClass);
  }

  /**
   * Creates a new model and adds it to the store to be managed.
   * @param  {Class} The class of the model to be created
   * @param  {Object} The data for the new model
   * @return {Model} The model
   */
  createModel(modelClass, data = {}) {
    const model = new modelClass(data);
    this.dataStore.push(model);
    return model;
  }
}

export default new Store();