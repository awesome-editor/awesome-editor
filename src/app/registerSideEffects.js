import {assert} from '../util/Utils'
import AppDispatcher from './AppDispatcher'


export default function registerSideEffects(channel, actionTypes, sideEffectHandlers) {

  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(actionTypes, 'Need action types')
  assert(sideEffectHandlers, 'Need side effects')

  //every action must map to a handler
  Object.keys(actionTypes).forEach(action =>
    assert(sideEffectHandlers[action], `Channel ${channel} does not support ${action}`)
  )

  const listener = action => {

    if (action.channel === channel) {

      const handler = sideEffectHandlers[action.actionType]

      assert(handler, `Channel ${channel} does not support ${action.actionType}`)

      return handler(action.payload)
    }

    return null
  }

  return AppDispatcher.onValue(action => setTimeout(() => listener(action), 0))
}
