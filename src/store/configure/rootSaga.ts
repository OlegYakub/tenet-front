import { all, fork, setContext } from 'redux-saga/effects';
import {Dispatch} from 'redux';
// import authSaga from '../auth/authSaga';

export default function* root(dispatch: Dispatch) {
  yield setContext({dispatch});
  yield all([
    // ...authSaga,

  ].map(saga => fork(saga, dispatch)));
}
