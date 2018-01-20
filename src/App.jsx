import React, { Component } from 'react';

import Debt from './models/Debt';
import Store from './services/Store';

import DebtList from './components/DebtList.jsx';
import DebtDialog from './components/DebtDialog.jsx';
import DebtPlot from './components/DebtPlot.jsx';

import './styles/Reset.css';
import './styles/App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.debts = Store.getAll(Debt);

    this.clear= this.clear.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveDebt = this.saveDebt.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  saveDebt(debt){
    this.debts.push(debt);
    Store.commit();
  }

  clear() {
    this.debts = [];
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <main className="Calculator">
          <div className="Debts">
            <DebtList debts={this.debts} />
            <button onClick={this.openModal}>Add Debt</button>
            <button onClick={this.clear}>Clear Everything</button>
          </div>
          <div className="ResultsPane">
            <DebtPlot debts={this.debts} width={600} height={300} />
          </div>
        </main>
        <DebtDialog 
          isOpen={this.state.modalIsOpen} 
          onClose={this.closeModal} 
          debtObj={this.state.curDebtObj} 
          onSave={this.saveDebt}>This is a test</DebtDialog>
      </div>
    );
  }
}

export default App;
