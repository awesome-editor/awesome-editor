import uuid from 'uuid'

import {sideEffectHandlers as _sideEffectHandlers} from './AppRegistration'
import {addModule} from './AppState'
import createChannelSideEffectsHandlers from './createChannelSideEffectsHandlers'

import {assert} from '../util/Utils'


/**
 * It's live because it emits to the AppDispatcher.
 * Also we inject a sideEffectCallId to the payload.
 *
 * @param AppDispatcher
 * @param actionFunc
 * @returns {Function}
 * @private
 */
function _liveActionFunction(AppDispatcher, actionFunc) {

  return __sideEffectCallId => (...args) => AppDispatcher.emit({...actionFunc(...args), __sideEffectCallId})
}

function _createSideEffectActionWithObserver(AppDispatcher, sideEffectActionFunc) {

  const liveSideEffectAction = _liveActionFunction(AppDispatcher, sideEffectActionFunc)

  return (...args) => {

    const __sideEffectCallId = uuid.v4()

    setTimeout(() => liveSideEffectAction(__sideEffectCallId)(...args), 0)

    return AppDispatcher
      .filter(action => action.__sideEffectCallId === __sideEffectCallId)
      .take(1)
  }
}

function _createSideEffectsFactory(sideEffectActionFuncs) {

  return AppDispatcher =>

    Object.keys(sideEffectActionFuncs).reduce((sideEffects, action) =>

        Object.assign(
          sideEffects,
          {[action]: _createSideEffectActionWithObserver(AppDispatcher, sideEffectActionFuncs[action])}
        )

      , {})
}

export default function registerSideEffects(channel, actionTypes, {sideEffectActionFuncs, sideEffectHandlers}) {

  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(actionTypes, 'Need action types')
  assert(sideEffectActionFuncs, 'Need side effect action functions')
  assert(sideEffectHandlers, 'Need side effects')

  //every action must map to a handler and an action function
  Object.keys(actionTypes).forEach(action => {
    assert(sideEffectHandlers[action], `Channel ${channel} does not support ${action}`)
    assert(sideEffectActionFuncs[action], `Channel ${channel} needs an action function for ${action}`)
  })

  const channelHandlers = createChannelSideEffectsHandlers(channel, actionTypes, {sideEffectHandlers})
  const sideEffectsFactory = _createSideEffectsFactory(sideEffectActionFuncs)

  addModule(sideEffectsFactory)

  _sideEffectHandlers.push(channelHandlers)
}


