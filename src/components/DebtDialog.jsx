import React, { Component } from 'react';
import Modal from 'react-modal';
import {DebtTypes} from "../models/Debt"
import Debt from '../models/Debt';


class DebtDialog extends Component {

  mixins: [LinkStateMixin];

  constructor() {
    super();

    this.state = {
      'visibleInputs': []
    };

    this.init = this.init.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.save = this.save.bind(this);
  }

  init(){
    const debt = this.props.debtObj || new Debt();
    this.setState({debt: debt});
    this.typeChange(debt.type);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.state.debt[name] = value;

    this.setState({
      debt: this.state.debt
    });

    if(name == "type"){
      this.typeChange(value);
    }
  };

  save(){
    this.props.onSave(this.state.debt);
  }

  /**
   * Displays form items based on the selected type
   */
  typeChange(type){
    switch(type){
      case "mortgage":
      case "car":
      case "loan":
        this.state.visibleInputs = ["lifetime","principle","balance","elapsedTime","rate","minimumMonthlyPayment"];
        break;
      case "card":
        this.state.visibleInputs = ["balance","rate","minimumMonthlyPayment"];
        break;
      default:
        this.state.visibleInputs = [];
    }
  }

  
  
  render() {

    const typeToName = {"mortgage":"Home Mortgage","car":"Car Loan", "loan":"Personal Loan", "card":"Credit Card"};
    
    const debtTypesOptions = DebtTypes.map((type) => {
      return (
        <option value={type}>{typeToName[type]||type}</option>
      );
    });

    const inputs = [];
    const visibleInputs = this.state.visibleInputs;
    const debt = this.state.debt || this.state;

    if (visibleInputs.includes('lifetime')){
      inputs.push(
        <li className="lifetime">
          <label for="lifetime">Lifetime</label>
          <input type="number" name="lifetime" id="lifetime" min="0" max="1200" value={debt.lifetime}  onChange={this.handleInputChange} />
        </li>
      );
    }

    if (visibleInputs.includes('principle')){
      inputs.push(
        <li className="principle">
          <label for="principle">Principle</label>
          <input type="number" name="principle" id="principle" min="0" value={debt.principle}  onChange={this.handleInputChange} />
        </li>
      );
    }

    if (visibleInputs.includes('balance')){
      inputs.push(
        <li className="balance">
          <label for="balance">Balance</label>
          <input type="number" name="balance" id="balance" min="0" value={debt.balance}  onChange={this.handleInputChange} />
        </li>
      );
    }

    if (visibleInputs.includes('elapsedTime')){
      inputs.push(
        <li className="elapsedTime">
          <label for="elapsedTime">Elaped Time</label>
          <input type="number" name="elapsedTime" id="elapsedTime" min="0" max="1200" value={debt.elapsedTime}  onChange={this.handleInputChange} />
        </li>
      );
    }

    if (visibleInputs.includes('rate')){
      inputs.push(
        <li className="rate">
          <label for="rate">Rate</label>
          <input type="number" name="rate" id="rate" min="0" value={debt.rate}  onChange={this.handleInputChange} />
        </li>
      );
    }

    if (visibleInputs.includes('minimumMonthlyPayment')){
      inputs.push(
        <li className="minimumMonthlyPayment">
          <label for="minimumMonthlyPayment">Minimum Payment</label>
          <input type="number" name="minimumMonthlyPayment" id="minimumMonthlyPayment" min="0" value={debt.minimumMonthlyPayment}  onChange={this.handleInputChange} />
        </li>
      );
    }

    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.init}
        aria={{
          labelledby: "heading",
          describedby: " full_description"
        }}
      >
        <form>
          <ul>
            <li className="type">
              <label for="type">Type</label>
              <select name="type" id="type" value={this.state.type} onChange={this.handleInputChange}>
                {debtTypesOptions}
              </select>
            </li>
            {inputs}
          </ul>
        </form>
        <button onClick={this.props.onClose}>close</button>
        <button onClick={this.save}>save</button>
      </Modal>
    );
  }
  
}

export default DebtDialog;