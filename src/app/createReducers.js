import {stateWithSideEffects} from '../stores/sideeffects/StateWithSideEffects'

/**
 * This is just a helper function. All it does is hook up the action reducer functions to the action types.
 * When an action comes in, it will call the corresponding action reducer with the payload.
 *
 * Note: in order for this to work, every actionType must have an actionReducer of the same name
 *
 * @param channel
 * @param actionTypes
 * @param actionReducers
 * @returns {Function}
 */
export default function createReducers(channel, actionTypes, actionReducers) {

  //every action must map to a handler
  Object.keys(actionTypes).forEach(action => {
    if (!actionReducers[action]) { throw new Error(`Channel ${channel} does not support ${action}`) }
  })

  //need an initial state; otherwise defaults to {}
  if (!actionReducers.initialState) { console.warn(`Channel ${channel} needs an initialState`) }

  const initialState = actionReducers.initialState || {}

  return (state, action) => {

    state = state || initialState

    if (action.channel === channel) {

      const handler = actionReducers[action.actionType]

      if (!handler) { throw new Error(`Channel ${channel} does not support ${action.actionType}`) }

      return handler(state, action.payload)
    }

    return stateWithSideEffects(state)
  }
}
