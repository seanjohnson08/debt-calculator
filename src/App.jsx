import React, { Component } from 'react';

import Debt from './models/Debt';
import Store from './services/Store';

import DebtList from './components/DebtList.jsx';
import DebtDialog from './components/DebtDialog.jsx';
import DebtPlot from './components/DebtPlot.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.state.debts = Store.getAll(Debt);

    this.clear = this.clear.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveDebt = this.saveDebt.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  saveDebt(debt) {
    this.state.debts.push(debt);
    debt.save();
  }

  clear() {
    this.state.debts.forEach(model => model.destroy());
    this.setState({ debts: [] });

    //TODO: Remove this localstorage clean from here
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <main className="row">
          <div className="col-md-4">
            <DebtList debts={this.state.debts} />
            <button onClick={this.openModal}>Add Debt</button>
            <button onClick={this.clear}>Clear Everything</button>
          </div>
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">Projections</div>
              <div className="panel-body">
                <DebtPlot debts={this.state.debts} width={600} height={300} />
              </div>
            </div>
          </div>
        </main>
        <DebtDialog
          isOpen={this.state.modalIsOpen}
          onClose={this.closeModal}
          debtObj={this.state.curDebtObj}
          onSave={this.saveDebt}
        >
          This is a test
        </DebtDialog>
      </div>
    );
  }
}

export default App;
