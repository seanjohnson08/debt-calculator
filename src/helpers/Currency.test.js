import React from 'react';
import Currency, { formatCurrencyNumber } from './Currency';

it('formats correctly', () => {
  expect(Currency(100)).toBe('$100.00');
  expect(Currency(9999.99)).toBe('$9,999.99');
});
