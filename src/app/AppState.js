// **NOTE:** Before you load this file, make sure to register all stores and reducers!!!

import AppDispatcher from './AppDispatcher'
import {StateWithSideEffects} from './StateWithSideEffects'
import {reducers, storeFuncs} from './support/Collections'

import {storageLoadDocs} from '../stores/storage/StorageActions'


function _scanner(state, action) {

  // reducers take the whole state as input but return only the store state
  // this allows you to #combineSideEffects different reducers
  const newState = reducers.reduce((newState, reducer) => {

    const storeState = reducer(state, action)

    return newState.combine(storeState)

  }, new StateWithSideEffects)

  return {
    ...newState.state,
    sideEffects: newState.sideEffects
  }
}

const appStateObservable = AppDispatcher
  .scan(_scanner, {})
  .skip(1) //always skip the first one (empty data)

// setup one-way data flow
appStateObservable.onValue(appState => {

  //remit all side effects
  setTimeout(() => appState.sideEffects.forEach(AppDispatcher.emit), 0)
})

AppDispatcher.emit(storageLoadDocs())

/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
export default storeFuncs.reduce((api, storeFn) => {

  const store = storeFn(AppDispatcher, appStateObservable)

  return {...api, ...store}

}, appStateObservable)
