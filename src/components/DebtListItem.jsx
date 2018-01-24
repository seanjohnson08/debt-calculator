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

    let details;

    switch (type) {
      case 'card':
        details = (
          <dl className="dl-horizontal">
            <dt>Total Balance</dt>
            <dd>{Currency(debt.balance)}</dd>
            <dt>Lifetime</dt>
            <dd>{debt.elapsedTime} months</dd>
          </dl>
        );
        break;

      default:
        details = (
          <dl className="dl-horizontal">
            <dt>Total Principle</dt>
            <dd>{Currency(debt.principle)}</dd>
            <dt>Lifetime</dt>
            <dd>{debt.lifetime} months</dd>
          </dl>
        );
    }

    return (
      <li className="list-group-item">
        <h4>
          <span className={'glyphicon glyphicon-' + icon} /> {debt.description}
        </h4>
        {details}
        <div className="btn-toolbar">
          <button
            className="btn btn-primary"
            onClick={() => this.props.editDebt(debt)}
          >
            <span class="glyphicon glyphicon-pencil" aria-hidden="true" /> Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.props.removeDebt(debt)}
          >
            <span class="glyphicon glyphicon-trash" aria-hidden="true" /> Delete
          </button>
        </div>
      </li>
    );
  }
}

export default DebtList;
