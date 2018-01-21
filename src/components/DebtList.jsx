import React, { Component } from 'react';
import DebtListItem from './DebtListItem.jsx';

class DebtList extends Component {
  render() {
    const DebtListItems = this.props.debts.map(debt => {
      return <DebtListItem debt={debt} key={debt.id} />;
    });

    return <ul className="DebtList">{DebtListItems}</ul>;
  }
}

export default DebtList;
