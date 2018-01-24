import React, { Component } from 'react';
import Modal from 'react-modal';
import Debt, { DebtTypes } from '../models/Debt';
import Store from '../services/Store';
import { formatCurrencyNumber } from '../helpers/Currency';
import InputCurrency from './InputCurrency';

class DebtDialog extends Component {
  constructor() {
    super();

    this.state = {
      visibleInputs: []
    };

    this.init = this.init.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  init() {
    const debt = this.props.debtObj || Store.createModel(Debt);
    this.setState({ debt: debt });
    this.typeChange(debt.type);
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    const debt = this.state.debt;

    if (name === 'type') {
      this.typeChange(value);
    }

    debt[name] = value;

    this.setState({ debt });
  }

  close() {
    this.props.onClose();
  }

  save() {
    this.props.onSave(this.state.debt);
    this.close();
  }

  /**
   * Displays form items based on the selected type
   */
  typeChange(type) {
    switch (type) {
      case 'mortgage':
      case 'car':
      case 'loan':
        this.setState({
          visibleInputs: [
            'lifetime',
            'principle',
            'balance',
            'elapsedTime',
            'rate',
            'minimumMonthlyPayment'
          ]
        });
        break;
      case 'card':
        this.setState({
          visibleInputs: [
            'balance',
            'elapsedTime',
            'rate',
            'minimumMonthlyPayment'
          ]
        });
        break;
      default:
        this.setState({
          visibleInputs: []
        });
        break;
    }
  }

  render() {
    const typeToName = {
      mortgage: 'Home Mortgage',
      car: 'Car Loan',
      loan: 'Personal Loan',
      card: 'Credit Card'
    };

    const debtTypesOptions = DebtTypes.map(type => {
      return (
        <option key={type} value={type}>
          {typeToName[type] || type}
        </option>
      );
    });

    const inputs = [];
    const visibleInputs = this.state.visibleInputs;
    const debt = this.state.debt || this.state;

    if (visibleInputs.includes('lifetime')) {
      inputs.push(<label for="lifetime">Lifetime</label>);
      inputs.push(
        <div className="input-group">
          <input
            type="number"
            id="lifetime"
            name="lifetime"
            className="form-control"
            min="0"
            max="1200"
            value={debt.lifetime}
            onChange={this.handleInputChange}
          />
          <span className="input-group-addon">Months</span>
        </div>
      );
    }

    if (visibleInputs.includes('principle')) {
      inputs.push(<label for="principle">Principle</label>);
      inputs.push(
        <InputCurrency
          name="principle"
          value={debt.principle}
          onChange={this.handleInputChange}
        />
      );
    }

    if (visibleInputs.includes('balance')) {
      inputs.push(<label for="balance">Balance</label>);
      inputs.push(
        <InputCurrency
          name="balance"
          value={debt.balance}
          onChange={this.handleInputChange}
        />
      );
    }

    if (visibleInputs.includes('elapsedTime')) {
      inputs.push(<label for="elapsedTime">Elapsed Time</label>);
      inputs.push(
        <div className="input-group">
          <input
            type="number"
            name="elapsedTime"
            id="elapsedTime"
            className="form-control"
            min="0"
            max="1200"
            value={debt.elapsedTime}
            onChange={this.handleInputChange}
          />
          <span className="input-group-addon">Months</span>
        </div>
      );
    }

    if (visibleInputs.includes('rate')) {
      inputs.push(<label for="rate">Rate</label>);
      inputs.push(
        <div className="input-group">
          <input
            type="number"
            id="rate"
            name="rate"
            className="form-control"
            min="0"
            value={debt.rate}
            onChange={this.handleInputChange}
          />
          <span className="input-group-addon">% APR</span>
        </div>
      );
    }

    if (visibleInputs.includes('minimumMonthlyPayment')) {
      inputs.push(<label for="minimumMonthlyPayment">Minimum Payment</label>);
      inputs.push(
        <InputCurrency
          name="minimumMonthlyPayment"
          value={debt.minimumMonthlyPayment}
          onChange={this.handleInputChange}
        />
      );
    }

    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        onAfterOpen={this.init}
        aria={{
          labelledby: 'heading',
          describedby: 'full_description'
        }}
      >
        <form>
          <label for="type">Type</label>
          <div className="input-group">
            <select
              id="type"
              name="type"
              className="form-control"
              value={debt.type}
              onChange={this.handleInputChange}
            >
              {debtTypesOptions}
            </select>
          </div>
          <div className="input-group">
            <label for="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-control"
              value={debt.description}
              onChange={this.handleInputChange}
            />
          </div>
          {inputs}
        </form>
        <div class="input-group">
          <button className="btn btn-default" onClick={this.close}>
            close
          </button>
          <button className="btn btn-default" onClick={this.save}>
            save
          </button>
        </div>
      </Modal>
    );
  }
}

export default DebtDialog;
