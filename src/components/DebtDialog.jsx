import React, { Component } from 'react';
import Modal from 'react-modal';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import Debt, { DebtTypes } from '../models/Debt';
import Store from '../services/Store';
import InputCurrency from './InputCurrency';

class DebtDialog extends Component {
  constructor() {
    super();

    this.typeToName = {
      mortgage: 'Home Mortgage',
      car: 'Car Loan',
      loan: 'Personal Loan',
      card: 'Credit Card'
    };

    this.init = this.init.bind(this);
    this.tabSelected = this.tabSelected.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  init() {
    const debt = this.props.debtObj || Store.createModel(Debt);
    this.setState({ debt: debt });
    console.log(debt);
    this.typeChange(debt.type);
  }

  tabSelected(index, label) {
    const typeToName = this.typeToName;

    let type = label;
    for (const prop in typeToName) {
      if (typeToName[prop] == label) {
        type = prop;
      }
    }

    this.state.selectedType = type;
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    const debt = this.state.debt;

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

  render() {
    const typeToName = this.typeToName;

    // const debtTypesOptions = DebtTypes.map((type,index) => {
    //   const href = '#' + type;
    //   return (
    //     <li className="nav-item" value={type} key={index}>
    //       <a className="nav-link" href={href} data-toggle="tab">{typeToName[type] || type}</a>
    //     </li>
    //   );
    // });

    const inputs = {};
    const debt = this.state.debt || this.state;

    inputs.lifetime = [
      <label htmlFor="lifetime">Lifetime</label>,
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
        <div className="input-group-append">
          <div className="input-group-text">Months</div>
        </div>
      </div>
    ];

    inputs.principle = [
      <label htmlFor="principle">Principle</label>,
      <InputCurrency
        name="principle"
        className="form-control"
        value={debt.principle}
        onChange={this.handleInputChange}
      />
    ];

    inputs.balance = [
      <label htmlFor="balance">Balance</label>,
      <InputCurrency
        name="balance"
        value={debt.balance}
        onChange={this.handleInputChange}
      />
    ];

    inputs.elapsedTime = [
      <label htmlFor="elapsedTime">Elapsed Time</label>,
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
        <div className="input-group-append">
          <div className="input-group-text">Months</div>
        </div>
      </div>
    ];

    inputs.rate = [
      <label htmlFor="rate">Rate</label>,
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
        <div className="input-group-append">
          <div className="input-group-text">% APR</div>
        </div>
      </div>
    ];

    inputs.minimumMonthlyPayment = [
      <label htmlFor="minimumMonthlyPayment">Minimum Payment</label>,
      <InputCurrency
        name="minimumMonthlyPayment"
        value={debt.minimumMonthlyPayment}
        onChange={this.handleInputChange}
      />
    ];

    const selectedType = this.state.selectedType;
    const tabs = [];
    DebtTypes.map((type, index) => {
      let content = [];

      switch (type) {
        case 'card':
          for (const prop in inputs) {
            if (
              [
                'balance',
                'elapsedTime',
                'rate',
                'minimumMonthlyPayment'
              ].includes(prop)
            ) {
              content.push(inputs[prop]);
            }
          }
          break;
        default:
          for (const prop in inputs) {
            content.push(inputs[prop]);
          }
          break;
      }

      tabs.push(
        <Tab label={typeToName[type] || type} key={type}>
          {content}
        </Tab>
      );
    });

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
          <Tabs onSelect={this.tabSelected}>{tabs}</Tabs>
          <button className="btn btn-default" onClick={this.close}>
            close
          </button>
          <button className="btn btn-default" onClick={this.save}>
            save
          </button>
        </form>
      </Modal>
    );
  }
}

export default DebtDialog;
