import React, { Component } from 'react';
import Modal from 'react-modal';
import Debt from './models/Debt';
import DebtList from './components/DebtList';
import './Reset.css';
import './App.css';


class App extends Component {
  constructor(){
    super();

    this.state = {
      modalIsOpen: false
    };
    this.debts = [
      new Debt(),
      new Debt({
        principle: 30000,
        description: 'My Car',
        lifetime: 10 * 12,
      })
    ];

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#F00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div class="App">
        <main className="Calculator">
          <DebtList debts={this.debts} />
          <div class="ResultsPane">
            <div class="Graph">
            </div>
          </div>
        </main>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal 
          isOpen={this.state.modalIsOpen}
          aria={{
            labelledby: "heading",
            describedby: " full_description"
          }}
        >
          <button onClick={this.closeModal}>close</button>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default App;
