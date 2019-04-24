import { handleActions } from 'redux-actions'
import { types } from './actions'
import fp from 'lodash/fp'

export default handleActions({
  [types.ADD_REMINDER]:
    (state, { payload }) => fp.unionBy([payload], 'id')(state),

  [types.UPDATE_REMINDER]:
    (state, { payload }) => state.map(v => v.id === payload.id ? payload : v),

  [types.DELETE_REMINDER]:
    (state, { payload }) => state.filter(v => v.id !== payload)
}, [])