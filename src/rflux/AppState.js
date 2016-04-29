import AppDispatcher from './AppDispatcher'
import {storeFuncs, sideEffectFuncs} from './support/Collections'
import {appStateObservable, appStoreStateObservable} from './AppObservables'


/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
const AppState = storeFuncs.reduce((api, storeFn) => {

  const store = storeFn(AppDispatcher, appStoreStateObservable)

  return {...api, ...store}

}, appStateObservable)


// setup one-way data flow
appStoreStateObservable.onValue(() => undefined)

//remit all side effects generated in reducers
appStateObservable.onValue(appState => setTimeout(() => appState.sideEffects.forEach(AppDispatcher.emit), 0))

//actually run side effects
AppDispatcher.onValue(action => sideEffectFuncs.forEach(
  sideEffect => setTimeout(() => sideEffect(AppState, action), 0)
))

export default AppState
