import React, { Component } from 'react';
import DebtListItem from './DebtListItem.jsx';

class DebtList extends Component {
  constructor(props) {
    super(...arguments);
    this.className = props.className || '';
  }

  render() {
    const DebtListItems = this.props.debts.map(debt => {
      return (
        <DebtListItem
          debt={debt}
          key={debt.id}
          editDebt={this.props.editDebt}
          removeDebt={this.props.removeDebt}
        />
      );
    });

    return <ul className={'list-group ' + this.className}>{DebtListItems}</ul>;
  }
}

export default DebtList;
