import { takeLatest, put } from 'redux-saga/effects'
import * as actions from './actions'

const addReminder = function* ({ payload }) {
}

const updateReminder = function* ({ payload }) {
}

const deleteReminder = function* ({ payload }) {
}

export default function* rootSaga() {
  yield takeLatest(actions.types.ADD_REMINDER, addReminder)
  yield takeLatest(actions.types.UPDATE_REMINDER, updateReminder)
  yield takeLatest(actions.types.DELETE_REMINDER, deleteReminder)
}