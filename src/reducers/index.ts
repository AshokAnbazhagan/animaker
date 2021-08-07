import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import appReducer, { IAppState, initialAppState } from './appReducer';

export interface IState {
  app: IAppState;
  router: RouterState;
}

export const initialState = {
  app: initialAppState,
};

export default (history: History<any>) => (state: IState, action) => {
  return combineReducers({
    app: appReducer,
    router: connectRouter(history),
  })(state, action);
};
