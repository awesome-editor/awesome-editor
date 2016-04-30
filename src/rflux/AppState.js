import AppDispatcher from './AppDispatcher'
import {appStateObservable, appStoreStateObservable} from './AppObservables'


/**
 * This is the "public" interface for app state i.e., what React interfaces with.
 */
const AppState = {appStoreStateObservable, appStateObservable}

export function addStore(storeFactory) {

  Object.assign(AppState, storeFactory(AppDispatcher, appStoreStateObservable))
}

export default AppState
