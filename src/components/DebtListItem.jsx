import React, { Component } from 'react';
import Currency from '../helpers/Currency';

const iconTypes = {
  mortgage: 'home',
  car: 'road',
  loan: 'briefcase',
  card: 'credit-card'
};

class DebtList extends Component {
  render() {
    const debt = this.props.debt;
    const { type } = debt;
    const icon = iconTypes[debt.type];

    switch (type) {
      case 'card':
        return (
          <li className="list-group-item">
            <h4>
              <span className={'glyphicon glyphicon-' + icon} />{' '}
              {debt.description}
            </h4>
            <dl className="dl-horizontal">
              <dt>Total Balance</dt>
              <dd>{Currency(debt.balance)}</dd>
              <dt>Lifetime</dt>
              <dd>{debt.elapsedTime} months</dd>
            </dl>
            <button
              className="btn btn-danger"
              onClick={() => this.props.removeDebt(debt)}
            >
              Delete
            </button>
          </li>
        );
      default:
        return (
          <li className="list-group-item">
            <h4>
              <span className={'glyphicon glyphicon-' + icon} />{' '}
              {debt.description}
            </h4>
            <dl className="dl-horizontal">
              <dt>Total Principle</dt>
              <dd>{Currency(debt.principle)}</dd>
              <dt>Lifetime</dt>
              <dd>{debt.lifetime} months</dd>
            </dl>
            <button
              className="btn btn-danger"
              onClick={() => this.props.removeDebt(debt)}
            >
              Delete
            </button>
          </li>
        );
    }
  }
}

export default DebtList;
