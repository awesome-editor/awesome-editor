import {assert} from '../util/Utils'
import {addModule} from './AppState'


/**
 * Bind the action observables to the app state observable (where all the state is).
 * Action observables can give you a fine grain view of a store's state.
 *
 * You always get one for free... the mainStoreObservable listens to the entire store.
 *
 * @param storeStateName
 * @param appStoreStateObservable
 * @param ActionObservables
 * @returns {*}
 * @private
 */
function _createStoreObservables({storeStateName, appStoreStateObservable, ActionObservables}) {

  const mainStoreObservable = appStoreStateObservable.map(appStores => appStores[storeStateName])

  return Object.keys(ActionObservables).reduce((total, observable) =>

    Object.assign(total, {[observable]: ActionObservables[observable](mainStoreObservable)}),

    {[`${storeStateName}Observable`]: mainStoreObservable})
}

/**
 * It's live because it emits to the AppDispatcher
 *
 * @param AppDispatcher
 * @param actionFunc
 * @returns {Function}
 * @private
 */
function _liveActionFunction(AppDispatcher, actionFunc) {

  return (...args) => AppDispatcher.emit(actionFunc(...args))
}

function _createStoreActions({AppDispatcher, ActionFuncs, observables}) {

  return Object.keys(ActionFuncs).reduce((storeActions, action) => {

    const liveActionFunc = _liveActionFunction(AppDispatcher, ActionFuncs[action])

    if (observables[`${action}Observable`]) {

      storeActions[action] = (...args) => {

        setTimeout(() => liveActionFunc(...args), 0)

        return observables[`${action}Observable`].take(1)
      }
    }
    else {

      storeActions[action] = liveActionFunc
    }

    return storeActions

  }, {})
}

/**
 * Returns a function that when called:
 *
 * 1. binds the app dispatcher to the store actions
 * 2. binds the appStateObservable to the store observables
 *
 * @param storeStateName
 * @param ActionFuncs
 * @param ActionObservables (optional) - you always get one for free... the observable that listens to the entire store
 * @returns {Function}
 */
function _createStoreFactory(storeStateName, {ActionFuncs, ActionObservables}) {

  return (AppDispatcher, appStoreStateObservable) => {

    const observables = _createStoreObservables({storeStateName, appStoreStateObservable, ActionObservables})

    return {
      ..._createStoreActions({AppDispatcher, ActionFuncs, observables}),
      ...observables
    }
  }
}

/**
 * The "store" is just the public interface used by the app. It consists of:
 *
 * - action functions (ex: DocActions)
 * - action observables (optional) (ex: DocActionObservables)
 *
 * **In order for this to work, every action function and action observable must be globally unique.**
 *
 * This isn't hard to achieve as long as you:
 * 1. use the storeStateName in the action/observable. Ex: createDoc
 * 2. use the word "observable" in the observables. Ex: docObservable
 *
 * @param storeStateName
 * @param ActionFuncs
 * @param ActionObservables (optional) - you always get one for free... the observable that listens to the entire store
 * @returns {{}}
 */
export default function registerStore(storeStateName, {ActionFuncs, ActionObservables}) {

  ActionObservables = ActionObservables || {}

  assert(storeStateName, 'Need store state name')
  assert(ActionFuncs, 'Need action functions')

  const storeFactory = _createStoreFactory(storeStateName, {ActionFuncs, ActionObservables})

  addModule(storeFactory)
}
