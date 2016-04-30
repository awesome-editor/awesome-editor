import {assert} from '../util/Utils'
import {sideEffectHandlers as _sideEffectHandlers} from './AppRegistration'


export function createSideEffectHandlerWrapper(channel, sideEffectHandlers) {

  return (AppState, action) => {

    if (action.channel === channel) {

      const handler = sideEffectHandlers[action.actionType]

      assert(handler, `Channel ${channel} does not support ${action.actionType}`)

      return handler(AppState, action.payload)
    }

    return null
  }
}

export default function registerSideEffectsChannel(channel, actionTypes, {sideEffectHandlers}) {

  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(actionTypes, 'Need action types')
  assert(sideEffectHandlers, 'Need side effects')

  //every action must map to a handler
  Object.keys(actionTypes).forEach(action =>
    assert(sideEffectHandlers[action], `Channel ${channel} does not support ${action}`)
  )

  const handler = createSideEffectHandlerWrapper(channel, sideEffectHandlers)

  _sideEffectHandlers.push(handler)
}

