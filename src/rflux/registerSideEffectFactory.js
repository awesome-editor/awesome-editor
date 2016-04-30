import {assert} from '../util/Utils'
import bindActionsToAppDispatcher from './bindActionsToAppDispatcher'


export function createSideEffectFactory(channel, actionTypes, {sideEffectActionFuncs, sideEffectHandlers}) {

  return (AppDispatcher, appStoreStateObservable, sideEffectsObservable) => {

    const actions = bindActionsToAppDispatcher({AppDispatcher, actionFuncs: sideEffectActionFuncs})

    return Object.keys(actions).reduce((combined, action) => {

      combined[action] = (...args) => {

        setTimeout(() => actions[action](...args), 0)

        return sideEffectsObservable.take(1)
      }

      return combined

    }, {})
  }
}

export default function registerSideEffectFactory(channel, actionTypes, {sideEffectActionFuncs, sideEffectHandlers}) {

  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(actionTypes, 'Need action types')
  assert(sideEffectActionFuncs, 'Need side effect action functions')
  assert(sideEffectHandlers, 'Need side effects')

  //every action must map to a handler and an action function
  Object.keys(actionTypes).forEach(action => {
    assert(sideEffectHandlers[action], `Channel ${channel} does not support ${action}`)
    assert(sideEffectActionFuncs[action], `Channel ${channel} needs an action function for ${action}`)
  })

  const handler = createSideEffectFactory(channel, sideEffectActionFuncs, sideEffectHandlers)

  _sideEffectHandlers.push(handler)
}

