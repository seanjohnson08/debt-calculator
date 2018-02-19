import React, { Component } from 'react';
import { Decimal } from 'decimal.js-light';

class DebtDialog extends Component {
  constructor(props) {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitPress = this.submitPress.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      value: props.value
    };
  }

  handleInputChange(event) {
    let { value } = event.target;

    this.setState({ value });
  }

  submitPress(event) {
    const { key } = event;

    if (key === 'Enter') {
      this.submit(event);
    }
  }

  submit(event) {
    const { name } = this.props;
    let { value } = event.target;

    const str = value || 0;

    value = new Decimal(str).toFixed(2);

    this.setState({ value });
    this.props.onChange({ target: { name, value } });
  }

  render() {
    const { value } = this.state;
    const { name } = this;
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">$</div>
        </div>
        <input
          type="text"
          id={name}
          name={name}
          className="form-control"
          min="0"
          value={value || ''}
          onChange={this.handleInputChange}
          onKeyPress={this.submitPress}
          onBlur={this.submit}
        />
      </div>
    );
  }
}

export default DebtDialog;
