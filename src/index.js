import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import './styles.css';
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter>
          <AppRouter/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);