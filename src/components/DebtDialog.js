import React, { Component } from 'react';
import Modal from 'react-modal';

class DebtDialog extends Component {
  
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        aria={{
          labelledby: "heading",
          describedby: " full_description"
        }}
      >
        <button onClick={this.props.onClose}>close</button>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    );
  }
  
}

export default DebtDialog;