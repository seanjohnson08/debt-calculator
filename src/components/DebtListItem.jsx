import React, { Component } from 'react';
import Currency from '../helpers/Currency';

class DebtList extends Component {
  render() {
    const debt = this.props.debt;

    switch (debt.type) {
      case 'card':
        return (
          <li className="DebtListItem">
            <h2>{debt.description}</h2>
            <dl>
              <dt>Total Balance</dt>
              <dd>{Currency(debt.balance)}</dd>
              <dt>Lifetime</dt>
              <dd>{debt.elapsedTime} months</dd>
            </dl>
          </li>
        );
        break;
      default:
        return (
          <li className="DebtListItem">
            <h2>{debt.description}</h2>
            <dl>
              <dt>Total Principle</dt>
              <dd>{Currency(debt.principle)}</dd>
              <dt>Lifetime</dt>
              <dd>{debt.lifetime} months</dd>
            </dl>
          </li>
        );
        break;
    }
  }
}

export default DebtList;
