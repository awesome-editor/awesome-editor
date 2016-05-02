import {result} from './Saga'
import {assert} from '../util/Utils'


function _createChannelSideEffectsHandlers(channel, SideEffectHandlers) {

  return (AppState, action) => {

    if (action.channel === channel) {

      const handler = SideEffectHandlers[action.actionType]

      assert(handler, `Channel ${channel} does not support ${action.actionType}`)

      return handler(action.payload, AppState, result(action.__sideEffectCallId))
    }

    return null
  }
}

export default function createChannelSideEffectsHandlers(channel, SideEffectTypes, {SideEffectHandlers}) {

  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(SideEffectTypes, 'Need sideEffectTypes')
  assert(SideEffectHandlers, 'Need SideEffectHandlers')

  //every action must map to a handler
  Object.keys(SideEffectTypes).forEach(action =>
    assert(SideEffectHandlers[action], `Channel ${channel} does not support ${action}`)
  )

  return _createChannelSideEffectsHandlers(channel, SideEffectHandlers)
}
