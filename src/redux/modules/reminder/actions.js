import { createAction } from 'redux-actions'

const ADD_REMINDER = 'ADD_REMINDER'
const UPDATE_REMINDER = 'UPDATE_REMINDER'
const DELETE_REMINDER = 'DELETE_REMINDER'

export const types = {
  ADD_REMINDER,
  UPDATE_REMINDER,
  DELETE_REMINDER
}

export const addReminder = createAction(ADD_REMINDER)
export const updateReminder = createAction(UPDATE_REMINDER)
export const deleteReminder = createAction(DELETE_REMINDER)
