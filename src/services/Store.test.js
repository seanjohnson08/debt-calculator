import Store from './Store';
import Model from '../models/Model';

it('Creates new models', function() {
  const model = Store.createModel(Model);

  expect(model.isDirty).toBe(true);
  expect(model.store).toBe(Store);
  expect(model).toBeInstanceOf(Model);
  expect(Store.dataStore).toContain(model);
});

if (
  ('Clears the Store',
  function() {
    const model = Store.createModel(Model);

    expect(model.isDirty).toBe(true);
    expect(model.store).toBe(Store);
    expect(model).toBeInstanceOf(Model);
    expect(Store.dataStore).toContain(model);

    Store.clear();
    expect(Store.dataStore).toBe([]);
  })
);
