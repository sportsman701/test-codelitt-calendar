import { call } from 'redux-saga/effects';
import { sagas as reminder } from './reminder'

export default function* rootSaga() {
  yield call(reminder)
}
