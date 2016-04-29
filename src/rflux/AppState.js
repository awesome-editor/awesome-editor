import AppDispatcher from './AppDispatcher'
import {sideEffectFuncs} from './support/Collections'
import {appStateObservable, appStoreStateObservable} from './AppObservables'


/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
const AppState = {appStoreStateObservable, appStateObservable}

// setup one-way data flow
appStoreStateObservable.onValue(() => undefined)

//remit all side effects generated in reducers
appStateObservable.onValue(appState => setTimeout(() => appState.sideEffects.forEach(AppDispatcher.emit), 0))

//actually run side effects
AppDispatcher.onValue(action => sideEffectFuncs.forEach(
  sideEffect => setTimeout(() => sideEffect(AppState, action), 0)
))

export function registerStoreFactory(storeFactory) {

  Object.assign(AppState, storeFactory(AppDispatcher, appStoreStateObservable))
}

export default AppState
