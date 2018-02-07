import React, { Component } from 'react';
import Currency from '../helpers/Currency';

// Import icons
import HomeIcon from 'react-icons/lib/md/home';
import AutoIcon from 'react-icons/lib/md/directions-car';
import BriefCaseIcon from 'react-icons/lib/md/business-center';
import CreditCardIcon from 'react-icons/lib/md/credit-card';
import TrashIcon from 'react-icons/lib/ti/trash';
import PencilIcon from 'react-icons/lib/ti/pencil';

const iconTypes = {
  mortgage: <HomeIcon />,
  car: <AutoIcon />,
  loan: <BriefCaseIcon />,
  card: <CreditCardIcon />
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
          {icon} {debt.description}
        </h4>
        {details}
        <div className="btn-toolbar">
          <button
            className="btn btn-primary mr-2"
            onClick={() => this.props.editDebt(debt)}
          >
            <PencilIcon /> Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.props.removeDebt(debt)}
          >
            <TrashIcon /> Delete
          </button>
        </div>
      </li>
    );
  }
}

export default DebtList;
