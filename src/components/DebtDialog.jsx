import React, { Component } from 'react';
import Modal from 'react-modal';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import Debt, { DebtTypes } from '../models/Debt';
import Store from '../services/Store';
import InputCurrency from './InputCurrency';

// Import icons
import HomeIcon from 'react-icons/lib/md/home';
import AutoIcon from 'react-icons/lib/md/directions-car';
import BriefCaseIcon from 'react-icons/lib/md/business-center';
import CreditCardIcon from 'react-icons/lib/md/credit-card';

const iconTypes = {
  mortgage: <HomeIcon />,
  car: <AutoIcon />,
  loan: <BriefCaseIcon />,
  card: <CreditCardIcon />
};

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
    this.selectedType = debt.type;
    this.setState({ debt });
  }

  tabSelected(index, label) {
    let type = label;
    for (const prop in this.typeToName) {
      if (this.typeToName[prop] === label) {
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

  /**
   * Gets the content of all tabs, 1 tab for each debt type
   * @return {Array[Tab]}
   */
  getTabsForRender() {
    let inputs = this.getInputsForRender();

    return DebtTypes.map(type => {
      let fields;

      switch (type) {
        case 'card':
          fields = [
            'description',
            'balance',
            'elapsedTime',
            'rate',
            'minimumMonthlyPayment'
          ];
          break;
        default:
          // Show all inputs
          fields = Object.keys(inputs);
          break;
      }

      const content = fields.map(field => inputs[field]);

      return (
        <Tab label={this.typeToName[type] || type} key={type} eventKey={type}>
          <div>{iconTypes[type]}</div>
          {content}
        </Tab>
      );
    });
  }

  render() {
    let tabs = this.getTabsForRender();
    const { debt } = this.state;

    const selectedTab = debt ? this.typeToName[this.selectedType] : undefined;

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
