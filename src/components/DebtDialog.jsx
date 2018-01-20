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
  }

  init(){
    const debt = this.props.debtObj || new Debt();
    this.setState(debt.valueOf());
    this.typeChange(debt.type);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })

    if(name == "type"){
      this.typeChange(value);
    }
  };

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
  }minimumMonthlyPaymentElement

  
  
  render() {

    const typeToName = {"mortgage":"Home Mortgage","car":"Car Loan", "loan":"Personal Loan", "card":"Credit Card"};
    
    const debtTypesOptions = DebtTypes.map((type) => {
      return (
        <option value={type}>{typeToName[type]||type}</option>
      );
    });

    let lifetimeElement;
    if(this.state.visibleInputs.includes('lifetime')){
      lifetimeElement = (
        <li className="lifetime" visible={this.state.visibleInputs.includes('lifetime')}>
          <label for="lifetime">Lifetime</label>
          <input type="number" name="lifetime" id="lifetime" min="0" max="1200" value={this.state.lifetime}  onChange={this.handleInputChange} />
        </li>
      )
    }

    let principleElement;
    if(this.state.visibleInputs.includes('principle')){
      principleElement = (
        <li className="principle">
          <label for="principle">Principle</label>
          <input type="number" name="principle" id="principle" min="0" value={this.state.principle}  onChange={this.handleInputChange} />
        </li>
      )
    }
minimumMonthlyPaymentElement
    let balanceElement;
    if(this.state.visibleInputs.includes('balance')){
      balanceElement = (
        <li className="balance">
          <label for="balance">Balance</label>
          <input type="number" name="balance" id="balance" min="0" value={this.state.balance}  onChange={this.handleInputChange} />
        </li>
      )
    }

    let elapsedTimeElement;
    if(this.state.visibleInputs.includes('elapsedTime')){
      elapsedTimeElement = (
        <li className="elapsedTime">
          <label for="elapsedTime">Elaped Time</label>
          <input type="number" name="elapsedTime" id="elapsedTime" min="0" max="1200" value={this.state.elapsedTime}  onChange={this.handleInputChange} />
        </li>
      )
    }

    let rateElement;
    if(this.state.visibleInputs.includes('rate')){
      rateElement = (
        <li className="rate">
          <label for="rate">Rate</label>
          <input type="number" name="rate" id="rate" min="0" value={this.state.rate}  onChange={this.handleInputChange} />
        </li>
      )
    }

    let minimumMonthlyPaymentElement;
    if(this.state.visibleInputs.includes('minimumMonthlyPayment')){
      minimumMonthlyPaymentElement = (
        <li className="minimumMonthlyPayment">
          <label for="minimumMonthlyPayment">Minimum Payment</label>
          <input type="number" name="minimumMonthlyPayment" id="minimumMonthlyPayment" min="0" value={this.state.minimumMonthlyPayment}  onChange={this.handleInputChange} />
        </li>
      )
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
            {lifetimeElement}
            {principleElement}
            {balanceElement}
            {elapsedTimeElement}
            {rateElement}
            {minimumMonthlyPaymentElement}
          </ul>
        </form>
        <button onClick={this.props.onClose}>close</button>
      </Modal>
    );
  }
  
}

export default DebtDialog;