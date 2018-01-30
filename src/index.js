import React from 'react';
import ReactDOM from 'react-dom';

// App Template
import App from './App.jsx';

import './styles/App.css';

import registerServiceWorker from './registerServiceWorker';

const appElement = document.getElementById('root');

ReactDOM.render(<App />, appElement);

registerServiceWorker();
