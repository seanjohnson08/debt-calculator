import React, { Component } from 'react';
import Modal from 'react-modal';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();

     this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = "#F00";
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
