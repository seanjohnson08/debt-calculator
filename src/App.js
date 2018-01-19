import React, { Component } from 'react';
import Debt from './models/Debt';
import DebtList from './components/DebtList';
import DebtDialog from './components/DebtDialog.js';
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
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div class="App">
        <main className="Calculator">
          <div className="Debts">
            <DebtList debts={this.debts} />
            <button onClick={this.openModal}>Open Modal</button>
          </div>
          <div class="ResultsPane">
            <div class="Graph">
            </div>
          </div>
        </main>
        <DebtDialog isOpen={this.state.modalIsOpen} onClose={this.closeModal}>This is a test</DebtDialog>
      </div>
    );
  }
}

export default App;
