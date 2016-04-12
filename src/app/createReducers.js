import {stateWithSideEffects} from '../stores/sideeffects/StateWithSideEffects'


export default function createReducers(channel, actions, actionHandlers) {

  //every action must map to a handler
  Object.keys(actions).forEach(action => {
    if (!actionHandlers[action]) { throw new Error(`Channel ${channel} does not support ${action}`) }
  })

  return (state, action) => {

    if (action.channel === channel) {

      const handler = actionHandlers[action.actionType]

      if (!handler) { throw new Error(`Channel ${channel} does not support ${action.actionType}`) }

      return handler(state, action.payload)
    }

    return stateWithSideEffects(state)
  }
}
