import React, { Component } from 'react';
import Modal from 'react-modal';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import Debt, { DebtTypes } from '../models/Debt';
import Store from '../services/Store';
import InputCurrency from './InputCurrency';

class DebtDialog extends Component {
  constructor() {
    super();

    this.state = {};

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
    const debt = this.props.debt || Store.createModel(Debt);
    this.setState({ debt });
  }

  tabSelected(index, label) {
    const typeToName = this.typeToName;

    let type = label;
    for (const prop in typeToName) {
      if (typeToName[prop] === label) {
        type = prop;
      }
    }

    this.selectedType = type;
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    const { debt } = this.state;

    debt[name] = value;

    this.setState({ debt });
  }

  close() {
    this.state.debt.revert();
    this.props.onClose();
  }

  save() {
    const { debt } = this.state;
    if (this.selectedType) {
      debt.type = this.selectedType;
    }
    this.props.onSave(debt);
    this.close();
  }

  getInputsForRender() {
    const { debt } = this.state;

    if (!debt) {
      return {};
    }

    return {
      description: (
        <React.Fragment key="description">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={debt.description}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      ),

      lifetime: (
        <React.Fragment key="lifetime">
          <label htmlFor="lifetime">Lifetime</label>
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
        </React.Fragment>
      ),
      principle: (
        <React.Fragment key="principle">
          <label htmlFor="principle">Principle</label>
          <InputCurrency
            name="principle"
            className="form-control"
            value={debt.principle}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      ),

      balance: (
        <React.Fragment key="balance">
          <label htmlFor="balance">Balance</label>
          <InputCurrency
            name="balance"
            value={debt.balance}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      ),

      elapsedTime: (
        <React.Fragment key="elapsedTime">
          <label htmlFor="elapsedTime">Elapsed Time</label>
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
        </React.Fragment>
      ),

      rate: (
        <React.Fragment key="rate">
          <label htmlFor="rate">Rate</label>
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
        </React.Fragment>
      ),

      minimumMonthlyPayment: (
        <React.Fragment key="minimumMonthlyPayment">
          <label htmlFor="minimumMonthlyPayment">Minimum Payment</label>,
          <InputCurrency
            name="minimumMonthlyPayment"
            value={debt.minimumMonthlyPayment}
            onChange={this.handleInputChange}
          />
        </React.Fragment>
      )
    };
  }

  render() {
    const typeToName = this.typeToName;
    let inputs = this.getInputsForRender();
    const { debt } = this.state;

    const tabs = DebtTypes.map(type => {
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

      return (
        <Tab label={typeToName[type] || type} key={type} eventKey={type}>
          {content}
        </Tab>
      );
    });

    const selectedTab = debt ? typeToName[debt.type] : undefined;

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
          <Tabs onSelect={this.tabSelected} selected={selectedTab}>
            {tabs}
          </Tabs>
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
