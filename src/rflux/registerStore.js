/* eslint no-use-before-define: 0*/
import {assert} from '../util/Utils'
import {storeFuncs} from './support/Collections'
import bindActionsToAppDispatcher from './bindActionsToAppDispatcher'


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
 * @param actionFuncs
 * @param actionObservables (optional) - you always get one for free... the observable that listens to the entire store
 * @returns {{}}
 */
export default function registerStore(storeStateName, {actionFuncs, actionObservables}) {

  const store = createStore(storeStateName, {actionFuncs, actionObservables})

  storeFuncs.push(store)

  return store
}

/**
 * Returns a function that when called:
 *
 * 1. binds the app dispatcher to the store actions
 * 2. binds the appStateObservable to the store observables
 *
 * @param storeStateName
 * @param actionFuncs
 * @param actionObservables (optional) - you always get one for free... the observable that listens to the entire store
 * @returns {Function}
 */
export function createStore(storeStateName, {actionFuncs, actionObservables}) {

  assert(storeStateName, 'Need store state name')
  assert(actionFuncs, 'Need action functions')

  actionObservables = actionObservables || {}

  const opts = {
    storeStateName,
    actionFuncs,
    actionObservables
  }

  return (AppDispatcher, appStoreStateObservable) => {

    const actions = bindActionsToAppDispatcher({...opts, AppDispatcher, appStoreStateObservable})
    const observables = _bindActionObservablesToStoreObservable({...opts, AppDispatcher, appStoreStateObservable})

    const combined = Object.keys(actions).reduce((combined, action) => {

      if (observables[`${action}Observable`]) {

        combined[action] = (...args) => {

          setTimeout(() => actions[action](...args), 0)

          return observables[`${action}Observable`].take(1)
        }
      }
      else {

        combined[action] = actions[action]
      }

      return combined

    }, {})

    return {
      ...combined,
      ...observables
    }
  }
}

/**
 * Bind the action observables to the app state observable (where all the state is).
 * Action observables can give you a fine grain view of a store's state.
 *
 * You always get one for free... the mainStoreObservable listens to the entire store.
 *
 * @param storeStateName
 * @param appStoreStateObservable
 * @param actionObservables
 * @returns {*}
 * @private
 */
function _bindActionObservablesToStoreObservable({storeStateName, appStoreStateObservable, actionObservables}) {

  const mainStoreObservable = appStoreStateObservable.map(appStores => appStores[storeStateName]).log('store')

  return Object.keys(actionObservables).reduce((total, observable) => {

    return Object.assign(total, {
      [observable]: actionObservables[observable](mainStoreObservable)
    })

  }, {[`${storeStateName}Observable`]: mainStoreObservable})
}
