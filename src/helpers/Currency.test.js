import React from 'react';
import Currency from './Currency';

it('formats correctly', () => {
  expect(Currency(10000)).toBe('$100.00');
  expect(Currency(999999)).toBe('$9,999.99');
});