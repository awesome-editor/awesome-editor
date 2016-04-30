import uuid from 'uuid'

import {Channels, ActionTypes} from './Constants'
import {addModule} from './AppState'
import registerChannelSideEffectsHandlers from './registerChannelSideEffectsHandlers'

import {assert} from '../util/Utils'


/**
 * It's live because it emits to the AppDispatcher
 *
 * @param AppDispatcher
 * @param actionFunc
 * @returns {Function}
 * @private
 */
function _liveActionFunction(AppDispatcher, __sideEffectCallId, actionFunc) {

  return (...args) => AppDispatcher.emit({...actionFunc(...args), __sideEffectCallId})
}

function _createSideEffectAction(AppDispatcher, sideEffectActionFunc) {

  const __sideEffectCallId = uuid.v4()
  const liveActionFunc = _liveActionFunction(AppDispatcher, __sideEffectCallId, sideEffectActionFunc)

  return (...args) => {

    setTimeout(() => liveActionFunc(...args), 0)

    return AppDispatcher
      .filter(action =>
      action.channel === Channels.system &&
      action.actionType === ActionTypes.sideEffectResult &&
      action.payload.__sideEffectCallId === __sideEffectCallId)
      .take(1)
  }
}

function _createSideEffectsFactory({sideEffectActionFuncs}) {

  return AppDispatcher =>

    Object.keys(sideEffectActionFuncs).reduce((sideEffects, action) =>

        Object.assign(sideEffects, {[action]: _createSideEffectAction(AppDispatcher, sideEffectActionFuncs[action])})

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

  const sideEffectsFactory = _createSideEffectsFactory(sideEffectActionFuncs)

  addModule(sideEffectsFactory)

  registerChannelSideEffectsHandlers(channel, actionTypes, {sideEffectHandlers})
}


