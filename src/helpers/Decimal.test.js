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

it('adds correctly', () => {
  const decimal = new Decimal('2.6');
  const decimal2 = new Decimal('3.25');

  expect(decimal.add(decimal2).valueOf()).toBe(5.85);

  expect(decimal.add(4.2).valueOf()).toBe(6.8);
});

it('subtracts correctly', () => {
  const decimal = new Decimal('2.6');
  const decimal2 = new Decimal('3.25');

  expect(decimal.sub(decimal2).valueOf()).toBe(-0.65);

  expect(decimal.sub(4.2).valueOf()).toBe(-1.6);
});

it('multiplies correctly', () => {
  const decimal = new Decimal('4.23474');
  expect(decimal.mult(3).valueOf()).toBe(12.7041);

  const decimal2 = new Decimal(5.25367, 3);
  expect(decimal2.mult(4).valueOf()).toBe(21.016);

  expect(decimal.mult(decimal2).valueOf()).toBe(22.2491);
});

it('divides correctly', () => {
  const decimal = new Decimal(2.5, 4);
  const decimal2 = new Decimal(3.2);
  expect(decimal.divide(decimal2).valueOf()).toBe(0.7813);

  expect(decimal.divide(3.2).valueOf()).toBe(0.7813);
});
