import React from 'react';
import { shallow } from 'enzyme';
import InputCurrency from './InputCurrency';

test('InputCurrency stores internal value as integer', () => {
  const component = shallow(<InputCurrency value="12345" />);

  expect(component.find('input').prop('value')).toEqual('123.45');
});

test('OnChange is fired (and outputs integer) when input is modified', () => {
  const onChange = jest.fn();

  const component = shallow(
    <InputCurrency name="namedInput" onChange={onChange} />
  );

  const input = component.find('input');

  input.simulate('change', { target: { value: '123.45' } });

  expect(onChange).toBeCalled();
  expect(onChange.mock.calls[0][0].target.name).toEqual('namedInput');
  expect(onChange.mock.calls[0][0].target.value).toEqual(12345);
});
