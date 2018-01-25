import React from 'react';
import Decimal from './Decimal';

it('formats correctly', () => {
  let decimal = new Decimal('4.23474');
  expect(decimal.toString()).toBe('4.2347');
  expect(decimal.int).toBe(42347);
  expect(decimal.precision).toBe(4);

  decimal = new Decimal(5.25367, 3);
  expect(decimal.toString()).toBe('5.254');
  expect(decimal.int).toBe(5254);
  expect(decimal.precision).toBe(3);
});

it('multiplies correctly', () => {
  let decimal = new Decimal('4.23474');
  expect(decimal.mult(3)).toBe(12.7041);

  decimal = new Decimal(5.25367, 3);
  expect(decimal.mult(4)).toBe(21.016);
});
