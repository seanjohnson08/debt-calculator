import React, { Component } from 'react';
import { formatCurrencyNumber } from '../helpers/Currency';

class DebtDialog extends Component {
  constructor(props) {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.name = props.name;
    console.log(props);
    this.state = { value: props.value };
  }

  handleInputChange(event) {
    let { value } = event.target;

    // TODO: double check this formatting, see if it can be improved.

    const str = `${value}`;
    value = str.replace(/\./g, '');
    this.value = parseInt(value, 10);
    this.setState({ value: this.value });
    this.props.onChange({ target: this });
  }

  render() {
    const { value } = this.state;
    const { name } = this;
    return (
      <div className="input-group">
        <span className="input-group-addon">$</span>
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
