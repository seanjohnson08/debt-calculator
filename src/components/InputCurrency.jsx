import React, { Component } from 'react';
import { formatCurrencyNumber } from '../helpers/Currency';

class DebtDialog extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { name } = this.props;
    let { value } = event.target;

    // TODO: double check this formatting, see if it can be improved.

    const str = value || 0;
    value = parseInt(str.replace(/\D/g, ''), 10);
    this.props.onChange({ target: { name, value } });
  }

  render() {
    const { value } = this.props;
    const { name } = this;
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">$</div>
        </div>
        <input
          type="number"
          id={name}
          name={name}
          className="form-control"
          min="0"
          value={formatCurrencyNumber(value)}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default DebtDialog;
