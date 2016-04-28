// **NOTE:** Before you load this file, make sure to register all stores and reducers!!!

import AppDispatcher from './AppDispatcher'
import {StateWithSideEffects} from './StateWithSideEffects'
import {reducers, storeFuncs, sideEffectFuncs} from './support/Collections'


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

/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
const AppState = storeFuncs.reduce((api, storeFn) => {

  const store = storeFn(AppDispatcher, appStateObservable)

  return {...api, ...store}

}, appStateObservable)


// setup one-way data flow
appStateObservable.onValue(() => undefined)

//remit all side effects generated in reducers
appStateObservable.onValue(appState => setTimeout(() => appState.sideEffects.forEach(AppDispatcher.emit), 0))

//actually run side effects
AppDispatcher.onValue(action => sideEffectFuncs.forEach(
  sideEffect => setTimeout(() => sideEffect(AppState, action), 0)
))

export default AppState
