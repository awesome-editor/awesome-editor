import {assert} from '../util/Utils'
import {sideEffectFuncs} from './support/Collections'
import bindActionsToAppDispatcher from './bindActionsToAppDispatcher'
import AppDispatcher from './AppDispatcher'


export function createSideEffects(channel, sideEffectActionFuncs, sideEffectHandlers) {

  // const actions = bindActionsToAppDispatcher({AppDispatcher, actionFuncs: sideEffectActionFuncs})

  return (AppState, action) => {

    if (action.channel === channel) {

      const handler = sideEffectHandlers[action.actionType]

      assert(handler, `Channel ${channel} does not support ${action.actionType}`)

      return handler(AppState, action.payload)
    }

    return null
  }
}

export default function registerSideEffects(channel, actionTypes, {sideEffectActionFuncs, sideEffectHandlers}) {

  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(actionTypes, 'Need action types')
  // assert(sideEffectActionFuncs, 'Need side effect action functions')
  assert(sideEffectHandlers, 'Need side effects')

  //every action must map to a handler
  Object.keys(actionTypes).forEach(action =>
    assert(sideEffectHandlers[action], `Channel ${channel} does not support ${action}`)
  )

  const listener = createSideEffects(channel, sideEffectActionFuncs, sideEffectHandlers)

  sideEffectFuncs.push(listener)

  return listener
}

