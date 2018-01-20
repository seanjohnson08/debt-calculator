import React, { Component } from 'react';
import Currency from '../helpers/Currency';

class DebtList extends Component {
  render() {
    const debt = this.props.debt;

    return (
      <li className="DebtListItem">
        <h2>{debt.description}</h2>
        <dl>
          <dt>Total Principle</dt><dd>{Currency(debt.principle)}</dd>
          <dt>Lifetime</dt><dd>{debt.lifetime} months</dd>
        </dl>
      </li>
    );
  }
}

export default DebtList;