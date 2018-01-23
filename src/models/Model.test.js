import Model from './Model';

class TestModel extends Model {
  properties() {
    return {
      enum: Model.Enum(['enumValue']),
      integer: Model.Integer,
      string: Model.String,
      boolean: Model.Boolean
    };
  }
}

it('Validates Enums', () => {
  const testModelInstance = new TestModel();

  // Set a valid value
  testModelInstance.enum = 'enumValue';

  expect(testModelInstance._data['enum']).toBe('enumValue');

  // Set an invalid value
  expect(() => {
    testModelInstance.enum = 'bad value';
  }).toThrow();
});

it('Validates Booleans', () => {
  const testModelInstance = new TestModel();

  // Set a valid value
  testModelInstance.boolean = true;

  expect(testModelInstance._data['boolean']).toBe(true);

  // Set an invalid value
  expect(() => {
    testModelInstance.boolean = 'nope';
  }).toThrow();
});

it('Validates Integers', () => {
  const testModelInstance = new TestModel();

  // Set a valid value
  testModelInstance.integer = 123;

  expect(testModelInstance._data['integer']).toBe(123);

  // Set an invalid value
  expect(() => {
    testModelInstance.integer = 1.235;
  }).toThrow();
});

it('Converts strings to Integer when applicable', () => {
  const testModelInstance = new TestModel();

  testModelInstance.integer = '123';

  expect(testModelInstance._data['integer']).toBe(123);

  testModelInstance.integer = '';

  expect(testModelInstance._data['integer']).toBe(0);

  expect(() => {
    testModelInstance.integer = 'sean';
  }).toThrow();
});

it('Validates Strings', () => {
  const testModelInstance = new TestModel();

  // Set a valid value
  testModelInstance.string = 'string value';

  expect(testModelInstance._data['string']).toBe('string value');

  // Set an invalid value
  expect(() => {
    testModelInstance.string = 1.235;
  }).toThrow();
});

it('valueOf returns internal state', () => {
  const state = {
    enum: 'enumValue',
    integer: 123,
    string: 'string'
  };
  const testModelInstance = new TestModel(state);

  expect(testModelInstance.valueOf()).toEqual(state);
});

it('calls the store and is marked clean when save() is called', () => {
  const commit = jest.fn();
  const store = { commit };

  const testModelInstance = new TestModel();
  testModelInstance.store = store;

  // New models should be dirty until saved
  expect(testModelInstance.isDirty).toBe(true);

  // Save the model
  testModelInstance.save();
  expect(store.commit).toHaveBeenCalled();
  expect(testModelInstance.isDirty).toBe(false);
});
