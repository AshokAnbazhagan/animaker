import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer, { initialState, IState } from './reducers';
import { App } from './components/App';

const composeEnhancer = composeWithDevTools({
  name: 'animaker'
});

export const history = createBrowserHistory();

export const store = createStore(
  rootReducer(history),
  initialState as IState,
  composeEnhancer(
    applyMiddleware(routerMiddleware(history))
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
