import {reducers} from './AppRegistration'
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
 * @param ActionTypes
 * @param ActionReducers
 * @returns {Function}
 */
function _createChannelReducers(storeStateName, channel, {ActionTypes, ActionReducers}) {

  //every action must map to a handler
  Object.keys(ActionTypes || {}).forEach(action => {
    assert(ActionReducers[action], `Channel ${channel} does not support ${action}`)
  })

  //need an initial state; otherwise defaults to {}
  if (!ActionReducers.initialState) { console.warn(`Channel ${channel} needs an initialState`) }

  const initialState = ActionReducers.initialState || {}


  return (appStoreState, action) => {

    const storeState = (appStoreState || {})[storeStateName] || initialState

    if (action.channel === channel) {

      const handler = ActionReducers[action.actionType]

      if (!handler) { throw new Error(`Channel ${channel} does not support ${action.actionType}`) }

      const newState = cast(handler(storeState, action.payload), StateWithSideEffects)

      newState.state = {[storeStateName]: newState.state}

      return newState
    }

    return new StateWithSideEffects({[storeStateName]: storeState})
  }
}

export default function registerChannelReducers(storeStateName, channel, {ActionTypes, ActionReducers}) {

  assert(storeStateName, 'Neeed a store state name (i.e., the property name in the app state for this store')
  assert(typeof storeStateName === 'string', 'Store state name needs to be a string')
  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(ActionTypes, 'Need ActionTypes')
  assert(ActionReducers, 'Need ActionReducers')

  const reducer = _createChannelReducers(storeStateName, channel, {ActionTypes, ActionReducers})

  reducers.push(reducer)
}
