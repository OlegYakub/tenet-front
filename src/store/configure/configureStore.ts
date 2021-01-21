import { createStore } from 'redux';
import {createBrowserHistory} from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './rootReducer';
import rootMiddleware from './rootMiddleware';

export const history = createBrowserHistory();

const configureStore = () => {
  return createStore(
    createRootReducer(history),
    composeWithDevTools(rootMiddleware),
  );
};

export default configureStore;
