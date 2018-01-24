import Store from './Store';
import Model from '../models/Model';

class CustomModel extends Model {}

afterEach(() => {
  Store.clear();
});

function populateStore() {
  // Create 10 of each type of model
  for (let i = 0; i < 10; i++) {
    Store.createModel(Model, { id: i });
    Store.createModel(CustomModel, { id: i });
  }
}

it('Creates new models', () => {
  const model = Store.createModel(Model);

  expect(model.isDirty).toBe(true);
  expect(model.store).toBe(Store);
  expect(model).toBeInstanceOf(Model);
  expect(Store.dataStore).toContain(model);
});

it('Clears the Store', function() {
  const model = Store.createModel(Model);

  expect(Store.dataStore).toContain(model);

  Store.clear();
  expect(Store.dataStore).toEqual([]);
});

it('Fetches all models of a certain type', () => {
  populateStore();

  expect(Store.dataStore.length).toBe(20);

  expect(Store.getAll(CustomModel).length).toBe(10);
});

it('Fetches a single model by id', () => {
  populateStore();

  const fetchedModel = Store.get(CustomModel, 2);
  expect(fetchedModel.id).toBe(2);
  expect(fetchedModel).toBeInstanceOf(CustomModel);
});

it('Deletes a single model', () => {
  populateStore();

  const myModel = Store.createModel(CustomModel, { id: 100 });
  expect(Store.dataStore.length).toBe(21);
  expect(Store.dataStore).toContain(myModel);

  Store.destroyModel(myModel);

  expect(Store.dataStore.length).toBe(20);
  expect(Store.dataStore).not.toContain(myModel);
});
