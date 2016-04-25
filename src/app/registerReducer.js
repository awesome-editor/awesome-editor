import {reducers} from './support/Collections'

import {StateWithSideEffects} from './StateWithSideEffects'
import {assert, cast} from '../util/Utils'

/**
 * This is just a helper function. All it does is hook up the action reducer functions to the action types.
 * When an action comes in, it will call the corresponding action reducer with the payload.
 *
 * Note: in order for this to work, every actionType must have an actionReducer of the same name
 *
 * @param storeStateName
 * @param channel
 * @param actionTypes
 * @param actionReducers
 * @returns {Function}
 */
export function createReducer(storeStateName, channel, {actionTypes, actionReducers}) {

  assert(storeStateName, 'Neeed a store state name (i.e., the property name in the global state for this store')
  assert(typeof storeStateName === 'string', 'Store state name needs to be a string')
  assert(typeof channel === 'string', 'Channel needs to be a string')

  //every action must map to a handler
  Object.keys(actionTypes).forEach(action => {
    assert(actionReducers[action], `Channel ${channel} does not support ${action}`)
  })

  //need an initial state; otherwise defaults to {}
  if (!actionReducers.initialState) { console.warn(`Channel ${channel} needs an initialState`) }

  const initialState = actionReducers.initialState || {}


  return (globalState, action) => {

    const storeState = globalState[storeStateName] || initialState

    if (action.channel === channel) {

      const handler = actionReducers[action.actionType]

      if (!handler) { throw new Error(`Channel ${channel} does not support ${action.actionType}`) }

      const newState = cast(handler(storeState, action.payload), StateWithSideEffects)

      newState.state = {[storeStateName]: newState.state}

      return newState
    }

    return new StateWithSideEffects({[storeStateName]: storeState})
  }
}

export default function registerReducer(storeStateName, channel, {actionTypes, actionReducers}) {

  const reducer = createReducer(storeStateName, channel, {actionTypes, actionReducers})

  reducers.push(reducer)

  return reducer
}
