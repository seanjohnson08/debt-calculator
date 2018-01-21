import React from 'react';
import Currency, {formatCurrencyNumber}  from './Currency';

it('formats correctly', () => {
  expect(Currency(10000)).toBe('$100.00');
  expect(Currency(999999)).toBe('$9,999.99');
  expect(formatCurrencyNumber(10000)).toBe('100.00');
  expect(formatCurrencyNumber(999999)).toBe('9,999.99');
});
