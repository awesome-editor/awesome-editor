import uuid from 'uuid'

import {sideEffectHandlers as _sideEffectHandlers} from './AppRegistration'
import {addModule} from './AppState'
import createChannelSideEffectsHandlers from './createChannelSideEffectsHandlers'
import {ActionTypes} from './Constants'

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
      .filter(action =>
      action.actionType === ActionTypes.sideEffectResult &&
      action.__sideEffectCallId === __sideEffectCallId)
      .take(1)
      .map(action => action.payload)
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

export default function registerSideEffects(channel, SideEffectTypes, {ActionFuncs, SideEffectHandlers}) {

  assert(typeof channel === 'string', 'Channel needs to be a string')
  assert(SideEffectTypes, 'Need sideEffectTypes')
  assert(ActionFuncs, 'Need ActionFuncs')
  assert(SideEffectHandlers, 'Need SideEffectHandlers')

  //every action must map to a handler and an action function
  Object.keys(SideEffectTypes).forEach(action => {
    assert(SideEffectHandlers[action], `Channel ${channel} does not support ${action}`)
    assert(ActionFuncs[action], `Channel ${channel} needs an action function for ${action}`)
  })

  const SideEffectFuncs = Object.keys(ActionFuncs).reduce((total, action) =>
    SideEffectTypes[action] ? {...total, [action]: ActionFuncs[action]} : total, {})

  const channelHandlers = createChannelSideEffectsHandlers(channel, SideEffectTypes, {SideEffectHandlers})
  const sideEffectsFactory = _createSideEffectsFactory(SideEffectFuncs)

  addModule(sideEffectsFactory)

  _sideEffectHandlers.push(channelHandlers)
}


