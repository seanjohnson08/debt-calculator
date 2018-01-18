import React, { Component } from 'react';

class DebtList extends Component {
  render() {
    const debt = this.props.debt;

    return (
      <li class="DebtListItem">
        <h2>{debt.description}</h2>
        <dl>
          <dt>Total Principle</dt><dd>{debt.principle}</dd>
          <dt>Lifetime</dt><dd>{debt.lifetime} months</dd>
        </dl>
      </li>
    );
  }
}

export default DebtList;