import React, { Component } from 'react';
import DebtListItem from './DebtListItem';

class DebtList extends Component {
  render() {
    const DebtListItems = this.props.debts.map((debt) => {
      return (
        <DebtListItem debt={debt} />
      );
    });

    return (
      <ul class="DebtList">
        {DebtListItems}
      </ul>
    );
  }
}

export default DebtList;