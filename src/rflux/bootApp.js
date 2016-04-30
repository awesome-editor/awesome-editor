import AppDispatcher from './AppDispatcher'
import AppState from './AppState'
import {sideEffectHandlers} from './AppRegistration'


// setup one-way data flow
AppState.appStoreStateObservable.onValue(() => undefined)

//remit all side effects generated in reducers
AppState.appStateObservable.onValue(appState => setTimeout(() => appState.sideEffects.forEach(AppDispatcher.emit), 0))

//actually run side effects
AppDispatcher.onValue(action => sideEffectHandlers.forEach(
  sideEffectHandler => setTimeout(() => sideEffectHandler(AppState, action), 0)
))
