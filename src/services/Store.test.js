import Store from './Store';
import Model from '../models/Model';

class CustomModel extends Model {}

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
  // Create 10 of each type of model
  for (let i = 0; i < 10; i++) {
    Store.createModel(Model);
    Store.createModel(CustomModel);
  }

  expect(Store.dataStore.length).toBe(20);

  expect(Store.getAll(CustomModel).length).toBe(10);
});

it('Fetches a single model by id', () => {
  // Create 10 of each type of model
  for (let i = 0; i < 10; i++) {
    Store.createModel(Model, { id: i });
    Store.createModel(CustomModel, { id: i });
  }

  const fetchedModel = Store.get(CustomModel, 2);
  expect(fetchedModel.id).toBe(2);
  expect(fetchedModel).toBeInstanceOf(CustomModel);
});
