import uuid from 'uuid'
import Kefir from 'Kefir'

import kefirEmitter from '../../util/kefirEmitter'
import {isObservable} from '../../util/Utils'

import AppDispatcher from '../../app/AppDispatcher'


export const sideEffects = kefirEmitter()

const putObservable = sideEffects
  .filter(action => action.action === 'PUT')
  .map(action => action.payload)
  .onValue(AppDispatcher.emit)

const callObservable = sideEffects
  .filter(action => action.action === 'CALL')
  .map(action => action.payload)
  .flatMap(action => {

    const result = action.fn(...action.args)
    const resultObservable = isObservable(result) ? result : Kefir.constant(result)

    return resultObservable.map(rslt => ({uuid: action.uuid, rslt}))
  })

export function put(action) {

  sideEffects.emit({action: 'PUT', payload: action})
}

export function call(fn, ...args) {

  const id = uuid.v4()

  sideEffects.emit({action: 'CALL', payload: {fn, args, uuid: id}})

  return callObservable.filter(fn => fn.uuid === id).take(1).map(fn => fn.rslt)
}
