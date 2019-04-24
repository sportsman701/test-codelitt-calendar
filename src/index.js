import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import store, { history } from './redux/store'
import Routes from './routes'
import theme from './theme'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
