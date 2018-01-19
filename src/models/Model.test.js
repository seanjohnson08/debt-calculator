import Model from './Model';

class TestModel extends Model {
  properties() {
    return {
      enum: Model.Enum(['enumValue']),
      integer: Model.Integer,
      string: Model.String
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

it('Validates Strings', () => {
  const testModelInstance = new TestModel();

  // Set a valid value
  testModelInstance.string = 'string value';

  expect(testModelInstance._data['string']).toBe('string value');

  // Set an invalid value
  expect(() => {
    testModelInstance.string = 1.235;
  }).toThrow();
})