import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import registerServiceWorker from './registerServiceWorker';

// App Template
import App from './App.jsx';

// CSS
import './styles/App.css';

// Configure default modal styles
Modal.defaultStyles.overlay.zIndex = 1050; // taken from https://v4-alpha.getbootstrap.com/layout/overview/

const appElement = document.getElementById('root');

ReactDOM.render(<App />, appElement);

registerServiceWorker();
