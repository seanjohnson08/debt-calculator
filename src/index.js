import React from 'react';
import ReactDOM from 'react-dom';

// App Template
import App from './App.jsx';

// CSS:
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './styles/App.css';

import registerServiceWorker from './registerServiceWorker';

const appElement = document.getElementById('root');

ReactDOM.render(<App />, appElement);

registerServiceWorker();
