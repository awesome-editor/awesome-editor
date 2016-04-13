import {assert} from '../util/Utils'


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
 * @param AppDispatcher, appStateObservable
 * @returns {{}}
 */
export default function createStore(
  storeStateName,
  {actionFuncs, actionObservables},
  {AppDispatcher, appStateObservable}) {

  assert(storeStateName, 'Need store state name')
  assert(actionFuncs, 'Need action functions')
  assert(AppDispatcher, 'Need an app dispatcher')
  assert(appStateObservable, 'Need the app state observable')

  actionObservables = actionObservables || {}

  const opts = {
    storeStateName,
    actionFuncs,
    actionObservables,
    AppDispatcher,
    appStateObservable
  }

  return {
    ..._bindActionsToAppDispatcher(opts),
    ..._bindActionObservablesToStoreObservable(opts)
  }
}

/**
 * Bind the action observables to the app state observable (where all the state is).
 * Action observables can give you a fine grain view of a store's state.
 *
 * You always get one for free... the mainStoreObservable listens to the entire store.
 *
 * @param storeStateName
 * @param appStateObservable
 * @param actionObservables
 * @returns {*}
 * @private
 */
function _bindActionObservablesToStoreObservable(opts) {

  const {storeStateName, appStateObservable, actionObservables} = opts

  const mainStoreObservable = appStateObservable.map(app => app[storeStateName])

  return Object.keys(actionObservables).reduce((total, observable) => {

    return Object.assign(total, {
      [observable]: actionObservables[observable](mainStoreObservable)
    })

  }, {[`${storeStateName}Observable`]: mainStoreObservable})
}

/**
 * Store actions are pure functions.
 * We therefore bind these to the app dispatcher.
 *
 * @param opts
 * @returns {Array}
 */
function _bindActionsToAppDispatcher(opts) {

  const {AppDispatcher, actionFuncs} = opts

  return Object.keys(actionFuncs).reduce((total, action) => {

    return Object.assign(total, {
      [action]: (...args) => {

        const actionFn = actionFuncs[action]
        const actionPayload = actionFn(...args)

        AppDispatcher.emit(actionPayload)
      }
    })
  }, {})
}
