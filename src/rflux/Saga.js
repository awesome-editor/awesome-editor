import uuid from 'uuid'
import Kefir from 'kefir'

import kefirEmitter from './support/kefirEmitter'
import {isObservable} from '../util/Utils'

import AppDispatcher from './AppDispatcher'
import {Channels, ActionTypes} from './Constants'


export const sideEffects = kefirEmitter()

const putObservable = sideEffects
  .filter(action => action.action === 'PUT')
  .map(action => action.payload)
  .onValue(payload => setTimeout(() => AppDispatcher.emit(payload), 0))

const callObservable = sideEffects
  .filter(action => action.action === 'CALL')
  .map(action => action.payload)
  .flatMap(action => {

    const uuid = action.uuid
    const result = action.fn(...action.args)
    const resultObservable = isObservable(result) ? result : Kefir.constant(result)

    return resultObservable.map(rslt => ({uuid, rslt}))
  })
  .onValue(() => undefined)

export function put(action) {

  sideEffects.emit({action: 'PUT', payload: action})
}

export function call(fn, ...args) {

  const id = uuid.v4()

  setTimeout(() => sideEffects.emit({action: 'CALL', payload: {fn, args, uuid: id}}), 0)

  return callObservable.filter(fn => fn.uuid === id).map(fn => fn.rslt).take(1)
}

export function result(rslt) {

  const action = {
    channel: Channels.system,
    actionType: ActionTypes.sideEffectResult,
    payload: rslt
  }

  setTimeout(() => sideEffects.emit({action: 'PUT', payload: action}), 0)

  return rslt
}

export function listen(channel, actionType) {

  return AppDispatcher
    .filter(action => action.channel === channel && action.actionType === actionType)
    .map(action => action.payload)
}
