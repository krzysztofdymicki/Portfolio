import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'

const basicStyle = {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    borderCollapse: 'collapse'
  }

ReactDOM.render(
  <Provider store={store}>
  <App style={basicStyle} />
  </Provider>
  , document.getElementById('root'));

