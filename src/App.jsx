import React, { Component } from 'react';
import Debt from './models/Debt';
import DebtList from './components/DebtList.jsx';
import DebtDialog from './components/DebtDialog.jsx';
import DebtPlot from './components/DebtPlot.jsx';
import './Reset.css';
import './App.css';


class App extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
    this.debts = [
      new Debt({
        id: 1,
      }),
      new Debt({
        id: 2,
        principle: 30000,
        description: 'My Car',
        lifetime: 10 * 12,
      })
    ];

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.save = this.save
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="App">
        <main className="Calculator">
          <div className="Debts">
            <DebtList debts={this.debts} />
            <button onClick={this.openModal}>Add Debt</button>
          </div>
          <div className="ResultsPane">
            <DebtPlot debts={this.debts} width={600} height={300} />
          </div>
        </main>
        <DebtDialog 
          isOpen={this.state.modalIsOpen} 
          onClose={this.closeModal} 
          debtObj={this.state.curDebtObj} 
          save={this.saveDebt}>This is a test</DebtDialog>
      </div>
    );
  }
}

export default App;
