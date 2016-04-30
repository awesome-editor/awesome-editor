import AppDispatcher from './AppDispatcher'
import {appStateObservable, appStoreStateObservable} from './AppObservables'


/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
const AppState = {appStoreStateObservable, appStateObservable}

export function addModule(factory) {

  Object.assign(AppState, factory(AppDispatcher, appStoreStateObservable))
}

export default AppState
