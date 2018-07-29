import {LOAD_ISSUES_DATA} from '../actions/types';

const INITIAL_STATE = {}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
      case LOAD_ISSUES_DATA:
      return {
        ...state,
          ...action.payload
      }
    default:
      return state
  }
}