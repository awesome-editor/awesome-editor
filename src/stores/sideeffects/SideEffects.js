import AppDispatcher from '../../app/AppDispatcher'
import AppState from '../../app/AppState'

import {persistence} from '../persistence/Persistence'


/**
 * **side effects** include things we normally associate as "side effects", like saving to the db.
 * But we also define inter-store communication as a "side effect".
 *
 * The latter is handled in the AppState #_scanner.
 * We could handle the former in AppState as well,
 * but we're using a different observable for maintainability.
 *
 * Things that generate SideEffects are usually asynchronous so they place their results to AppDispatcher.
 *
 */
AppDispatcher.onValue(action => {

  AppState.appStateObservable.take(1).onValue(state => {

    persistence(action)
  })
})
