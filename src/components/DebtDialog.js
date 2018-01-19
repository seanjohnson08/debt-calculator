import React, { Component } from 'react';
import Modal from 'react-modal';
import Debt from "../models/Debt.js"

class DebtDialog extends Component {

  constructor() {
    super();

    this.renderForm = this.renderForm.bind(this);
  }

  /**
   * Displays form items based on the selected type
   */
  renderForm() {
    const type = document.querySelector("li.type select").value;
    alert(type);
  }
  
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        aria={{
          labelledby: "heading",
          describedby: " full_description"
        }}
      >

        <form>
          <ul>
            <li className="type">
              <label for="type">Type</label>
              <select name="type" id="type" onClick={this.renderForm}>
                <option value="test">test</option>
                <option value="another">Another</option>
              </select>
            </li>
            <li className="lifetime">
              <label for="lifetime">Lifetime</label>
              <input type="number" name="lifetime" id="lifetime" min="0" max="1200" />
            </li>
            <li className="principle">
              <label for="principle">Principle</label>
              <input type="number" name="principle" id="principle" min="0" />
            </li>
            <li className="balance">
              <label for="balance">Balance</label>
              <input type="number" name="balance" id="balance" min="0" />
            </li>
            <li className="elapsedTime">
              <label for="elapsedTime">Elaped Time</label>
              <input type="number" name="elapsedTime" id="elapsedTime" min="0" max="1200" />
            </li>
            <li className="rate">
              <label for="rate">Rate</label>
              <input type="number" name="rate" id="rate" min="0" />
            </li>
            <li className="minimumPayment">
              <label for="minimumPayment">Minimum Payment</label>
              <input type="number" name="minimumPayment" id="minimumPayment" min="0" />
            </li>
          </ul>
        </form>
        <button onClick={this.props.onClose}>close</button>
      </Modal>
    );12.00
  }
  
}

export default DebtDialog;